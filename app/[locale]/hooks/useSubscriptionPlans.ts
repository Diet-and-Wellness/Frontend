import { useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "../api/endpoints/subscription.api";

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["pricingPlans"],
    queryFn: getAllPricingPlan,
  });
};

const getAllPricingPlan = async () => {
  const { data } =
    await subscriptionApi.getAllSubscriptions("subscription_plan");
  return data?.data ?? [];
};
