"use client";

import type { AssessmentSectionResult } from "@/app/[locale]/api/types/assessment.types";
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import GoalIcon from "@/app/[locale]/components/icons/GoalIcon";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import ProgressBar from "@/app/[locale]/components/Public/ProgressBar";
import { normalizeAssessmentStatus } from "@/app/[locale]/utils/groupAssessmentSectionsByStatus";
import { useTranslations } from "next-intl";

const STATUS = {
  Excellent: { color: "#22C55E", bg: "#F0FDF4" },
  Good: { color: "#65A30D", bg: "#F7FEE7" },
  Average: { color: "#F59E0B", bg: "#FFFBEB" },
  "Needs Improvement": { color: "#F97316", bg: "#FFF7ED" },
  "Needs Attention": { color: "#EF4444", bg: "#FEF2F2" },
};

const AssessmentInsightModal = ({
  section,
  onClose,
}: {
  section: AssessmentSectionResult;
  onClose: () => void;
}) => {
  const t = useTranslations("analysis");
  const normalizedStatus =
    normalizeAssessmentStatus(section.result.label) ?? "Average";
  const ui = STATUS[normalizedStatus];
  const statusLabel = t(
    {
      Excellent: "excellent",
      Good: "good",
      Average: "average",
      "Needs Improvement": "needsImprovement",
      "Needs Attention": "needsAttention",
    }[normalizedStatus],
  );
  const score = Math.ceil(section.sectionScore * 100);

  return (
    <ModalWrapper>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-insight-title"
        className="relative flex max-h-[85vh] w-full flex-col gap-5 overflow-y-auto rounded-3xl bg-[#FFFEFD] p-5 sm:w-[min(42rem,calc(100vw-2rem))] sm:gap-6 sm:p-6 md:p-7.5"
      >
        <div className="flex items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-3.5">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-full"
              style={{ background: ui.bg, color: ui.color }}
            >
              <GoalIcon />
            </div>
            <div className="min-w-0">
              <p className="mb-1 text-sm text-[#4F4F4F]">
                {t("sectionDetails")}
              </p>
              <h2
                id="assessment-insight-title"
                className="wrap-break-word text-lg font-bold text-[#111827] sm:text-xl"
              >
                {section.sectionTitle}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="shrink-0 rounded-full p-3 text-gray-500 transition-colors hover:bg-gray-100 cursor-pointer"
          >
            <CloseIcon className="text-gray-500" width="16" height="16" />
          </button>
        </div>

        <div className="rounded-2xl border border-[#E1E7EF] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#4F4F4F]">{t("score")}</span>
            <span className="text-lg font-bold" style={{ color: ui.color }}>
              {score}%
            </span>
          </div>
          <ProgressBar score={score} bgColor={ui.color} />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-[#111827]">
            {t("sectionInsight")}
          </h3>
          <div
            className="flex w-fit items-center gap-2 rounded-full px-3 py-1.5"
            style={{ background: ui.bg, color: ui.color }}
          >
            <span
              className="size-2.5 rounded-full"
              style={{ background: ui.color }}
            />
            <span className="text-sm font-semibold">{statusLabel}</span>
          </div>
        </div>

        {section.result.recommendations.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-[#111827]">
              {t("recommendations")}
            </h3>
            <ul className="flex list-disc flex-col gap-3 text-[#4F4F4F] marker:text-[#4D8E32]">
              {section.result.recommendations.map((recommendation, index) => (
                <li key={`${section.section}-${index}`} className="leading-7">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </ModalWrapper>
  );
};

export default AssessmentInsightModal;
