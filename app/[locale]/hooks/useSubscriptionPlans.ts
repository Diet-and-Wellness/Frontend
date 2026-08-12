import { useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "../api/endpoints/subscription.api";
import type { SubscriptionPlanResponse } from "../api/types/subscription.types";

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["pricingPlans"],
    queryFn: getAllPricingPlan,
  });
};

export const useAdminSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["admin-subscription-plans"],
    queryFn: getAllAdminSubscriptionPlans,
    staleTime: 5 * 60 * 1000,
  });
};

const getAllPricingPlan = async () => {
  const { data } =
    await subscriptionApi.getSubscriptionsOfType("subscription_plan");
  return data?.data ?? [];
};

const getAllAdminSubscriptionPlans = async (): Promise<
  SubscriptionPlanResponse[]
> => {
  const { data } = await subscriptionApi.getSubscriptions();
  const plans: SubscriptionPlanResponse[] = Array.isArray(data?.data)
    ? data.data
    : [];

  return plans.filter((plan) => plan.type === "subscription_plan");
};
