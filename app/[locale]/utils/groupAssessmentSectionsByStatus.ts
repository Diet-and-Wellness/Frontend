import { AssessmentSectionResult } from "../api/types/assessment.types";

type AssessmentStatus =
  | "Excellent"
  | "Good"
  | "Average"
  | "Needs Improvement"
  | "Needs Attention";

export const groupAssessmentSectionsByStatus = (
  sections: AssessmentSectionResult[],
) => {
  return sections?.reduce<Record<AssessmentStatus, AssessmentSectionResult[]>>(
    (acc, section) => {
      if (!section.result) return acc;
      const status = section.result.label as AssessmentStatus;
      acc[status].push(section);
      return acc;
    },
    {
      Excellent: [],
      Good: [],
      Average: [],
      "Needs Improvement": [],
      "Needs Attention": [],
    },
  );
};
