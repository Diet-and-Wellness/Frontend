"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SubscriptionPlanResponse } from "@/app/[locale]/api/types/subscription.types";
import { Badge } from "@/app/[locale]/components/icons/BadgeIcon";
import { Date } from "@/app/[locale]/components/icons/DateIcon";
import { Calender } from "@/app/[locale]/components/icons/CalenderIcon";
import { subscriptionApi } from "@/app/[locale]/api/endpoints/subscription.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";

type PricePlanProps = {
  plan: SubscriptionPlanResponse;
};

const PricePlan = ({ plan }: PricePlanProps) => {
  const t = useTranslations();

  const [preparing, setPreparing] = useState(false);

  const router = useRouter();

  const purchaseHandler = async () => {
    try {
      setPreparing(true);
      const { data } = await subscriptionApi.purchaseSubscription(plan.id);
      const responseData = await data.data;
      if (!!responseData.checkoutUrl) {
        router.replace(responseData.checkoutUrl);
      }
    } catch {
    } finally {
      setPreparing(false);
    }
  };

  const isOneTimePlan = plan.type === "one_time_offer";

  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className={`
        w-full max-w-sm
        rounded-3xl bg-accent
        ${plan.mostPopular ? "p-1 shadow-xl" : ""}
      `}
    >
      {plan.mostPopular && (
        <p className="py-2 text-center text-xs sm:text-sm font-medium tracking-wide text-white">
          {t("pricing.mostPopularPlan")}
        </p>
      )}

      <div
        className={`
          flex flex-col gap-4 sm:gap-5
          rounded-3xl bg-surface-raised
          p-5 sm:p-6
          ${!plan.mostPopular ? "shadow-xl" : ""}
        `}
      >
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-content">
            {plan.displayName}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-content-muted">
            {t("pricing.subscriptionDuration")}{" "}
            {isOneTimePlan
              ? t("pricing.forever")
              : `${plan.durationInDays} ${t("pricing.day")}`}
          </p>
        </div>

        <p className="flex items-end gap-2">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-content">
            {plan.price}
          </span>
          <span className="pb-1 text-sm sm:text-base font-medium text-content-muted">
            {plan.currency === "EGP" ? t("pricing.egp") : plan.currency}
            {!isOneTimePlan && ` / ${t("pricing.month")}`}
          </span>
        </p>

        <BenefitsList
          isOneTimePlan={isOneTimePlan}
          benefitList={plan.features}
          days={plan.activeDays}
          respTime={plan.responseTimeInHours}
        />

        <p className="text-xs sm:text-sm leading-5 sm:leading-6 font-light text-content-muted">
          {plan.planNote}
        </p>

        <button
          disabled={preparing}
          onClick={purchaseHandler}
          className={`
            mt-2 sm:mt-3
            rounded-full
            px-4 h-11 md:h-12
            text-sm sm:text-base
            font-medium text-white
            cursor-pointer
            transition-all duration-300
            active:scale-98
            flex justify-center items-center
            ${
              plan.mostPopular
                ? "bg-accent hover:bg-accent-hover"
                : "bg-brand hover:bg-brand-hover"
            }
          `}
        >
          {preparing ? <Spinner spinnerSize={26} /> : t("getStarted.getStart")}
        </button>
      </div>
    </motion.li>
  );
};

type BenefitsListProps = {
  benefitList: string[];
  days: string[];
  respTime: number;
  isOneTimePlan: boolean;
};

const ListItem = ({
  icon,
  children,
}: {
  icon: React.ReactElement;
  children: React.ReactNode;
}) => (
  <li className="flex items-start gap-2 sm:gap-3">
    {icon}
    <p className="text-sm sm:text-base leading-5 sm:leading-6 text-content">
      {children}
    </p>
  </li>
);

const BenefitsList = ({
  isOneTimePlan,
  benefitList,
  days,
  respTime,
}: BenefitsListProps) => {
  const t = useTranslations("pricing");
  const localizedDays = days?.map((day) => t(`days.${day}`));

  return (
    <ul className="flex flex-col  gap-3">
      {benefitList?.map((benefit) => (
        <ListItem
          key={benefit}
          icon={<Badge className="text-brand min-w-5 sm:min-w-6 h-auto" />}
        >
          {benefit}
        </ListItem>
      ))}

      {isOneTimePlan || (
        <ListItem
          icon={<Date className="text-brand min-w-5 sm:min-w-6 h-auto" />}
        >
          <span className="font-medium">{t("daysWord")}</span>{" "}
          {localizedDays?.join(" — ")}
        </ListItem>
      )}

      {isOneTimePlan || (
        <ListItem
          icon={<Calender className="text-brand min-w-5 sm:min-w-6 h-auto" />}
        >
          <span className="font-medium">{t("responseTimePerDay")}</span>
          {respTime} {t("hours")}
        </ListItem>
      )}
    </ul>
  );
};

export default PricePlan;
