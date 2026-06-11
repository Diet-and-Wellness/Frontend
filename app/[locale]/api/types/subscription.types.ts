export type Currency = "EGP";

export type PlanType = "subscription_plan";

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

export interface SubscriptionId {
  id: string;
}

export interface GetMySubscriptionHistoryRequest {
  limit?: number;
}

export interface UserSubscriptionId {
  userSubscriptionId: string;
}
