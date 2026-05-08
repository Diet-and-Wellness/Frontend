"use client";

import { motion } from "framer-motion";

import PricePlan from "@/app/components/Pricing/PricePlan";

const pricingPlans = [
  {
    packageType: "Basic Package",
    isMostPopular: false,
    duration: 1,
    price: 450,
    benefits: [
      "A diet plan suitable for your goal",
      "Recipes that help you feel full and control hunger",
      "Weekly follow-up to review your progress",
      "WhatsApp support twice a week",
    ],
    days: ["Sunday", "Wednesday"],
    responseTime: 1,
    planNote:
      "This package is suitable if you need guidance and organization, but the main execution will be on you.",
  },
  {
    packageType: "Standard Package",
    isMostPopular: true,
    duration: 1,
    price: 850,
    benefits: [
      "Personalized diet plan",
      "Practical recipe booklet to make adherence easier",
      "Cardio exercises suitable for your level",
      "Organized follow-up to minimize confusion",
      "Continuous adjustments based on your body’s response",
      "WhatsApp support 4 times a week",
    ],
    days: ["Sunday", "Monday", "Wednesday"],
    responseTime: 2,
    planNote:
      "Most of our clients choose this package because it gives enough support to help you continue without feeling alone.",
  },
  {
    packageType: "Premium Package",
    isMostPopular: false,
    duration: 1,
    price: 1350,
    benefits: [
      "All features of the Standard package",
      "Closer follow-up and faster adjustments",
      "Daily WhatsApp support",
    ],
    days: ["Every day of the week"],
    responseTime: 8,
    planNote:
      "If you like having daily support during the execution and want closer guidance.",
  },
];

const PricingPage = () => {
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
          <span>Transparent and</span> <br />
          <span className="text-[#4D8E32]">Affordable Pricing</span>
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
          Flexible plans designed around you and your goals, your lifestyle, and
          your journey to healthier living
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
