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
    <section className="relative overflow-hidden bg-surface pt-20 max-h-200 md:max-h-265">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="relative w-full overflow-hidden aspect-1/1.5 md:aspect-13/10"
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

        <MobileHeroCta />
      </motion.div>

      <div className="pointer-events-none mx-auto mt-8 flex w-[90%] flex-col items-stretch justify-between gap-8 sm:gap-10 md:flex-row md:items-center xl:absolute xl:inset-x-0 xl:bottom-20 xl:mt-0">
        <ViewFeedbackCta />
        <div className="hidden md:block">
          <ViewBlogsCta />
        </div>
      </div>
    </section>
  );
};

export default Hero;
