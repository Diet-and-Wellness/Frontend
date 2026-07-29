export type AssessmentAnswers = Record<
  string,
  Record<
    string,
    {
      choiceId?: string;
      text?: string;
    }
  >
>;

export type AssessmentDraft = {
  formId: string;
  currentSectionIndex: number;
  lastAnsweredSectionIndex: number;
  answers: AssessmentAnswers;
  updatedAt: number;
};

const getDraftKey = (userId: string) => `nutrition-analysis-draft:${userId}`;

const isValidDraft = (value: unknown): value is AssessmentDraft => {
  if (!value || typeof value !== "object") return false;

  const draft = value as Partial<AssessmentDraft>;

  if (
    typeof draft.formId !== "string" ||
    typeof draft.currentSectionIndex !== "number" ||
    typeof draft.lastAnsweredSectionIndex !== "number" ||
    typeof draft.answers !== "object" ||
    draft.answers === null ||
    typeof draft.updatedAt !== "number"
  ) {
    return false;
  }

  return (
    Number.isInteger(draft.currentSectionIndex) &&
    draft.currentSectionIndex >= 0 &&
    Number.isInteger(draft.lastAnsweredSectionIndex) &&
    draft.lastAnsweredSectionIndex >= 0
  );
};

export const readAssessmentDraft = (userId: string) => {
  if (typeof window === "undefined") return null;

  try {
    const storedDraft = window.localStorage.getItem(getDraftKey(userId));
    if (!storedDraft) return null;

    const draft: unknown = JSON.parse(storedDraft);
    return isValidDraft(draft) ? draft : null;
  } catch {
    return null;
  }
};

export const saveAssessmentDraft = (userId: string, draft: AssessmentDraft) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(getDraftKey(userId), JSON.stringify(draft));
  } catch {
  }
};

export const clearAssessmentDraft = (userId: string) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(getDraftKey(userId));
  } catch {
  }
};

export const hasAssessmentDraft = (userId: string) => {
  const draft = readAssessmentDraft(userId);

  return Boolean(
    draft &&
      (draft.currentSectionIndex > 0 || Object.keys(draft.answers).length > 0),
  );
};
