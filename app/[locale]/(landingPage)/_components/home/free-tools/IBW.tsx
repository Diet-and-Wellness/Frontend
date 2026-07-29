"use client";

import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GenderCard from "@/app/[locale]/components/Public/GenderCard";
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
      <div className="flex w-[min(100%,30rem)] flex-col gap-5">
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
      className="flex max-h-[calc(100dvh-1.5rem)] min-h-0 flex-col gap-6 overflow-y-auto overscroll-contain rounded-2xl bg-[#FFFEFD] p-5 sm:gap-7.5 sm:p-7.5"
    >
      <ToolModalHeader
        toolName={t("idealWeightTitle")}
        toolIconSrc="/icons/weightCalc.svg"
        onClose={onClose}
      />

      <div className="flex flex-col gap-5">
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
        onClick={handleCalculateIBW}
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
      className="flex max-h-[calc(100dvh-1.5rem)] min-h-0 flex-col items-center gap-5 overflow-y-auto overscroll-contain rounded-2xl bg-[#FFFEFD] p-5 sm:p-7.5"
    >
      <ToolModalHeader
        toolName={t("idealWeightTitle")}
        toolIconSrc="/icons/weightCalc.svg"
        onClose={onClose}
      />

      <p className="type-body text-[#4F4F4F] font-medium">
        {t("idealWeightRange")}
      </p>

      <p className="text-3xl font-semibold text-[#4D8E32] sm:text-4xl">
        {ibwResult?.idealWeightRange.min} — {ibwResult?.idealWeightRange.max}{" "}
        {t("kg")}
      </p>

      <div className="w-full bg-[#EDF4EB] px-7.5 py-4 rounded-2xl border border-[#4D8E32] flex flex-col justify-center items-center gap-1.5">
        <p className="type-card-title font-medium">{t("idealWeight")}</p>
        <p className="type-card-title font-bold text-[#4D8E32]">
          {ibwResult?.idealWeight} <span>{t("kg")}</span>
        </p>
      </div>

      <div className="mb-5 w-full bg-[#FDF4EB] px-7.5 py-4 rounded-2xl border border-[#E99532] flex flex-col justify-center items-center gap-1.5">
        <p className="type-body font-medium text-[#4D8E32]">
          {t("idealWeightDifference", {
            difference: ibwResult?.difference ?? 0,
            position: t(`weightPosition.${status}`),
          })}
        </p>
        <p className="type-label font-medium text-[#4F4F4F]">
          {t("idealWeightRecommendation", {
            action: t(`weightAction.${action}`),
            difference: ibwResult?.difference ?? 0,
          })}
        </p>
      </div>

      <CTA
        tryAgainHanlder={tryAgainHandler}
        getFullAssessment={onGetFullAnalysis}
      />
    </motion.div>
  );
};

export default IBW;
