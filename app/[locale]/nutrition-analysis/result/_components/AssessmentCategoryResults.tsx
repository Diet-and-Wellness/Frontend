import type { AssessmentSectionResult } from "@/app/[locale]/api/types/assessment.types";
import AssessmentInsightCard from "./AssessmentInsightCard";
import GoalIcon from "@/app/[locale]/components/icons/GoalIcon";

type AssessmentCategoryResultsProps = {
  title: string;
  description: string;
  sections: AssessmentSectionResult[];
};

export default function AssessmentCategoryResults({
  title,
  description,
  sections,
}: AssessmentCategoryResultsProps) {
  return (
    <div className="flex flex-col gap-7.5">
      <div className="max-w-160">
        <p className="text-[25px] font-bold mb-1.5">{title}</p>
        <p className="text-[#4F4F4F] text-[16px]">{description}</p>
      </div>

      <div className="grid grid-cols-3 gap-7.5">
        {sections.map((section) => {
          if (!section.result) return null;

          return (
            <AssessmentInsightCard
              key={section.section}
              title={section.sectionTitle}
              score={Math.ceil(section.sectionScore * 100)}
              status={section.result.label}
              description={section.result.recommendations[0]}
              icon={<GoalIcon />}
            />
          );
        })}
      </div>
    </div>
  );
}
