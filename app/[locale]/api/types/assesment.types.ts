export interface FormId {
  id: string;
}

export interface UpdateFormRequest {
  title: {
    en: string;
    ar: string;
  };
}

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ResultRange {
  minScore: number;
  maxScore: number;
  label: LocalizedText;
  description: LocalizedText;
  recommendations: LocalizedText[];
}

export interface AddSectionRequest {
  title: LocalizedText;
  description: LocalizedText;
  order: number;
  resultRanges: ResultRange[];
}

export interface SectionId {
  id: string;
}

export interface UpdateSectionRequest {
  title: { en: string; ar: string };
  order: number;
  description: {
    en: string;
    ar: string;
  };
}

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ResultRange {
  minScore: number;
  maxScore: number;
  label: LocalizedText;
  description: LocalizedText;
  recommendations: LocalizedText[];
}

export interface UpdateResultRangesForSectionRequest {
  resultRanges: ResultRange[];
}

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface QuestionCondition {
  questionId: string;
  choiceIds: string[];
}

export interface QuestionChoice {
  text: LocalizedText;
  score: number;
}

export interface CreateQuestionRequest {
  text: LocalizedText;
  order: number;
  condition: QuestionCondition;
  choices: QuestionChoice[];
}

export interface QuestionId {
  id: string;
}

export interface UpdateQuestionTextRequest {
  text: {
    en: string;
    ar: string;
  };
}

export interface GetAssessmentSubmissionsRequest {
  page?: number;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface UserId {
  id: string;
}

export interface AssessmentAnswer {
  questionId: string;
  choiceId: string;
}

export interface SubmitAssessmentSectionRequest {
  answers: AssessmentAnswer[];
}

export interface AssessmentAnswer {
  questionId: string;
  choiceId: string;
}

export interface SubmitAssessmentRequest {
  answers: AssessmentAnswer[];
}

export interface AssessmentAnswer {
  questionId: string;
  choiceId: string;
}

export interface AssessmentSectionSubmission {
  sectionId: string;
  answers: AssessmentAnswer[];
}

export interface SubmitAssessmentFormRequest {
  formId: string;
  sections: AssessmentSectionSubmission[];
}
