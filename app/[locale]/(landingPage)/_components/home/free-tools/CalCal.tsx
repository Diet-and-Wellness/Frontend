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
import { useTranslations } from "next-intl";

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
      <div
        className={`flex flex-col gap-5 ${showResult ? "w-[92vw] md:w-210" : "w-[92vw] md:w-130"}`}
      >
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
  const t = useTranslations("calculators");
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
      className="flex max-h-[calc(100dvh-1.5rem)] min-h-0 flex-col gap-6 overflow-y-auto overscroll-contain rounded-2xl bg-[#FFFEFD] p-5 sm:gap-7.5 sm:p-7.5"
    >
      <ToolModalHeader toolName={t("calorieTitle")} onClose={onClose} />

      <div className="flex flex-col gap-4">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <GenderCard
            selectGenderHandler={() => setGender("male")}
            gender={t("male")}
            isSelected={gender === "male"}
          />
          <GenderCard
            selectGenderHandler={() => setGender("female")}
            gender={t("female")}
            isSelected={gender === "female"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="type-label font-medium">
            {t("age")}
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
              placeholder={t("enterAge")}
            />
            <p className="type-label text-[#4F4F4F]">{t("year")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="type-label font-medium">
            {t("height")}
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
              placeholder={t("enterHeight")}
            />
            <p className="type-label text-[#4F4F4F]">{t("cm")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="type-label font-medium">
            {t("weight")}
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
              placeholder={t("enterWeight")}
            />
            <p className="type-label text-[#4F4F4F]">{t("kg")}</p>
          </div>
        </div>

        <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <ActivityLevelCard
            level={t("low")}
            description={t("littleExercise")}
            isSelected={activityLevel === "low"}
            selectActivityLevelHandler={() => setActivityLevel("low")}
          />

          <ActivityLevelCard
            level={t("moderate")}
            description={t("exerciseModerate")}
            isSelected={activityLevel === "moderate"}
            selectActivityLevelHandler={() => setActivityLevel("moderate")}
          />

          <ActivityLevelCard
            level={t("high")}
            description={t("exerciseHigh")}
            isSelected={activityLevel === "high"}
            selectActivityLevelHandler={() => setActivityLevel("high")}
          />

          <ActivityLevelCard
            level={t("extreme")}
            description={t("intenseActivity")}
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
            min-h-12
            shrink-0
            type-control
            font-semibold
            mt-2
            transition-colors 
            ${showResultBtnActive ? "bg-[#4D8E32] text-white hover:bg-[#337516] cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}
            }
            `}
      >
        <p className="">{t("seeResult")}</p>
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
  const t = useTranslations("calculators");
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex max-h-[calc(100dvh-1.5rem)] min-h-0 w-full flex-col gap-5 overflow-y-auto overscroll-contain rounded-2xl bg-[#FFFEFD] p-5 sm:p-7.5"
    >
      <ToolModalHeader toolName={t("calorieTitle")} onClose={onClose} />

      <div className="flex justify-center items-center gap-5">
        <div className="p-2.5 bg-[#F2F7F0] rounded-full flex justify-center items-center">
          <BarsIcon />
        </div>
        <p className="type-card-title text-center font-medium text-[#3E7228]">
          {t("dailyCalorieNeeds")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
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

      <p className="type-label rounded-xl bg-[#F1F9EF] px-5 py-3 text-center font-medium text-gray-700">
        {t("estimatedValues")}
      </p>

      <CTA
        tryAgainHanlder={tryAgainHandler}
        getFullAssessment={onGetFullAnalysis}
      />
    </motion.div>
  );
};

export default CalCal;
