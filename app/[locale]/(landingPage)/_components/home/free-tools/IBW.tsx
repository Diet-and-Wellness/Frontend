"use client";

import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GenderCard from "@/app/[locale]/components/Public/GenderCard";
import CTA from "./CTAFreeToolsResult";
import ToolModalHeader from "./ToolModalHeader";
import IdealWeightIcon from "@/app/[locale]/components/icons/IdealWeightIcon";
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

interface IdealWeightResult {
  idealWeight: number;
  idealWeightRange: {
    min: number;
    max: number;
  };
  difference: number;
  action: "Gaining" | "Losing" | "Maintaining";
  status: "above" | "below" | "healthy";
}

type Gender = "male" | "female";

const IBW = ({
  onClose,
  onGetFullAnalysis,
}: {
  onClose: () => void;
  onGetFullAnalysis: () => void;
}) => {
  const [showResult, setShowResult] = useState(false);
  const [ibwResult, setIbwResult] = useState<IdealWeightResult | null>(null);

  const showResultHandler = (ibwResult: IdealWeightResult) => {
    setIbwResult(ibwResult);
    setShowResult(true);
  };

  const tryAgainHandler = () => {
    setShowResult(false);
  };

  return (
    <ModalWrapper>
      <div className="flex w-[min(100%,34rem)] flex-col gap-5">
        <AnimatePresence mode="wait">
          {showResult ? (
            <IbwResult
              ibwResult={ibwResult}
              tryAgainHandler={tryAgainHandler}
              onGetFullAnalysis={onGetFullAnalysis}
              onClose={onClose}
            />
          ) : (
            <IbwForm showResultHandler={showResultHandler} onClose={onClose} />
          )}
        </AnimatePresence>
      </div>
    </ModalWrapper>
  );
};

const IbwForm = ({
  showResultHandler,
  onClose,
}: {
  showResultHandler: (IbwResult: IdealWeightResult) => void;
  onClose: () => void;
}) => {
  const t = useTranslations("calculators");
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [gender, setGender] = useState<Gender>("male");

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

  const handleCalculateIBW = () => {
    const ibw = healthMetrics.calculateIdealWeightResult({
      heightCm: heightCm,
      weightKg: weightKg,
      gender: gender,
    });
    showResultHandler(ibw);
  };

  const showResultBtnActive = !!heightCm && !!weightKg;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex max-h-[85dvh] min-h-0 flex-col overflow-hidden rounded-2xl bg-surface"
    >
      <div className="shrink-0 border-b border-line p-5 sm:px-7.5 sm:py-5">
      <ToolModalHeader
        toolName={t("idealWeightTitle")}
        toolIcon={<IdealWeightIcon className="size-7.5 text-content" />}
        onClose={onClose}
      />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
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
        onClick={handleCalculateIBW}
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

const IbwResult = ({
  ibwResult,
  tryAgainHandler,
  onGetFullAnalysis,
  onClose,
}: {
  ibwResult: IdealWeightResult | null;
  tryAgainHandler: () => void;
  onGetFullAnalysis: () => void;
  onClose: () => void;
}) => {
  const t = useTranslations("calculators");
  const status = ibwResult?.status ?? "healthy";
  const action = ibwResult?.action ?? "Maintaining";

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex max-h-[85dvh] min-h-0 flex-col overflow-hidden rounded-2xl bg-surface"
    >
      <div className="shrink-0 border-b border-line p-5 sm:px-7.5 sm:py-5">
      <ToolModalHeader
        toolName={t("idealWeightTitle")}
        toolIcon={<IdealWeightIcon className="size-7.5 text-content" />}
        onClose={onClose}
      />
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
      <p className="type-body text-content-muted font-medium">
        {t("idealWeightRange")}
      </p>

      <p className="text-3xl font-semibold text-brand sm:text-4xl">
        {ibwResult?.idealWeightRange.min} — {ibwResult?.idealWeightRange.max}{" "}
        {t("kg")}
      </p>

      <div className="w-full bg-brand-soft px-7.5 py-4 rounded-2xl border border-brand flex flex-col justify-center items-center gap-1.5">
        <p className="type-card-title font-medium">{t("idealWeight")}</p>
        <p className="type-card-title font-bold text-brand">
          {ibwResult?.idealWeight} <span>{t("kg")}</span>
        </p>
      </div>

      <div className="mb-5 w-full bg-accent-softer px-7.5 py-4 rounded-2xl border border-accent flex flex-col justify-center items-center gap-1.5">
        <p className="type-body font-medium text-brand">
          {t("idealWeightDifference", {
            difference: ibwResult?.difference ?? 0,
            position: t(`weightPosition.${status}`),
          })}
        </p>
        <p className="type-label font-medium text-content-muted">
          {t("idealWeightRecommendation", {
            action: t(`weightAction.${action}`),
            difference: ibwResult?.difference ?? 0,
          })}
        </p>
      </div>
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

export default IBW;
