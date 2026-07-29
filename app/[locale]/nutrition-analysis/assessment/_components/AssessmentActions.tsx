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
    <div className="sticky bottom-0 z-20 flex w-full items-center justify-between gap-3 border-t border-[#F1F3F5] bg-white py-4 sm:gap-5 sm:border-transparent sm:py-7">
      <button
        disabled={backBtnDisabled}
        onClick={onBack}
        className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 ring-2 sm:flex-none sm:px-7.5 ${backBtnDisabled ? "ring-gray-300 cursor-not-allowed" : "ring-[#E99532] cursor-pointer"}`}
      >
        <ArrowIcon
          className={`shrink-0 ${backBtnDisabled ? "text-gray-500" : "text-[#E99532]"} ${isArabic ? "rotate-y-180" : ""}`}
        />
        <span
          className={`type-control font-medium ${backBtnDisabled ? "text-gray-500" : "text-[#E99532]"}`}
        >
          {t("back")}
        </span>
      </button>

      <button
        disabled={nextBtnDisabled}
        onClick={onNext}
        className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 sm:flex-none sm:px-7.5 ${nextBtnDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#4D8E32] cursor-pointer"}`}
      >
        <span
          className={`type-control font-medium ${nextBtnDisabled ? "text-gray-500" : "text-[#FDFDFD]"}`}
        >
          {isLastQuestion ? t("submit") : t("next")}
        </span>
        <ArrowIcon
          className={`shrink-0 ${nextBtnDisabled ? "text-gray-500" : "text-[#FDFDFD]"} ${isArabic ? "" : "rotate-y-180"}`}
        />
      </button>
    </div>
  );
};

export default AssessmentActions;
