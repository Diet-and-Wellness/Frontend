export type Currency = "EGP";

export type PlanType = "subscription_plan" | "one_time_offer";

export type ActiveDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface SubscriptionPlanResponse {
  id: string;
  name: string;
  displayName: string;
  durationInDays: number;
  price: number;
  currency: Currency;
  description: string;
  features: string[];
  isActive: boolean;
  mostPopular: boolean;
  type: PlanType;
  activeDays: ActiveDay[];
  responseTimeInHours: number;
  planNote: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlanRequest {
  name: string;
  displayName: string;
  durationInDays: number;
  price: number;
  currency: Currency;
  description: string;
  features: string[];
  isActive: boolean;
  mostPopular: boolean;
  type: PlanType;
  activeDays: ActiveDay[];
  responseTimeInHours: number;
  planNote: string;
}

export type SubscriptionId = string;

export interface GetMySubscriptionHistoryRequest {
  limit?: number;
}

export interface UserSubscriptionId {
  userSubscriptionId: string;
}

export type SubscriptionType = "subscription_plan" | "one_time_offer";
