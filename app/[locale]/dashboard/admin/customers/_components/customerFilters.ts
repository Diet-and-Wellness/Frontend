import type { Customer } from "@/app/[locale]/api/types/profile.types";

export type CustomerSubscriptionStatus = "" | "active" | "inactive";

export type CustomerFilterValues = {
  status: CustomerSubscriptionStatus;
  subscriptionPlan: string;
};

export const filterCustomers = (
  customers: Customer[],
  { status, subscriptionPlan }: CustomerFilterValues,
) =>
  customers.filter((customer) => {
    const subscription = customer.subscription;
    const matchesStatus =
      !status ||
      (status === "active" && subscription?.active === true) ||
      (status === "inactive" && subscription?.active == null);
    const matchesPlan =
      !subscriptionPlan || subscription?.name === subscriptionPlan;

    return matchesStatus && matchesPlan;
  });

export const paginateCustomers = (
  customers: Customer[],
  page: number,
  pageSize: number,
) => customers.slice((page - 1) * pageSize, page * pageSize);
