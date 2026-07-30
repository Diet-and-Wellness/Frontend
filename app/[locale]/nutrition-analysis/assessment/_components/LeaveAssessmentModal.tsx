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
        className="relative flex max-h-[85dvh] w-[min(100%,30rem)] flex-col overflow-hidden rounded-2xl bg-surface shadow-2xl"
      >
        <button
          aria-label={t("close")}
          onClick={onClose}
          className="absolute end-3 top-3 rounded-full p-3 text-content-subtle transition-colors hover:bg-surface-neutral cursor-pointer"
        >
          <CloseIcon className="text-current" width="16" height="16" />
        </button>

        <div className="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto p-6 text-center overscroll-contain sm:p-7.5">
          <LeaveAssessmentIllustration />

          <div className="flex flex-col gap-2">
            <h3
              id="leave-assessment-title"
              className="type-card-title font-semibold text-content-strong"
            >
              {t("exitAssessmentTitle")}
            </h3>
            <p className="type-body text-content-muted">
              {t("exitAssessmentDescription")}
            </p>
          </div>

        </div>

        <div className="flex w-full shrink-0 flex-col gap-2.5 border-t border-line bg-surface p-6 sm:px-7.5">
            <button
              onClick={onConfirm}
              className="type-control min-h-12 w-full rounded-full bg-brand px-5 font-semibold text-white transition-colors hover:bg-brand-hover cursor-pointer"
            >
              {t("saveAndExit")}
            </button>
            <button
              onClick={onClose}
              className="type-control min-h-12 w-full rounded-full border border-line bg-surface-raised px-5 font-semibold text-content-muted transition-colors hover:bg-surface-muted cursor-pointer"
            >
              {t("stayInAssessment")}
            </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default LeaveAssessmentModal;
