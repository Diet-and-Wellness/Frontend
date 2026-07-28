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

export type SectionId = string;

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

export interface SubmitAssessmentSectionRequest {
  answers: AssessmentAnswerRequest[];
}

export type AssessmentAnswerRequest =
  | {
      questionId: string;
      choiceId: string;
    }
  | {
      questionId: string;
      answerText: string;
    };

export interface SubmitAssessmentRequest {
  answers: AssessmentAnswerRequest[];
}

export interface AssessmentSectionSubmission {
  sectionId: string;
  answers: AssessmentAnswerRequest[];
}

export interface SubmitAssessmentFormRequest {
  formId: string;
  sections: AssessmentSectionSubmission[];
}

export interface Choice {
  id: string;
  text: string;
}

export interface VisibilityCondition {
  rules: unknown[]; // Replace with a proper type if rules have a known structure
  logic: "AND" | "OR";
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  order: number;
  condition: unknown | null; // Replace with a proper type if available
  choices: Choice[];
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  isText: boolean;
  form: string;
  order: number;

  questions: AssessmentQuestion[];

  visibilityCondition: VisibilityCondition;

  createdAt: string;
  updatedAt: string;

  totalSections: number;
  sectionIndex: number;

  nextSectionId: string | null;
  prevSectionId: string | null;
}

export interface AssessmentSectionResult {
  sectionTitle: string;
  section: string;
  sectionScore: number;
  result: AssessmentResult;
  answers: AssessmentAnswerResponse[];
}

export interface AssessmentResult {
  label:
    | "Excellent"
    | "Good"
    | "Average"
    | "Needs Improvement"
    | "Needs Attention";
  description: string;
  recommendations: string[];
}

export interface AssessmentAnswerResponse {
  questionText: string;
  choiceText: string;
  questionId: string;
  choiceId: string;
  answerText: string | null;
  score: number;
  wasConditional: boolean;
}

export type Gender = "male" | "female";

export type ActivityLevel = "low" | "moderate" | "high" | "extreme";

export interface CalorieCalculatorResult {
  bmi: number;
  bmiStatus: "Underweight" | "Normal" | "Overweight" | "Obesity";

  bmr: number;
  tdee: number;

  maintenanceCalories: number;
  fatLossCalories: number;
  muscleGainCalories: number;

  macros: {
    maintenance: MacroResult;
    fatLoss: MacroResult;
    muscleGain: MacroResult;
  };
}

export interface MacroResult {
  calories: number;

  protein: {
    grams: number;
    calories: number;
  };

  carbs: {
    grams: number;
    calories: number;
  };

  fat: {
    grams: number;
    calories: number;
  };
}