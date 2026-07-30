"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SubscriptionPlanResponse } from "@/app/[locale]/api/types/subscription.types";

type PricePlanProps = {
  plan: SubscriptionPlanResponse;
};

const PricePlan = ({ plan }: PricePlanProps) => {
  const t = useTranslations();

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
        {/* Header */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-content">
            {plan.displayName}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-content-muted">
            {t("pricing.subscriptionDuration")} {plan.durationInDays}{" "}
            {t("pricing.day")}
          </p>
        </div>

        {/* Price */}
        <p className="flex items-end gap-2">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-content">
            {plan.price}
          </span>
          <span className="pb-1 text-sm sm:text-base font-medium text-content-muted">
            {plan.currency === "EGP" ? t("pricing.egp") : plan.currency}
            {" / "}
            {t("pricing.month")}
          </span>
        </p>

        {/* Benefits */}
        <BenefitsList
          benefitList={plan.features}
          days={plan.activeDays}
          respTime={plan.responseTimeInHours}
        />

        {/* Note */}
        <p className="text-xs sm:text-sm leading-5 sm:leading-6 font-light text-content-muted">
          {plan.planNote}
        </p>

        {/* CTA */}
        <button
          className={`
            mt-2 sm:mt-3
            rounded-full
            px-4 py-2.5 sm:py-3
            text-sm sm:text-base
            font-medium text-white
            cursor-pointer
            transition-all duration-300
            active:scale-98
            ${
              plan.mostPopular
                ? "bg-accent hover:bg-accent-hover"
                : "bg-brand hover:bg-brand-hover"
            }
          `}
        >
          {t("getStarted.getStart")}
        </button>
      </div>
    </motion.li>
  );
};

type BenefitsListProps = {
  benefitList: string[];
  days: string[];
  respTime: number;
};

const ListItem = ({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) => (
  <li className="flex items-start gap-2 sm:gap-3">
    <Image
      src={icon}
      alt=""
      width={18}
      height={18}
      className="min-w-5 sm:min-w-6"
    />
    <p className="text-sm sm:text-base leading-5 sm:leading-6 text-content">
      {children}
    </p>
  </li>
);

const BenefitsList = ({ benefitList, days, respTime }: BenefitsListProps) => {
  const t = useTranslations("pricing");
  const localizedDays = days?.map((day) => t(`days.${day}`));

  return (
    <ul className="flex flex-col  gap-3">
      {benefitList?.map((benefit) => (
        <ListItem key={benefit} icon="/icons/Badge.svg">
          {benefit}
        </ListItem>
      ))}

      <ListItem icon="/icons/date.svg">
        <span className="font-medium">{t("daysWord")}</span> {localizedDays?.join(" — ")}
      </ListItem>

      <ListItem icon="/icons/clock.svg">
        <span className="font-medium">{t("responseTimePerDay")}</span>
        {respTime} {t("hours")}
      </ListItem>
    </ul>
  );
};

export default PricePlan;
