"use client";

import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import ReactSpeedometer from "react-d3-speedometer";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CTA from "./CTAFreeToolsResult";
import ToolModalHeader from "./ToolModalHeader";
import BmiCalculatorIcon from "@/app/[locale]/components/icons/BmiCalculatorIcon";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";
import { useTranslations } from "next-intl";
import { visualColors } from "@/app/[locale]/styles/colors";

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
      <div className="flex w-[min(100%,34rem)] flex-col gap-4">
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
      className="flex max-h-[85dvh] min-h-0 flex-col overflow-hidden rounded-2xl bg-surface border border-line"
    >
      <ToolModalHeader
        toolName={t("bmiTitle")}
        toolIcon={<BmiCalculatorIcon className="size-7.5 text-content" />}
        onClose={onClose}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="type-label font-medium">
            {t("height")}
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-line-strong focus-within:ring-brand focus-within:ring-2 rounded-xl">
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
            <p className="type-label text-content-muted">{t("cm")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="type-label font-medium">
            {t("weight")}
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-line-strong focus-within:ring-brand focus-within:ring-2 rounded-xl">
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
            <p className="type-label text-content-muted">{t("kg")}</p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-line bg-surface p-5 sm:px-7.5">
        <button
          disabled={!showResultBtnActive}
          onClick={handleCalculateBMI}
          className={`
            rounded-full
            min-h-12
            type-control
            font-semibold
            w-full
            transition-colors 
            ${showResultBtnActive ? "bg-brand text-white hover:bg-brand-hover cursor-pointer" : "bg-line-strong text-white cursor-not-allowed"}
            }
            `}
        >
          <p className="">{t("seeResult")}</p>
        </button>
      </div>
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
      className="flex max-h-[85dvh] min-h-0 flex-col overflow-hidden rounded-2xl bg-surface border border-line"
    >
      <ToolModalHeader
        toolName={t("bmiTitle")}
        toolIcon={<BmiCalculatorIcon className="size-7.5 text-content" />}
        onClose={onClose}
      />

      <div className="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
        <div className="flex flex-col justify-center items-center gap-1">
          <p className="type-card-title font-medium">{t("bmiScore")}</p>
          <p className="text-3xl font-bold text-brand sm:text-4xl">
            {bmiResult?.bmi}
          </p>
          <p
            className={`type-card-title ${bmiResult?.status === "Normal" ? "text-(--color-palette-337516)" : "text-accent"} font-medium`}
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
          segmentColors={[
            visualColors.bmiLow,
            visualColors.bmiNormal,
            visualColors.bmiHigh,
            visualColors.bmiVeryHigh,
          ]}
          needleColor={visualColors.gaugeNeedle}
          needleHeightRatio={0.6}
          currentValueText=""
          textColor={visualColors.gaugeText}
          ringWidth={30}
          width={300}
          height={180}
          valueTextFontSize="0px"
        />

        <div className="w-full rounded-2xl border border-brand px-7.5 py-3 flex flex-col justify-center items-center gap-1.5 bg-brand-soft">
          <p className="type-label font-medium">{t("healthyBmiRange")}</p>
          <p className="type-card-title font-semibold text-brand">
            {HEALTHY_MIN} - {HEALTHY_MAX}{" "}
            <span className="type-label font-medium text-content-strong">
              kg/m²
            </span>
          </p>
        </div>

        {bmiResult?.status === "Normal" || (
          <div className="w-full rounded-2xl border border-accent px-7.5 py-3 flex flex-col justify-center items-center gap-1.5 bg-accent-softer">
            <p className="type-label font-medium">
              {t("bmiDifference", {
                difference: bmiResult?.differenceFromHealthy ?? 0,
                position: t(`weightPosition.${direction}`),
              })}
            </p>
            <p className="type-label text-content-strong">
              {t("bmiRecommendation", {
                action: t(`weightAction.${action}`),
                from: bmiResult?.weightRange?.from ?? "",
                to: bmiResult?.weightRange?.to ?? "",
              })}
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-line bg-surface p-5 sm:px-7.5">
        <CTA
          tryAgainHanlder={tryAgainHandler}
          getFullAssessment={onGetFullAnalysis}
        />
      </div>
    </motion.div>
  );
};

export default BMI;
