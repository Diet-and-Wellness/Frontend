"use client";

import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import ReactSpeedometer from "react-d3-speedometer";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CTA from "./CTAFreeToolsResult";
import ToolModalHeader from "./ToolModalHeader";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";
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
      <div className="flex w-[min(100%,30rem)] flex-col gap-4">
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
  const t = useTranslations("calculators");
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
      className="flex max-h-[calc(100dvh-1.5rem)] min-h-0 flex-col gap-6 overflow-y-auto overscroll-contain rounded-2xl bg-[#FFFEFD] p-5 sm:gap-7.5 sm:p-7.5"
    >
      <ToolModalHeader
        toolName={t("bmiTitle")}
        toolIconSrc="/icons/bmi.svg"
        onClose={onClose}
      />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
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

        <div className="flex flex-col gap-2.5">
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
      </div>

      <button
        disabled={!showResultBtnActive}
        onClick={handleCalculateBMI}
        className={`
            rounded-full
            min-h-12
            shrink-0
            type-control
            font-semibold
            mt-2.5
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
  const t = useTranslations("calculators");
  const direction = bmiResult?.direction ?? "healthy";
  const action = bmiResult?.action ?? "Maintaining";

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex max-h-[calc(100dvh-1.5rem)] min-h-0 flex-col items-center gap-5 overflow-y-auto overscroll-contain rounded-2xl bg-[#FFFEFD] p-5 sm:p-7.5"
    >
      <ToolModalHeader
        toolName={t("bmiTitle")}
        toolIconSrc="/icons/bmi.svg"
        onClose={onClose}
      />

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="type-card-title font-medium">{t("bmiScore")}</p>
        <p className="text-3xl font-bold text-[#4D8E32] sm:text-4xl">{bmiResult?.bmi}</p>
        <p
          className={`type-card-title ${bmiResult?.status === "Normal" ? "text-[#337516]" : "text-[#E99532]"} font-medium`}
        >
          {t(`bmiStatus.${bmiResult?.status ?? "Normal"}`)}
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
        <p className="type-label font-medium">{t("healthyBmiRange")}</p>
        <p className="type-card-title font-semibold text-[#4D8E32]">
          {HEALTHY_MIN} — {HEALTHY_MAX}{" "}
          <span className="type-label font-medium text-gray-900">kg/m²</span>
        </p>
      </div>

      {bmiResult?.status === "Normal" || (
        <div className="w-full rounded-2xl border border-[#E99532] px-7.5 py-3 flex flex-col justify-center items-center gap-1.5 bg-[#FDF4EB]">
          <p className="type-label font-medium">
            {t("bmiDifference", {
              difference: bmiResult?.differenceFromHealthy ?? 0,
              position: t(`weightPosition.${direction}`),
            })}
          </p>
          <p className="type-label text-gray-900">
            {t("bmiRecommendation", {
              action: t(`weightAction.${action}`),
              from: bmiResult?.weightRange?.from ?? "",
              to: bmiResult?.weightRange?.to ?? "",
            })}
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
