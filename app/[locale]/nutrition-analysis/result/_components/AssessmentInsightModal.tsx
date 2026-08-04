"use client";

import type { AssessmentSectionResult } from "@/app/[locale]/api/types/assessment.types";
import GoalIcon from "@/app/[locale]/components/icons/GoalIcon";
import { CloseBtn } from "@/app/[locale]/components/Public/CloseBtn";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import ProgressBar from "@/app/[locale]/components/Public/ProgressBar";
import { normalizeAssessmentStatus } from "@/app/[locale]/utils/groupAssessmentSectionsByStatus";
import { useTranslations } from "next-intl";

const STATUS = {
  Excellent: {
    color: "var(--color-palette-22c55e)",
    bg: "var(--color-palette-f0fdf4)",
  },
  Good: {
    color: "var(--color-palette-65a30d)",
    bg: "var(--color-palette-f7fee7)",
  },
  Average: {
    color: "var(--color-palette-f59e0b)",
    bg: "var(--color-palette-fffbeb)",
  },
  "Needs Improvement": {
    color: "var(--color-palette-f97316)",
    bg: "var(--color-palette-fff7ed)",
  },
  "Needs Attention": {
    color: "var(--color-palette-ef4444)",
    bg: "var(--color-palette-fef2f2)",
  },
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
        className="relative flex max-h-[85dvh] w-full flex-col overflow-hidden rounded-3xl bg-surface sm:w-[min(42rem,calc(100vw-2rem))] border border-line"
      >
        <div className="flex flex-col shrink-0 items-start justify-between gap-1 border-b border-line px-5 py-4">
          <div className="flex justify-between items-start w-full">
            <div className="flex min-w-0 items-center gap-3.5">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full"
                style={{ background: ui.bg, color: ui.color }}
              >
                <GoalIcon />
              </div>
              <div className="min-w-0">
                <h2
                  id="assessment-insight-title"
                  className="wrap-break-word text-lg font-bold text-content sm:text-xl"
                >
                  {section.sectionTitle}
                </h2>
              </div>
            </div>
            <CloseBtn onClose={onClose} />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 overscroll-contain sm:gap-6 sm:p-6 md:p-7.5">
          <div className="rounded-2xl border border-line bg-surface-raised p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-content-muted">{t("score")}</span>
              <span className="text-lg font-bold" style={{ color: ui.color }}>
                {score}%
              </span>
            </div>
            <ProgressBar score={score} bgColor={ui.color} />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-content">
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
              <h3 className="text-lg font-semibold text-content">
                {t("recommendations")}
              </h3>
              <ul className="flex list-disc flex-col gap-3 text-content-muted marker:text-brand">
                {section.result.recommendations.map((recommendation, index) => (
                  <li key={`${section.section}-${index}`} className="leading-7">
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </ModalWrapper>
  );
};

export default AssessmentInsightModal;
