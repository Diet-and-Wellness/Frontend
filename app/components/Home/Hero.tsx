"use client";

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/motion-primitives/image-comparison";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="relative mx-auto aspect-15.5/10 overflow-hidden max-w-full mt-15"
    >
      <ImageComparison className="aspect-13/10 w-full" enableHover>
        <ImageComparisonImage
          src="/images/fit.png"
          alt="After"
          position="left"
        />
        <ImageComparisonImage
          src="/images/fat.png"
          alt="Before"
          position="right"
        />
        <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs" />
      </ImageComparison>

      <div className="pointer-events-none hidden lg:flex flex-row justify-between items-center w-[90%] mx-auto absolute left-1/2 -translate-x-1/2 bottom-20">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col gap-3"
        >
          <p className="text-5xl font-extrabold text-[#E99532]">1k+</p>

          <p className="text-[#B2B2B2] text-2xl tracking-wider font-bold">
            Clients that trust us
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto px-10 py-2 border-2 border-[#E99532] rounded-full text-[#E99532] font-bold text-xl hover:bg-[#E99532] hover:text-white transition-all duration-300 cursor-pointer"
          >
            View Feedback
          </motion.button>
        </motion.div>

        {/* Right card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
          className="bg-[#F8DEBF] rounded-3xl p-5 max-w-75 flex flex-col gap-5 shadow-lg"
        >
          <Image
            src="/images/cardHeader.png"
            alt="Card Header"
            width={233}
            height={88}
            className="rounded-xl w-full"
          />

          <p className="text-[16px] font-medium">
            Get to know more about your body..
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto px-10 py-2 rounded-full text-white font-bold text-[16px] bg-[#E99532] hover:bg-[#c76a00] transition-all duration-300 cursor-pointer"
          >
            View Blogs
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
