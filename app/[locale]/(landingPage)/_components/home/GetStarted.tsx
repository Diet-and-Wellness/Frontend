"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const GetStarted = () => {
  const t = useTranslations("getStarted");
  const isArabic = useLocale() === "ar";

  const steps = [
    {
      title: t("steps.fillAssessmentForm.title"),
      desc: t("steps.fillAssessmentForm.desc"),
    },
    {
      title: t("steps.getPersonalizedPlan.title"),
      desc: t("steps.getPersonalizedPlan.desc"),
    },
    {
      title: t("steps.followAndStayConsistent.title"),
      desc: t("steps.followAndStayConsistent.desc"),
    },
  ];

  return (
    <section className="">
      <div
        className="
        landing-get-started relative isolate mx-auto max-w-[90%]
        mb-12 md:mb-20
        flex flex-col-reverse md:flex-row 
        bg-[#E99532]
        rounded-3xl md:rounded-4xl overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="self-center md:self-end max-w-55 sm:max-w-70 lg:max-w-100 xl:max-w-120"
        >
          <Image
            src={"/images/man.webp"}
            alt="man img"
            width={4000}
            height={715}
            className="w-full"
          />
        </motion.div>

        <div className="flex flex-col-reverse md:flex-row">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden self-center md:mb-25 md:block md:max-w-40 md:self-end"
          >
            <Image
              src={"/icons/decorative-arrow.svg"}
              alt="arrow"
              width={10}
              height={10}
              className={`w-full scale-x-[-1] rotate-90 md:scale-y-[1] ${
                isArabic ? "md:rotate-0" : "md:-rotate-90"
              }`}
            />
          </motion.div>

          <div className="flex flex-col items-start justify-between gap-5 px-6 pb-0 pt-8 sm:px-7.5 md:py-12">
            <h3 className="max-w-120 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[48px]">
              {t("theOnlyThingYouWillLoseIsWeight")}
            </h3>

            <p className="type-body-lg font-semibold text-white">
              {t("howToGetStarted")}
            </p>

            <ul className="max-w-full lg:max-w-xl flex flex-col gap-5">
              {steps.map((step, index) => (
                <Step key={index} title={step.title} desc={step.desc} />
              ))}
            </ul>

            <Link
              href="/signin"
              className="block w-full py-3 bg-white mt-5 xl:mt-7.5 rounded-full text-center"
            >
              <span className="type-control font-bold text-[#E99532]">
                {t("getStart")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Step = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <li>
      <h4 className="type-card-title font-semibold text-black/60">
        {title}
      </h4>
      <p className="type-body font-medium text-white">
        {desc}
      </p>
    </li>
  );
};

export default GetStarted;
