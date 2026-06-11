import apiClient from "../index";
import type {
  Feedback,
  FeedbackId,
  FeedbackStatus,
  GetAllFeedbacksRequest,
  GetFeedbackByIdRequest,
  ReorderFeedbackRequest,
} from "../types/feedback.types";

export const feedbackApi = {
  getAllActiveFeedbacks: (params: GetAllFeedbacksRequest) => {
    return apiClient.get("/feedbacks", {
      params,
    });
  },
  createFeedback: (data: Feedback) => {
    return apiClient.post("feedbacks/", data);
  },
  getAllFeedbacks: (params: GetAllFeedbacksRequest) => {
    return apiClient.get("/feedbacks/admin", {
      params,
    });
  },
  getFeedbackById: (feedbackId: FeedbackId, data: GetFeedbackByIdRequest) => {
    return apiClient.get(`feedbacks/admin/${feedbackId}`, {
      params: data,
    });
  },
  updateFeedback: (feedbackId: FeedbackId, data: Feedback) => {
    return apiClient.put(`feedbacks/admin/${feedbackId}`, data);
  },
  deleteFeedback: (feedbackId: FeedbackId) => {
    return apiClient.delete(`feedbacks/admin/${feedbackId}`);
  },
  updateFeedbackStatus: (feedbackId: FeedbackId, data: FeedbackStatus) => {
    return apiClient.patch(`feedbacks/admin/${feedbackId}/status`, data);
  },
  reorderFeedback: (data: ReorderFeedbackRequest) => {
    return apiClient.patch("/feedbacks/admin/reorder", data);
  },
  
};
