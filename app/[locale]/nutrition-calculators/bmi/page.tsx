"use client";

import { useState } from "react";
import ToolModalHeader from "../_components/ToolModalHeader";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";
import { useTranslations } from "next-intl";
import BmiResultModal from "../_components/Modals/BmiResultModal";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
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

const BmiCalculatorPage = () => {
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);

  const showResultHandler = (bmiResult: BMIResult) => {
    setBmiResult(bmiResult);
    setShowResult(true);
  };

  const onTryAgain = () => {
    setShowResult(false);
  };

  const t = useTranslations("calculators");

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
      className="flex h-fit min-h-0 w-[min(100%,35rem)] flex-col overflow-hidden rounded-2xl bg-surface border border-line"
    >
      <AnimatePresence mode="wait">
        {showResult && (
          <BmiResultModal bmiResult={bmiResult} tryAgainHandler={onTryAgain} />
        )}
      </AnimatePresence>

      <ToolModalHeader toolName={t("bmiTitle")} />

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="type-label font-medium text-content">
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
              className="w-full outline-none text-content"
              placeholder={t("enterHeight")}
            />
            <p className="type-label text-content-muted">{t("cm")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="type-label font-medium text-content">
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
              className="w-full outline-none text-content"
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

export default BmiCalculatorPage;
