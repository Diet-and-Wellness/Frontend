import { AssessmentSectionResult } from "../api/types/assessment.types";

export type AssessmentStatus =
  | "Excellent"
  | "Good"
  | "Average"
  | "Needs Improvement"
  | "Needs Attention";

const statusAliases: Record<string, AssessmentStatus> = {
  Excellent: "Excellent",
  ممتاز: "Excellent",
  Good: "Good",
  جيد: "Good",
  Average: "Average",
  متوسط: "Average",
  "Needs Improvement": "Needs Improvement",
  "يحتاج إلى تحسين": "Needs Improvement",
  "Needs Attention": "Needs Attention",
  "يحتاج إلى اهتمام": "Needs Attention",
};

export const normalizeAssessmentStatus = (status: string): AssessmentStatus | undefined =>
  statusAliases[status.trim()];

export const groupAssessmentSectionsByStatus = (
  sections: AssessmentSectionResult[] | undefined,
) => {
  const emptyGroups: Record<AssessmentStatus, AssessmentSectionResult[]> = {
    Excellent: [],
    Good: [],
    Average: [],
    "Needs Improvement": [],
    "Needs Attention": [],
  };

  return sections?.reduce<Record<AssessmentStatus, AssessmentSectionResult[]>>(
    (acc, section) => {
      if (!section.result) return acc;

      const status = normalizeAssessmentStatus(section.result.label);

      if (status) {
        acc[status]?.push(section);
      }

      return acc;
    },
    emptyGroups,
  );
};
