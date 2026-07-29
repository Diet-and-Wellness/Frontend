"use client";

import type { AssessmentSectionResult } from "@/app/[locale]/api/types/assessment.types";
import AssessmentInsightCard from "./AssessmentInsightCard";
import AssessmentInsightModal from "./AssessmentInsightModal";
import GoalIcon from "@/app/[locale]/components/icons/GoalIcon";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  const [selectedSection, setSelectedSection] =
    useState<AssessmentSectionResult | null>(null);

  return (
    <>
      <div className="flex flex-col gap-6 sm:gap-7.5">
        <div className="max-w-160">
          <p className="type-card-title mb-1.5 font-bold">{title}</p>
          <p className="type-body text-[#4F4F4F]">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-7.5">
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
                onClick={() => setSelectedSection(section)}
              />
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedSection && (
          <AssessmentInsightModal
            section={selectedSection}
            onClose={() => setSelectedSection(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
