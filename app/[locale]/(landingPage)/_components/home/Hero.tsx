"use client";
import { useLocale } from "next-intl";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "./ImageComparison";
import { motion } from "framer-motion";
import { ViewBlogsCta } from "./ViewBlogsCta";
import { ViewFeedbackCta } from "./ViewFeedbackCta";
import { MobileHeroCta } from "./MobileHeroCta";

const Hero = () => {
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden bg-surface pt-20 max-h-260">
      <div className="w-[50%] h-full bg-accent-soft/40 absolute blur-2xl left-0"></div>
      <div className="w-[50%] h-full bg-brand-soft/40 absolute blur-2xl right-0"></div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full overflow-hidden aspect-1/1.5 md:aspect-13/10"
      >
        <div className="h-full md:hidden relative">
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

      <MobileHeroCta />

      <div
        className="
        pointer-events-none
        absolute bottom-5 left-1/2
        hidden w-[90%] -translate-x-1/2
        flex-col items-stretch justify-between gap-8
        sm:gap-10
        md:flex md:flex-row md:items-center
        xl:bottom-10
       "
      >
        <ViewFeedbackCta />
        <ViewBlogsCta />
      </div>
    </section>
  );
};

export default Hero;
