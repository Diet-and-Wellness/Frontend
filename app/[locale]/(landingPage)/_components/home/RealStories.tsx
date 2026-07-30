"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import RealStoriesWave from "@/app/[locale]/components/illustrations/RealStoriesWave";
import { PointerIcon } from "@/app/[locale]/components/icons/PointerIcon";

const RealStories = () => {
  const t = useTranslations();
  const isArabic = useLocale() === "ar";

  return (
    <section className="my-5 lg:my-20">
      <div className="gap-10 md:gap-15 lg:gap-25 max-w-[90%] mx-auto flex flex-col">
        {/* Header */}
        <div className="relative flex flex-col lg:flex-row justify-between gap-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-3xl flex flex-col gap-2 md:gap-5"
          >
            <h4 className="type-display font-semibold">
              {t("stories.realResultsRealStories")}
            </h4>
            <p className="type-body-lg max-w-[85%] font-light ms:max-w-2xl">
              {t("stories.hearFromRealClients")}
            </p>
          </motion.div>

          {/* Quote Image */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-e-0 top-0 pointer-events-none"
          >
            <Image
              src="/icons/qouteTop.svg"
              alt="qoute"
              width={315}
              height={200}
              className="real-stories-quote-art w-50 md:w-60 lg:w-75 h-auto"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div
          className="
          real-stories-panel relative isolate
          w-full
          bg-(--color-palette-c8dcbf)
          rounded-3xl md:rounded-[60px]
          px-8 pt-12 pb-3 md:p-12
          flex flex-col-reverse md:flex-row
          justify-between
          items-center md:items-start
          gap-8 md:gap-10
        "
        >
          <RealStoriesWave className="real-stories-wave pointer-events-none absolute inset-0 z-0 hidden size-full text-surface md:block" />

          {/* Text Side */}
          <div className="real-stories-content flex flex-col items-start max-w-xl">
            <div className="flex flex-col gap-5 md:gap-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src="/icons/qouteTop.svg"
                  alt="qoute"
                  width={105}
                  height={65}
                  className="rotate-180 w-20 md:w-30 h-auto"
                />
              </motion.div>
              <p className="flex flex-col gap-5 text-base font-medium text-content-muted sm:gap-7 sm:text-lg md:text-xl lg:text-[22px]">
                <span>{t("stories.realStoriesFromPeople")}</span>
                <span>{t("stories.beOneOfThemBookYourSession")}</span>
              </p>
            </div>

            {/* CTA */}
            <div className="w-full flex flex-col md:flex-row items-center gap-5 md:gap-7 lg:gap-10 mt-7">
              <button
                className="
                w-full
                px-7 md:px-12 
                py-4
                rounded-full 
                text-white
                cursor-pointer 
                type-control
                font-semibold 
                bg-brand
                hover:bg-brand-hover
                transition-colors duration-300
                whitespace-nowrap
              "
              >
                {t("stories.bookWithASpecialist")}
              </button>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <PointerIcon
                  className={`text-surface w-0 md:w-32 lg:w-44 h-auto rotate-45 md:rotate-0 ${
                    isArabic ? "md:scale-x-[-1]" : ""
                  }`}
                />
              </motion.div>
            </div>
          </div>

          {/* Image Side */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            whileHover={{ y: -10 }} // subtle parallax feel
          >
            <Image
              src="/images/ScreenShot.webp"
              alt="Screenshot"
              width={260}
              height={500}
              className="min-w-50 w-65 lg:w-70 h-auto mx-0 md:mx-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RealStories;
