export interface GetAllFeedbacksRequest {
  page?: number;
  limit?: number;
}

export interface Feedback {
  attachment: File | null;
  theme: string;
  crop: string;
  title?: string;
  content?: string;
  rating?: number;
}

export interface FeedbackUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface FeedbackResponse {
  id: string;
  title: string;
  content: string;
  rating: number;
  user: FeedbackUser;
  isHidden: boolean;
  attachmentUrl: string;
  order: number;
  theme: string;
  crop: string;
  createdAt: string;
  updatedAt: string;
}

export type FeedbackId = string;

export interface GetFeedbackByIdRequest {
  order: number;
}
export interface FeedbackStatus {
  isHidden: boolean;
}

export interface ReorderFeedbackRequest {
  updates: {
    id: string;
    order: string;
  }[];
}
