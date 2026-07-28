"use client";

import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GenderCard from "@/app/[locale]/components/Public/GenderCard";
import ActivityLevelCard from "@/app/[locale]/components/Public/ActivityLevelCard";
import CaloriesCard from "@/app/[locale]/components/Public/CaloriesCard";
import BarsIcon from "@/app/[locale]/components/icons/BarsIcon";
import CTA from "./CTAFreeToolsResult";
import ToolModalHeader from "./ToolModalHeader";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";
import {
  ActivityLevel,
  CalorieCalculatorResult,
  Gender,
} from "@/app/[locale]/api/types/assessment.types";

const pageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: 90,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 90,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
} as const;

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
      <div className="min-w-100 flex flex-col gap-5">
        <AnimatePresence mode="wait">
          {showResult ? (
            <CalCalResult
              key="result"
              calcalResult={calcalResult}
              tryAgainHandler={tryAgainHandler}
              onGetFullAnalysis={onGetFullAnalysis}
              onClose={onClose}
            />
          ) : (
            <CalCalForm
              key="form"
              showResultHandler={showResultHandler}
              onClose={onClose}
            />
          )}
        </AnimatePresence>
      </div>
    </ModalWrapper>
  );
};

const CalCalForm = ({
  showResultHandler,
  onClose,
}: {
  showResultHandler: (calcalResult: CalorieCalculatorResult) => void;
  onClose: () => void;
}) => {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("low");

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

  const handleCalculateCalories = () => {
    const calories = healthMetrics.calculateCalorieResult({
      heightCm: heightCm,
      weightKg: weightKg,
      gender: gender,
      age: age,
      activityLevel: activityLevel,
    });
    showResultHandler(calories);
  };

  const showResultBtnActive = !!heightCm && !!weightKg && !!age;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-[#FFFEFD] p-7.5 rounded-2xl flex flex-col gap-7.5"
    >
      <ToolModalHeader toolName="Calorie Calculator" onClose={onClose} />

      <div className="flex flex-col gap-4">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[16px] font-medium">
            Age
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
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

        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
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
            level="Low"
            description="Little or no exercise"
            isSelected={activityLevel === "low"}
            selectActivityLevelHandler={() => setActivityLevel("low")}
          />

          <ActivityLevelCard
            level="Moderate"
            description="Exercise 1–3 days/week"
            isSelected={activityLevel === "moderate"}
            selectActivityLevelHandler={() => setActivityLevel("moderate")}
          />

          <ActivityLevelCard
            level="High"
            description="Exercise 4–6 days/week"
            isSelected={activityLevel === "high"}
            selectActivityLevelHandler={() => setActivityLevel("high")}
          />

          <ActivityLevelCard
            level="Extreme"
            description="Daily intense activity"
            isSelected={activityLevel === "extreme"}
            selectActivityLevelHandler={() => setActivityLevel("extreme")}
          />
        </div>
      </div>

      <button
        disabled={!showResultBtnActive}
        onClick={handleCalculateCalories}
        className={`
            rounded-full
            h-12
            text-[16px]
            font-semibold
            mt-2
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
  onClose,
}: {
  calcalResult: CalorieCalculatorResult | null;
  tryAgainHandler: () => void;
  onGetFullAnalysis: () => void;
  onClose: () => void;
}) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-210 flex flex-col gap-5 bg-[#FFFEFD] p-7.5 rounded-2xl"
    >
      <ToolModalHeader toolName="Calorie Calculator" onClose={onClose} />

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
    </motion.div>
  );
};

export default CalCal;
