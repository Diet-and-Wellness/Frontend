import apiClient from "../index";
import type {
  AddSectionRequest,
  CreateQuestionRequest,
  FormId,
  GetAssessmentSubmissionsRequest,
  QuestionId,
  SectionId,
  SubmitAssessmentFormRequest,
  SubmitAssessmentRequest,
  SubmitAssessmentSectionRequest,
  UpdateFormRequest,
  UpdateQuestionTextRequest,
  UpdateResultRangesForSectionRequest,
  UpdateSectionRequest,
  UserId,
} from "../types/assesment.types";

export const assesmentApi = {
  createForm: () => {
    return apiClient.post("assessments/admin/forms");
  },
  listForms: () => {
    return apiClient.get("assessments/admin/forms");
  },
  getFormWithSections: (formId: FormId) => {
    return apiClient.get(`/assessments/admin/forms/${formId}`);
  },
  updateForm: (formId: FormId, data: UpdateFormRequest) => {
    return apiClient.put(`/assessments/admin/forms/${formId}`, data);
  },
  activateForm: (formId: FormId) => {
    return apiClient.patch(`/assessments/admin/forms/${formId}/activate`);
  },
  deleteForm: (formId: FormId) => {
    return apiClient.delete(`assessments/admin/forms/${formId}`);
  },
  addSection: (formId: FormId, data: AddSectionRequest) => {
    return apiClient.post(`/assessments/admin/forms/${formId}/sections`, data);
  },
  updateSection: (sectionId: SectionId, data: UpdateSectionRequest) => {
    return apiClient.post(`/assessments/admin/sections/${sectionId}`, data);
  },
  updateResultRangesForSection: (
    sectionId: SectionId,
    data: UpdateResultRangesForSectionRequest,
  ) => {
    return apiClient.put(
      `assessments/admin/sections/${sectionId}/result-ranges`,
      data,
    );
  },
  deleteSection: (sectionId: SectionId) => {
    return apiClient.delete(`assessments/admin/sections/${sectionId}`);
  },
  addQuestion: (sectionId: SectionId, data: CreateQuestionRequest) => {
    return apiClient.post(
      `/assessments/admin/sections/${sectionId}/questions`,
      data,
    );
  },
  updateQuestion: (
    sectionId: SectionId,
    questionId: QuestionId,
    data: UpdateQuestionTextRequest,
  ) => {
    return apiClient.put(
      `assessments/admin/sections/${sectionId}/questions/${questionId}`,
      data,
    );
  },
  deleteQuestion: (sectionId: SectionId, questionId: QuestionId) => {
    return apiClient.delete(
      `assessments/admin/sections/${sectionId}/questions/${questionId}`,
    );
  },
  listAllSubmissions: (params: GetAssessmentSubmissionsRequest) => {
    return apiClient.get(`assessments/admin/submissions`, {
      params,
    });
  },
  getUserSubmission: (userId: UserId) => {
    return apiClient.get(`/assessments/admin/submissions/${userId}`);
  },
  getActiveForm: () => {
    return apiClient.get("assessments/form");
  },
  getSection: (sectionId: SectionId) => {
    return apiClient.get(`assessments/form/sections/${sectionId}`);
  },
  getAssesmentProgress: () => {
    return apiClient.get("assessments/progress");
  },
  submitSection: (
    sectionId: SectionId,
    data: SubmitAssessmentSectionRequest,
  ) => {
    return apiClient.post(`assessments/sections/${sectionId}/submit`, data);
  },
  finalizeSubmission: (data: SubmitAssessmentRequest) => {
    return apiClient.post("/assessments/finalize", data);
  },
  submitForm: (data: SubmitAssessmentFormRequest) => {
    return apiClient.post("/assessments/submit", data);
  },
  getAssesmentsResult: () => {
    return apiClient.get("/assessments/result");
  },
};
