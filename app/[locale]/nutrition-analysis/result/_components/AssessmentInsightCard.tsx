import ProgressBar from "@/app/[locale]/components/Public/ProgressBar";
import { normalizeAssessmentStatus } from "@/app/[locale]/utils/groupAssessmentSectionsByStatus";
import { useTranslations } from "next-intl";

interface FocusAreaCardProps {
  title: string;
  score: number;
  description: string;
  icon: React.ReactNode;
  status: string;
  onClick: () => void;
}

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

  ["Needs Improvement"]: {
    color: "var(--color-palette-f97316)",
    bg: "var(--color-palette-fff7ed)",
  },

  ["Needs Attention"]: {
    color: "var(--color-palette-ef4444)",
    bg: "var(--color-palette-fef2f2)",
  },
};

const AssessmentInsightCard = ({
  title,
  score,
  description,
  icon,
  status,
  onClick,
}: FocusAreaCardProps) => {
  const t = useTranslations("analysis");
  const normalizedStatus = normalizeAssessmentStatus(status) ?? "Average";
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

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col justify-between gap-3 rounded-2xl border border-line bg-surface-raised p-5 text-start transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-sm cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div
          className="size-12 rounded-full flex items-center justify-center"
          style={{
            background: ui.bg,
            color: ui.color,
          }}
        >
          {icon}
        </div>

        <div
          className="rounded-full px-5 py-1"
          style={{
            background: ui.bg,
            color: ui.color,
          }}
        >
          <span className="type-meta font-semibold">{statusLabel}</span>
        </div>
      </div>

      <h3 className="type-card-title font-medium">{title}</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="type-meta text-content-muted">{t("score")}</span>
          <span className="type-meta font-semibold">{score}%</span>
        </div>
        <ProgressBar score={score} bgColor={ui.color} />
      </div>

      <p className="type-label line-clamp-2 text-content-muted">
        {description}
      </p>
    </button>
  );
};

export default AssessmentInsightCard;
