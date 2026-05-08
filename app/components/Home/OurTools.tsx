"use client";

import { motion } from "framer-motion";
import Tool from "./Tool";

const toolsList = [
  {
    isFree: true,
    toolIconSrc: "/icons/bmi.svg",
    toolName: "Body Mass Index (BMI) Calculator",
    toolDesc:
      "Calculate your body mass according to important factors, such as height and weight.",
    href: "/",
  },
  {
    isFree: true,
    toolIconSrc: "/icons/weightCalc.svg",
    toolName: "Perfect Weight Calculator",
    toolDesc:
      "Calculate your body mass according to important factors, such as height and weight.",
    href: "/",
  },
  {
    isFree: true,
    toolIconSrc: "/icons/CalCalc.svg",
    toolName: "Calorie Calculate",
    toolDesc:
      "Calculate your body mass according to important factors, such as height and weight.",
    href: "/",
  },
  {
    isFree: false,
    toolIconSrc: "/icons/NutritionAnalysis.svg",
    toolName: "Nutrition Analysis",
    toolDesc:
      "Calculate your body mass according to important factors, such as height and weight.",
    href: "/",
  },
];

const OurTools = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="
      py-10 md:py-25
      flex justify-center items-center
      bg-no-repeat
      bg-right md:bg-bottom-right
      bg-contain
      lg:bg-contain
      md:bg-size-[100%]
      bg-none md:bg-[url('/images/dietBgImg.png')]"
    >
      <div className="w-[90%] mx-auto flex flex-col gap-7.5 md:gap-25">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="max-w-2xl flex flex-col gap-4 md:gap-6"
        >
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E99532] leading-tight">
            Empowering You On the Journey On Wellness
          </p>

          <p className="text-base sm:text-lg md:text-2xl text-[#4F4F4F] max-w-sm sm:max-w-xl">
            Start with our free calculators to get a baseline, or dive deep with
            our premium analysis.
          </p>
        </motion.div>

        {/* Tools */}
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="text-[#E99532] font-bold text-xl md:text-3xl lg:text-4xl">
            Try Our Tools
          </p>

          <ul
            className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-5 md:gap-7
          "
          >
            {toolsList.map((tool, index) => (
              <Tool
                key={index}
                isFree={tool.isFree}
                toolIconSrc={tool.toolIconSrc}
                toolName={tool.toolName}
                toolDesc={tool.toolDesc}
                href={tool.href}
              />
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default OurTools;
