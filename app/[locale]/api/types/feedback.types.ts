export interface GetAllFeedbacksRequest {
  page?: number;
  limit?: number;
}

export interface Feedback {
  title: string;
  content: string;
  rating: number;
  attachment?: File;
  theme: string;
  crop: string;
}

export interface FeedbackId {
  id: string;
}

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
