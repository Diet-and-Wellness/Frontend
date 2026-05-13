"use client";

import { motion } from "framer-motion";

import PricePlan from "../../components/Pricing/PricePlan";
import { useTranslations } from "next-intl";

const PricingPage = () => {
  const t = useTranslations("pricing");

  const pricingPlans = [
    {
      packageType: t("basicPackage.packageType"),
      isMostPopular: false,
      duration: 1,
      price: 450,
      benefits: t.raw("basicPackage.benefits"),
      days: [t("days.sunday"), t("days.wednesday")],
      responseTime: 1,
      planNote: t("basicPackage.planNote"),
    },
    {
      packageType: t("standardPackage.packageType"),
      isMostPopular: true,
      duration: 1,
      price: 850,
      benefits: t.raw("standardPackage.benefits"),
      days: [t("days.sunday"), t("days.monday"), t("days.wednesday")],
      responseTime: 2,
      planNote: t("standardPackage.planNote"),
    },
    {
      packageType: t("premiumPackage.packageType"),
      isMostPopular: false,
      duration: 1,
      price: 1350,
      benefits: t.raw("premiumPackage.benefits"),
      days: [t("days.everyDay")],
      responseTime: 8,
      planNote: t("premiumPackage.planNote"),
    },
  ];

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
          transition={{ duration: 0.7, ease: "easeInOut" }}
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
          transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
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
      <ul
        className="
        w-full max-w-7xl
        flex flex-wrap justify-center gap-6 items-center
      "
      >
        {pricingPlans.map((plan) => (
          <PricePlan key={plan.packageType} plan={plan} />
        ))}
      </ul>
    </section>
  );
};

export default PricingPage;
