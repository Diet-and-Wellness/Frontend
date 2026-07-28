"use client";

import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import ReactSpeedometer from "react-d3-speedometer";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CTA from "./CTAFreeToolsResult";
import ToolModalHeader from "./ToolModalHeader";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";

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

type BMIStatus = "Underweight" | "Normal" | "Overweight" | "Obesity";

interface BMIResult {
  bmi: number;
  status: BMIStatus;
  differenceFromHealthy: number;

  weightRange: {
    from: number;
    to: number;
  } | null;

  direction: "above" | "below" | "healthy";
  action: "Losing" | "Gaining" | "Maintaining";
}

const BMI = ({
  onClose,
  onGetFullAnalysis,
}: {
  onClose: () => void;
  onGetFullAnalysis: () => void;
}) => {
  const [showResult, setShowResult] = useState(false);
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  const showResultHandler = (bmiResult: BMIResult) => {
    setBmiResult(bmiResult);
    setShowResult(true);
  };

  const onTryAgain = () => {
    setShowResult(false);
  };

  return (
    <ModalWrapper>
      <div className="min-w-100 flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {showResult ? (
            <BmiResult
              bmiResult={bmiResult}
              tryAgainHandler={onTryAgain}
              onGetFullAnalysis={onGetFullAnalysis}
              onClose={onClose}
            />
          ) : (
            <BmiForm showResultHandler={showResultHandler} onClose={onClose} />
          )}
        </AnimatePresence>
      </div>
    </ModalWrapper>
  );
};

const HEALTHY_MIN = 18.5;
const HEALTHY_MAX = 24.9;

const BmiForm = ({
  showResultHandler,
  onClose,
}: {
  showResultHandler: (bmiResult: BMIResult) => void;
  onClose: () => void;
}) => {
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);

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

  const handleCalculateBMI = () => {
    const bmiResult = healthMetrics.calculateBMI({
      heightCm: heightCm,
      weightKg: weightKg,
    });
    showResultHandler(bmiResult);
  };

  const showResultBtnActive = !!heightCm && !!weightKg;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-7.5 bg-[#FFFEFD] rounded-2xl flex flex-col gap-7.5"
    >
      <ToolModalHeader
        toolName="Body Mass Index Calculator"
        onClose={onClose}
      />

      <div className="flex flex-col gap-5">
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
      </div>

      <button
        disabled={!showResultBtnActive}
        onClick={handleCalculateBMI}
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

const BmiResult = ({
  bmiResult,
  tryAgainHandler,
  onGetFullAnalysis,
  onClose,
}: {
  bmiResult: BMIResult | null;
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
      className="p-7.5 bg-[#FFFEFD] rounded-2xl flex flex-col gap-5 items-center"
    >
      <ToolModalHeader
        toolName="Body Mass Index Calculator"
        onClose={onClose}
      />

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-[22px] font-medium">Your BMI Score</p>
        <p className="text-[36px] text-[#4D8E32] font-bold">{bmiResult?.bmi}</p>
        <p
          className={`text-[24px] ${bmiResult?.status === "Normal" ? "text-[#337516]" : "text-[#E99532]"} font-medium`}
        >
          {bmiResult?.status}
        </p>
      </div>

      <ReactSpeedometer
        value={bmiResult ? Math.min(bmiResult.bmi, 40) : 10}
        minValue={10}
        maxValue={40}
        segments={4}
        customSegmentStops={[10, 18.5, 25, 30, 40]}
        segmentColors={["#7ED957", "#3CCF4E", "#F6C343", "#F44336"]}
        needleColor="#1F1F1F"
        needleHeightRatio={0.6}
        currentValueText=""
        textColor="#333"
        ringWidth={30}
        width={300}
        height={180}
        valueTextFontSize="0px"
      />

      <div className="w-full rounded-2xl border border-[#4D8E32] px-7.5 py-3 flex flex-col justify-center items-center gap-1.5 bg-[#EDF4EB]">
        <p className="text-[16px] font-medium">Healthy BMI Range</p>
        <p className="text-[18px] font-semibold text-[#4D8E32]">
          {HEALTHY_MIN} — {HEALTHY_MAX}{" "}
          <span className="text-gray-900 font-medium text-[16px]">kg/m²</span>
        </p>
      </div>

      {bmiResult?.status === "Normal" || (
        <div className="w-full rounded-2xl border border-[#E99532] px-7.5 py-3 flex flex-col justify-center items-center gap-1.5 bg-[#FDF4EB]">
          <p className="text-[16px] font-medium">
            {`
          You’re ${bmiResult?.differenceFromHealthy} kg/m² ${bmiResult?.direction} the normal range
          `}
          </p>
          <p className="text-[16px] text-gray-900">
            {`${bmiResult?.action} about ${bmiResult?.weightRange?.from} — ${bmiResult?.weightRange?.to} kg can help you reach a healthier BMI`}
          </p>
        </div>
      )}

      <CTA
        tryAgainHanlder={tryAgainHandler}
        getFullAssessment={onGetFullAnalysis}
      />
    </motion.div>
  );
};

export default BMI;
