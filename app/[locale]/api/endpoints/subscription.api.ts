import apiClient from "../index";

import type {
  GetMySubscriptionHistoryRequest,
  SubscriptionId,
  UserSubscriptionId,
  SubscriptionPlanRequest,
} from "../types/subscription.types";

export const subscriptionApi = {
  getSubscriptions: () => {
    return apiClient.get("subscriptions/admin?includeInactive=true");
  },
  createSubscription: (data: SubscriptionPlanRequest) => {
    return apiClient.post("/subscriptions/admin", data);
  },
  createSubscriptionCopy: (
    subscriptionId: SubscriptionId,
    data: SubscriptionPlanRequest,
  ) => {
    return apiClient.put(`subscriptions/admin/${subscriptionId}`, data);
  },
  deactivateSubscription: (subscriptionId: SubscriptionId) => {
    return apiClient.delete(`subscriptions/admin/${subscriptionId}`);
  },
  getAllSubscriptions: () => {
    return apiClient.get("/subscriptions");
  },
  getMySubscriptionStatus: () => {
    return apiClient.get("subscriptions/me/status");
  },
  getMySubscriptionHistory: (params: GetMySubscriptionHistoryRequest) => {
    return apiClient.get("/subscriptions/me/history", {
      params,
    });
  },
  checkSubscription: () => {
    return apiClient.get("subscriptions/me/verify");
  },
  purchaseSubscription: (subscriptionId: SubscriptionId) => {
    return apiClient.post(`/subscriptions/${subscriptionId}/purchase`);
  },
  getMyPurchaseStatus: (subscriptionId: SubscriptionId) => {
    return apiClient.post(`subscriptions/payment/status/${subscriptionId}`);
  },
  renewSubscription: (data: UserSubscriptionId) => {
    return apiClient.post("/subscriptions/renew", data);
  },
  CancelSubscription: () => {
    return apiClient.post("/subscriptions/cancel");
  },
};
