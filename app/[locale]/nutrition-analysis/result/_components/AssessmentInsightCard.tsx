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
    color: "#22C55E",
    bg: "#F0FDF4",
  },

  Good: {
    color: "#65A30D",
    bg: "#F7FEE7",
  },

  Average: {
    color: "#F59E0B",
    bg: "#FFFBEB",
  },

  ["Needs Improvement"]: {
    color: "#F97316",
    bg: "#FFF7ED",
  },

  ["Needs Attention"]: {
    color: "#EF4444",
    bg: "#FEF2F2",
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
      className="flex w-full flex-col justify-between gap-3 rounded-2xl border border-[#E1E7EF] bg-white p-5 text-start transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4D8E32] hover:shadow-sm cursor-pointer"
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
          className="rounded-full px-3 py-1 flex items-center gap-2"
          style={{
            background: ui.bg,
            color: ui.color,
          }}
        >
          <div
            className="size-2.5 rounded-full"
            style={{
              background: ui.color,
            }}
          />

          <span className="type-meta font-semibold">{statusLabel}</span>
        </div>
      </div>

      <h3 className="type-card-title font-medium">{title}</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="type-meta text-[#4F4F4F]">{t("score")}</span>
          <span className="type-meta font-semibold">{score}%</span>
        </div>
        <ProgressBar score={score} bgColor={ui.color} />
      </div>

      <p className="type-label line-clamp-2 text-[#595959]">
        {description}
      </p>
    </button>
  );
};

export default AssessmentInsightCard;
