import ProgressBar from "@/app/[locale]/components/Public/ProgressBar";

interface FocusAreaCardProps {
  title: string;
  score: number;
  description: string;
  icon: React.ReactNode;
  status:
    | "Excellent"
    | "Good"
    | "Average"
    | "Needs Improvement"
    | "Needs Attention";
}

const STATUS = {
  Excellent: {
    label: "Excellent",
    color: "#22C55E",
    bg: "#F0FDF4",
  },

  Good: {
    label: "Good",
    color: "#65A30D",
    bg: "#F7FEE7",
  },

  Average: {
    label: "Average",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },

  ["Needs Improvement"]: {
    label: "Needs Improvement",
    color: "#F97316",
    bg: "#FFF7ED",
  },

  ["Needs Attention"]: {
    label: "Needs Attention",
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
}: FocusAreaCardProps) => {
  const ui = STATUS[status];

  return (
    <div className="bg-white rounded-2xl border border-[#E1E7EF] p-5 flex flex-col justify-between gap-3">
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

          <span className="font-semibold text-[13px]">{ui.label}</span>
        </div>
      </div>

      <h3 className="text-[18px] font-medium">{title}</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-[#4F4F4F]">Score</span>
          <span className="text-[14px] font-semibold">{score}%</span>
        </div>
        <ProgressBar score={score} bgColor={ui.color} />
      </div>

      <p className="text-[14px] leading-[1.45] text-[#595959] line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export default AssessmentInsightCard;
