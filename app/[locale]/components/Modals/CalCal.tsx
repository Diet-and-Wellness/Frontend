"use client";

import Image from "next/image";
import ModalWrapper from "../Public/ModalWrapper";
import CloseIcon from "../icons/CloseIcon";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GenderCard from "../Public/GenderCard";
import ActivityLevelCard from "../Public/ActivityLevelCard";
import CaloriesCard from "../Public/CaloriesCard";
import BarsIcon from "../icons/BarsIcon";
import CTA from "../Public/CTAFreeToolsResult";

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
} as const;

type Gender = "male" | "female";

type ActivityLevel = "light" | "moderate" | "active" | "veryActive";

const activityFactors: Record<ActivityLevel, number> = {
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

interface CalorieCalculatorResult {
  bmi: number;
  bmiStatus: "Underweight" | "Normal" | "Overweight" | "Obesity";

  bmr: number;
  tdee: number;

  maintenanceCalories: number;
  fatLossCalories: number;
  muscleGainCalories: number;

  macros: {
    maintenance: MacroResult;
    fatLoss: MacroResult;
    muscleGain: MacroResult;
  };
}

interface MacroResult {
  calories: number;

  protein: {
    grams: number;
    calories: number;
  };

  carbs: {
    grams: number;
    calories: number;
  };

  fat: {
    grams: number;
    calories: number;
  };
}

const CalCal = ({
  onClose,
  onGetFullAnalysis,
}: {
  onClose: () => void;
  onGetFullAnalysis: () => void;
}) => {
  const [showResult, setShowResult] = useState(false);
  const [calcalResult, setCalcalResult] =
    useState<CalorieCalculatorResult | null>(null);

  const showResultHandler = (calcalResult: CalorieCalculatorResult) => {
    setCalcalResult(calcalResult);
    setShowResult(true);
  };

  const tryAgainHandler = () => {
    setShowResult(false);
  };

  return (
    <ModalWrapper>
      <motion.div
        layout
        className="p-7.5 bg-[#FFFEFD] rounded-2xl min-w-100 flex flex-col gap-5"
      >
        <div className="flex justify-between items-center gap-7.5">
          <div className="size-12 flex justify-center items-center rounded-2xl bg-[#C8DCBF]">
            <Image src={"/icons/CalCalc.svg"} alt="" width={30} height={30} />
          </div>
          <p className="text-[20px] font-semibold text-center">
            Calorie Calculator
          </p>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-500" width="16" height="16" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {showResult ? (
            <CalCalResult
              calcalResult={calcalResult}
              tryAgainHandler={tryAgainHandler}
              onGetFullAnalysis={onGetFullAnalysis}
            />
          ) : (
            <CalCalForm showResultHandler={showResultHandler} />
          )}
        </AnimatePresence>
      </motion.div>
    </ModalWrapper>
  );
};

const CalCalForm = ({
  showResultHandler,
}: {
  showResultHandler: (calcalResult: CalorieCalculatorResult) => void;
}) => {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("light");

  const ageChangeHandler = (value: number) => {
    if (value < 0 || value > 150) {
      return;
    }
    setAge(value);
  };

  const heightChangeHandler = (value: number) => {
    if (value < 0 || value > 300) {
      return;
    }
    setHeightCm(value);
  };

  const weightChangeHandler = (value: number) => {
    if (value < 0 || value > 300) {
      return;
    }
    setWeightKg(value);
  };

  function calculateMacros(calories: number): MacroResult {
    const proteinCalories = calories * 0.3;
    const carbsCalories = calories * 0.55;
    const fatCalories = calories * 0.15;

    return {
      calories: Math.round(calories),

      protein: {
        calories: Math.round(proteinCalories),
        grams: Math.round(proteinCalories / 4),
      },

      carbs: {
        calories: Math.round(carbsCalories),
        grams: Math.round(carbsCalories / 4),
      },

      fat: {
        calories: Math.round(fatCalories),
        grams: Math.round(fatCalories / 9),
      },
    };
  }

  const calculateCalorieResult = () => {
    const heightM = heightCm / 100;

    // BMI
    const bmi = weightKg / (heightM * heightM);

    let bmiStatus: "Underweight" | "Normal" | "Overweight" | "Obesity";

    if (bmi < 18.5) {
      bmiStatus = "Underweight";
    } else if (bmi < 25) {
      bmiStatus = "Normal";
    } else if (bmi < 30) {
      bmiStatus = "Overweight";
    } else {
      bmiStatus = "Obesity";
    }

    // Mifflin-St Jeor Equation
    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    // TDEE
    const tdee = bmr * activityFactors[activityLevel];

    // Goals
    const maintenanceCalories = Math.round(tdee);

    const fatLossCalories = Math.round(tdee - 500);

    const muscleGainCalories = Math.round(tdee + 500);

    showResultHandler({
      bmi: Number(bmi.toFixed(1)),
      bmiStatus,

      bmr: Math.round(bmr),

      tdee: Math.round(tdee),

      maintenanceCalories,

      fatLossCalories,

      muscleGainCalories,

      macros: {
        maintenance: calculateMacros(maintenanceCalories),

        fatLoss: calculateMacros(fatLossCalories),

        muscleGain: calculateMacros(muscleGainCalories),
      },
    });
  };

  const showResultBtnActive = !!heightCm && !!weightKg && !!age;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-7.5"
    >
      <div className="flex flex-col gap-5">
        <div className="w-full flex gap-5 justify-between items-center">
          <GenderCard
            selectGenderHandler={() => setGender("male")}
            gender="Male"
            isSelected={gender === "male"}
          />
          <GenderCard
            selectGenderHandler={() => setGender("female")}
            gender="Female"
            isSelected={gender === "female"}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="text-[16px] font-medium">
            Age
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
            <input
              type="number"
              min={1}
              max={120}
              onChange={(event) => ageChangeHandler(Number(event.target.value))}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full outline-none"
              placeholder="Enter your age"
            />
            <p className="text-[#4F4F4F] text-[16px]">year</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="text-[16px] font-medium">
            Height
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={250}
              onChange={(event) =>
                heightChangeHandler(Number(event.target.value))
              }
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full outline-none"
              placeholder="Enter your height"
            />
            <p className="text-[#4F4F4F] text-[16px]">cm</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="text-[16px] font-medium">
            Weight
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={250}
              onChange={(event) =>
                weightChangeHandler(Number(event.target.value))
              }
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full outline-none"
              placeholder="Enter your weight"
            />
            <p className="text-[#4F4F4F] text-[16px]">kg</p>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-5">
          <ActivityLevelCard
            level="light"
            description="Little or no exercise"
            isSelected={activityLevel === "light"}
            selectActivityLevelHandler={() => setActivityLevel("light")}
          />

          <ActivityLevelCard
            level="moderate"
            description="Exercise 1–3 days/week"
            isSelected={activityLevel === "moderate"}
            selectActivityLevelHandler={() => setActivityLevel("moderate")}
          />

          <ActivityLevelCard
            level="active"
            description="Exercise 4–6 days/week"
            isSelected={activityLevel === "active"}
            selectActivityLevelHandler={() => setActivityLevel("active")}
          />

          <ActivityLevelCard
            level="very active"
            description="Daily intense activity"
            isSelected={activityLevel === "veryActive"}
            selectActivityLevelHandler={() => setActivityLevel("veryActive")}
          />
        </div>
      </div>

      <button
        disabled={!showResultBtnActive}
        onClick={calculateCalorieResult}
        className={`
            rounded-full
            h-12
            text-[16px]
            font-semibold
            mt-2.5
            transition-colors 
            ${showResultBtnActive ? "bg-[#4D8E32] text-white hover:bg-[#337516] cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}
            }
            `}
      >
        <p className="">See Result</p>
      </button>
    </motion.div>
  );
};

const CalCalResult = ({
  calcalResult,
  tryAgainHandler,
  onGetFullAnalysis,
}: {
  calcalResult: CalorieCalculatorResult | null;
  tryAgainHandler: () => void;
  onGetFullAnalysis: () => void;
}) => {
  console.log(calcalResult);
  return (
    <div className="flex flex-col gap-7.5">
      <div className="flex justify-center items-center gap-5">
        <div className="p-2.5 bg-[#F2F7F0] rounded-full flex justify-center items-center">
          <BarsIcon />
        </div>
        <p className="text-[#3E7228] text-[25px] font-medium text-center">
          Your Daily Calorie Needs
        </p>
      </div>

      <div className="flex justify-between items-center gap-5">
        <CaloriesCard
          type="maintenance"
          calories={calcalResult?.maintenanceCalories ?? 0}
        />
        <CaloriesCard
          type="loss"
          calories={calcalResult?.fatLossCalories ?? 0}
        />
        <CaloriesCard
          type="gain"
          calories={calcalResult?.muscleGainCalories ?? 0}
        />
      </div>

      <p className="text-center px-5 py-3 bg-[#F1F9EF] rounded-xl text-[16px] font-medium text-gray-700">
        These are estimated values, Actual needs may vary.
      </p>

      <CTA
        tryAgainHanlder={tryAgainHandler}
        getFullAssessment={onGetFullAnalysis}
      />
    </div>
  );
};

export default CalCal;
