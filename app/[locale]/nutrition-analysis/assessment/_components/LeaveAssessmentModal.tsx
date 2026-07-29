"use client";

import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useTranslations } from "next-intl";
import LeaveAssessmentIllustration from "./LeaveAssessmentIllustration";

type LeaveAssessmentModalProps = {
  onClose: () => void;
  onConfirm: () => void;
};

const LeaveAssessmentModal = ({
  onClose,
  onConfirm,
}: LeaveAssessmentModalProps) => {
  const t = useTranslations("analysis");

  return (
    <ModalWrapper>
      <div
        aria-labelledby="leave-assessment-title"
        aria-modal="true"
        role="dialog"
        className="relative w-[min(100%,30rem)] rounded-2xl bg-[#FFFEFD] p-6 sm:p-7.5 shadow-2xl"
      >
        <button
          aria-label={t("close")}
          onClick={onClose}
          className="absolute end-3 top-3 rounded-full p-3 text-[#6B7280] transition-colors hover:bg-[#F3F4F6] cursor-pointer"
        >
          <CloseIcon className="text-current" width="16" height="16" />
        </button>

        <div className="flex flex-col items-center gap-5 text-center">
          <LeaveAssessmentIllustration />

          <div className="flex flex-col gap-2">
            <h3
              id="leave-assessment-title"
              className="type-card-title font-semibold text-[#1F2937]"
            >
              {t("exitAssessmentTitle")}
            </h3>
            <p className="type-body text-[#4F4F4F]">
              {t("exitAssessmentDescription")}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2.5 pt-1">
            <button
              onClick={onConfirm}
              className="type-control min-h-12 w-full rounded-full bg-[#4D8E32] px-5 font-semibold text-white transition-colors hover:bg-[#3A6B26] cursor-pointer"
            >
              {t("saveAndExit")}
            </button>
            <button
              onClick={onClose}
              className="type-control min-h-12 w-full rounded-full border border-[#E1E7EF] bg-white px-5 font-semibold text-[#4F4F4F] transition-colors hover:bg-[#F9FAFB] cursor-pointer"
            >
              {t("stayInAssessment")}
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LeaveAssessmentModal;
