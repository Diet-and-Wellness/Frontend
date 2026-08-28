"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GenderCard from "@/app/[locale]/components/Public/GenderCard";
import ToolModalHeader from "../_components/ToolModalHeader";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";
import { useTranslations } from "next-intl";
import HealthyWeightResultModal from "../_components/Modals/HealthyWeightResultModal";

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

interface HealthyWeightResult {
  healthyWeight: number;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  difference: number;
  action: "Gaining" | "Losing" | "Maintaining";
  status: "above" | "below" | "healthy";
}

type Gender = "male" | "female";

const HealthWeightPage = () => {
  const [showResult, setShowResult] = useState(false);
  const [ibwResult, setIbwResult] = useState<HealthyWeightResult | null>(null);
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [gender, setGender] = useState<Gender>("male");

  const t = useTranslations("calculators");

  const showResultHandler = (ibwResult: HealthyWeightResult) => {
    setIbwResult(ibwResult);
    setShowResult(true);
  };

  const tryAgainHandler = () => {
    setShowResult(false);
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

  const handleCalculateIBW = () => {
    const ibw = healthMetrics.calculateHealthyWeightResult({
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
      className="flex max-h-[85dvh] min-h-0 w-[min(100%,35rem)] flex-col overflow-hidden rounded-2xl bg-surface border border-line"
    >
      <AnimatePresence mode="wait">
        {showResult && (
          <HealthyWeightResultModal
            ibwResult={ibwResult}
            tryAgainHandler={tryAgainHandler}
          />
        )}
      </AnimatePresence>

      <ToolModalHeader toolName={t("healthyWeightTitle")} />

      <div className="flex flex-1 flex-col gap-5 p-5 overscroll-contain sm:p-7.5">
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
          <label htmlFor="" className="type-label font-medium text-content">
            {t("height")}
          </label>
          <div className="flex items-center gap-2.5 rounded-xl border border-line-strong px-3.5 py-2.5 transition-colors focus-within:border-brand">
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
          <div className="flex items-center gap-2.5 rounded-xl border border-line-strong px-3.5 py-2.5 transition-colors focus-within:border-brand">
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

export default HealthWeightPage;
