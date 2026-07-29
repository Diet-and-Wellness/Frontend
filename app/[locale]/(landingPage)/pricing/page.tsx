"use client";

import { motion } from "framer-motion";

import PricePlan from "./_components/PricePlan";
import { useTranslations } from "next-intl";
import { SubscriptionPlanResponse } from "../../api/types/subscription.types";
import { PricingPlansSkeleton } from "../../components/Public/Skeletons";
import { useSubscriptionPlans } from "../../hooks/useSubscriptionPlans";

const PricingPage = () => {
  const t = useTranslations("pricing");

  const { data: pricingPlans, isLoading } = useSubscriptionPlans();

  return (
    <section
      className="
      min-h-screen
      bg-[url('/icons/snake-shape.svg')] bg-no-repeat bg-center bg-cover
      px-5 pt-25 pb-20 lg:pt-30 lg:pb-30
      flex flex-col items-center gap-15
    "
    >
      {/* Header */}
      <div className="max-w-xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="
          text-3xl font-extrabold leading-snug
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
        "
        >
          <span>{t("transparentAnd")}</span> <br />
          <span className="text-[#4D8E32]">{t("affordablePricing")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="
          px-8 mt-5 text-base
          sm:text-lg
          md:text-xl
          text-gray-700
        "
        >
          {t("pricingDescription")}
        </motion.p>
      </div>

      {/* Cards */}
      {isLoading ? (
        <PricingPlansSkeleton />
      ) : (
        <ul
          className="
            w-full max-w-7xl
            flex flex-wrap justify-center gap-6 items-center
          "
        >
          {pricingPlans?.map((plan: SubscriptionPlanResponse) => (
            <PricePlan key={plan.id} plan={plan} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PricingPage;
