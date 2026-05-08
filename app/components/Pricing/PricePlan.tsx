"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type planProp = {
  packageType: string;
  isMostPopular: boolean;
  duration: number;
  price: number;
  benefits: string[];
  days: string[];
  responseTime: number;
  planNote: string;
};

type pricingPlanProps = {
  plan: planProp;
};

const PricePlan = ({ plan }: pricingPlanProps) => {
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
        rounded-3xl bg-[#E99532]
        ${plan.isMostPopular ? "p-1 shadow-xl" : ""}
      `}
    >
      {plan.isMostPopular && (
        <p className="py-2 text-center text-xs sm:text-sm font-medium tracking-wide text-white">
          MOST POPULAR PLAN
        </p>
      )}

      <div
        className={`
          flex flex-col gap-4 sm:gap-5
          rounded-3xl bg-white
          p-5 sm:p-6
          ${!plan.isMostPopular ? "shadow-xl" : ""}
        `}
      >
        {/* Header */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-black">
            {plan.packageType}
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-[#4F4F4F]">
            Subscription duration: {plan.duration} month
          </p>
        </div>

        {/* Price */}
        <p className="flex items-end gap-2">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-black">
            {plan.price}
          </span>
          <span className="pb-1 text-sm sm:text-base font-medium text-[#4F4F4F]">
            EGP / month
          </span>
        </p>

        {/* Benefits */}
        <BenefitsList
          benefitList={plan.benefits}
          days={plan.days}
          respTime={plan.responseTime}
        />

        {/* Note */}
        <p className="text-xs sm:text-sm leading-5 sm:leading-6 font-light text-[#4F4F4F]">
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
              plan.isMostPopular
                ? "bg-[#E99532] hover:bg-[#d88524]"
                : "bg-[#4D8E32] hover:bg-[#387b1b]"
            }
          `}
        >
          Get Started
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

const BenefitsList = ({ benefitList, days, respTime }: BenefitsListProps) => {
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
      <p className="text-sm sm:text-base leading-5 sm:leading-6 text-black">
        {children}
      </p>
    </li>
  );

  return (
    <ul className="flex flex-col  gap-3">
      {benefitList.map((benefit) => (
        <ListItem key={benefit} icon="/icons/Badge.svg">
          {benefit}
        </ListItem>
      ))}

      <ListItem icon="/icons/date.svg">
        <span className="font-medium">Days: </span>
        {days.join(" — ")}
      </ListItem>

      <ListItem icon="/icons/clock.svg">
        <span className="font-medium">Response time per day: </span>
        {respTime} hours
      </ListItem>
    </ul>
  );
};

export default PricePlan;
