"use client";
import { useTranslations } from "next-intl";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/app/[locale]/components/Home/ImageComparison";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const Hero = () => {
  const t = useTranslations();

  const windowWidth = useWindowSize();

  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className={`mx-auto overflow-hidden max-w-full ${windowWidth <= 550 ? "aspect-5.5/10 mt-5" : "aspect-15.5/10 mt-15"}`}
      >
        {windowWidth <= 550 ? (
          <ImageComparison className="w-full h-full" enableHover>
            <ImageComparisonImage
              src="/images/fit-small.webp"
              alt="After"
              position="left"
            />
            <ImageComparisonImage
              src="/images/fat-small.webp"
              alt="Before"
              position="right"
            />
            <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs" />
          </ImageComparison>
        ) : (
          <ImageComparison className="aspect-13/10 w-full" enableHover>
            <ImageComparisonImage
              src="/images/fit.webp"
              alt="After"
              position="left"
            />
            <ImageComparisonImage
              src="/images/fat.webp"
              alt="Before"
              position="right"
            />
            <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs" />
          </ImageComparison>
        )}
      </motion.div>

      <div
        className={`pointer-events-none flex flex-col gap-10 md:flex-row justify-between items-center w-[90%] mx-auto ${windowWidth <= 1000 ? "mt-10" : "absolute place-self-center bottom-20"}`}
      >
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col gap-3 w-full md:w-fit"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#E99532]">
            1k+
          </p>

          <p className="text-[#B2B2B2] xl lg:text-2xl tracking-wider font-bold">
            {t("hero.clientsTrustUs")}
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto px-10 py-2 border-2 border-[#E99532] rounded-full text-[#E99532] font-bold text-lg lg:text-xl hover:bg-[#E99532] hover:text-white transition-all duration-300 cursor-pointer"
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
          className="bg-[#F8DEBF] rounded-3xl p-5 w-full md:max-w-75 flex flex-col gap-5 shadow-lg"
        >
          <Image
            src="/images/cardHeader.webp"
            alt="Card Header"
            width={233}
            height={88}
            className="rounded-xl w-full"
          />

          <p className="text-[14px] md:text-[16px] font-medium">
            {t("hero.getToKnowMoreAboutYourBody")}
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto px-10 py-2 rounded-full text-white font-bold text-[14px] md:text-[16px] bg-[#E99532] hover:bg-[#c76a00] transition-all duration-300 cursor-pointer"
          >
            {t("hero.viewBlogs")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
