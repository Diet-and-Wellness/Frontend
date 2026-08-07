"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "./ImageComparison";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Hero = () => {
  const t = useTranslations();

  const locale = useLocale();

  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-surface md:pt-15 xl:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full overflow-hidden aspect-780/1504 md:aspect-15.5/10"
      >
        <div className="h-full md:hidden">
          <ImageComparison className="h-full w-full" enableHover>
            <ImageComparisonImage
              src={
                locale === "en"
                  ? "/images/fit-small.webp"
                  : "/images/fit-small_ar.webp"
              }
              alt="After"
              position="left"
            />
            <ImageComparisonImage
              src={
                locale === "en"
                  ? "/images/fat-small.webp"
                  : "/images/fat-small_ar.webp"
              }
              alt="Before"
              position="right"
            />
            <ImageComparisonSlider className="w-0.5 bg-surface-raised/30 backdrop-blur-xs" />
          </ImageComparison>
        </div>
        <div className="hidden h-full md:block">
          <ImageComparison className="h-full w-full" enableHover>
            <ImageComparisonImage
              src={locale === "en" ? "/images/fit.webp" : "/images/fit_ar.webp"}
              alt="After"
              position="left"
            />
            <ImageComparisonImage
              src={locale === "en" ? "/images/fat.webp" : "/images/fat_ar.webp"}
              alt="Before"
              position="right"
            />
            <ImageComparisonSlider className="w-0.5 bg-surface-raised/30 backdrop-blur-xs" />
          </ImageComparison>
        </div>
      </motion.div>

      <div className="pointer-events-none mx-auto mt-8 flex w-[90%] flex-col items-stretch justify-between gap-8 sm:gap-10 md:flex-row md:items-center xl:absolute xl:inset-x-0 xl:bottom-20 xl:mt-0">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex w-full flex-col gap-3 md:w-fit"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent">
            1k+
          </p>

          <p className="type-body-lg font-bold tracking-wider text-(--color-palette-b2b2b2)">
            {t("hero.clientsTrustUs")}
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="type-control pointer-events-auto rounded-full border-2 border-accent px-10 py-2 font-bold text-accent transition-all duration-300 hover:bg-accent hover:text-accent-contrast cursor-pointer"
          >
            {t("hero.viewFeedback")}
          </motion.button>
        </motion.div>

        {/* Right card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
          className="flex w-full flex-col gap-5 rounded-3xl bg-(--color-palette-f8debf) p-5 md:max-w-75"
        >
          <Image
            src="/images/cardHeader.webp"
            alt="Card Header"
            width={233}
            height={88}
            className="rounded-xl w-full"
          />

          <p className="type-label font-medium">
            {t("hero.getToKnowMoreAboutYourBody")}
          </p>

          <motion.button
            onClick={() => router.push("/blogs")}
            whileTap={{ scale: 0.95 }}
            className="type-control pointer-events-auto rounded-full bg-accent px-10 py-2 font-bold text-white transition-all duration-300 hover:bg-accent-hover cursor-pointer"
          >
            {t("hero.viewBlogs")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
