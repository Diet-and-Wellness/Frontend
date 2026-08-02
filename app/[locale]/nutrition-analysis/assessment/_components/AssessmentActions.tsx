"use client";

import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";
import { useLocale, useTranslations } from "next-intl";

const AssessmentActions = ({
  nextBtnDisabled,
  backBtnDisabled,
  isLastQuestion,
  onNext,
  onBack,
}: {
  nextBtnDisabled: boolean;
  backBtnDisabled: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
  onBack: () => void;
}) => {
  const t = useTranslations("analysis");
  const isArabic = useLocale() === "ar";

  return (
    <div className="sticky bottom-0 z-20 flex w-full items-center justify-between gap-3 border-t border-line bg-surface py-4 sm:gap-5 sm:border-transparent sm:py-7">
      <button
        disabled={backBtnDisabled}
        onClick={onBack}
        className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 ring-2 sm:flex-none sm:px-7.5 ${backBtnDisabled ? "ring-line-strong cursor-not-allowed" : "ring-accent cursor-pointer"}`}
      >
        <ArrowIcon
          className={`shrink-0 w-3 md:w-3.5 h-auto ${backBtnDisabled ? "text-content-subtle" : "text-accent"} ${isArabic ? "rotate-y-180" : ""}`}
        />
        <span
          className={`type-control font-semibold ${backBtnDisabled ? "text-content-subtle" : "text-accent"}`}
        >
          {t("back")}
        </span>
      </button>

      <button
        disabled={nextBtnDisabled}
        onClick={onNext}
        className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 sm:flex-none sm:px-7.5 ${nextBtnDisabled ? "bg-line-strong cursor-not-allowed" : "bg-brand cursor-pointer"}`}
      >
        <span
          className={`type-control font-semibold ${nextBtnDisabled ? "text-content-subtle" : "text-surface-raised"}`}
        >
          {isLastQuestion ? t("submit") : t("next")}
        </span>
        <ArrowIcon
          className={`shrink-0 w-3 md:w-3.5 h-auto ${nextBtnDisabled ? "text-content-subtle" : "text-surface-raised"} ${isArabic ? "" : "rotate-y-180"}`}
        />
      </button>
    </div>
  );
};

export default AssessmentActions;
