"use client";

import { AnimatePresence, motion } from "framer-motion";
import Tool from "./Tool";
import { useTranslations } from "next-intl";
import BMI from "./free-tools/BMI";
import { useState } from "react";
import IBW from "./free-tools/IBW";
import CalCal from "./free-tools/CalCal";
import BeforeStartAssessment from "./free-tools/BeforeStartAssessment";

const OurTools = () => {
  const t = useTranslations();

  const [showBmiModal, setShowBmiModal] = useState(false);
  const [showIbwModal, setShowIbwModal] = useState(false);
  const [showCalCalModal, setShowCalCalModal] = useState(false);
  const [showBeforeStartAssessmentModal, setShowBeforeStartAssessmentModal] =
    useState(false);

  const tryBmiCalc = () => {
    setShowBmiModal(true);
  };

  const closeBmiModal = () => {
    setShowBmiModal(false);
  };

  const tryPerfectWeightCalc = () => {
    setShowIbwModal(true);
  };

  const closeIbwModal = () => {
    setShowIbwModal(false);
  };

  const tryCalCal = () => {
    setShowCalCalModal(true);
  };

  const closeCalCalModal = () => {
    setShowCalCalModal(false);
  };

  const tryFullAssessment = () => {
    setShowBeforeStartAssessmentModal(true);
  };

  const closeBeforeAssessmentModal = () => {
    setShowBeforeStartAssessmentModal(false);
  };

  const getFullAnalysis = () => {
    setShowBmiModal(false);
    setShowIbwModal(false);
    setShowCalCalModal(false);
    setShowBeforeStartAssessmentModal(true);
  };

  const toolsList = [
    {
      isFree: true,
      toolIconSrc: "/icons/bmi.svg",
      toolName: t("tools.bmiCalculator.name"),
      toolDesc: t("tools.bmiCalculator.description"),
      href: "/",
      onTry: tryBmiCalc,
    },
    {
      isFree: true,
      toolIconSrc: "/icons/weightCalc.svg",
      toolName: t("tools.perfectWeightCalculator.name"),
      toolDesc: t("tools.perfectWeightCalculator.description"),
      href: "/",
      onTry: tryPerfectWeightCalc,
    },
    {
      isFree: true,
      toolIconSrc: "/icons/CalCalc.svg",
      toolName: t("tools.calorieCalculator.name"),
      toolDesc: t("tools.calorieCalculator.description"),
      href: "/",
      onTry: tryCalCal,
    },
    {
      isFree: false,
      toolIconSrc: "/icons/NutritionAnalysis.svg",
      toolName: t("tools.nutritionAnalysis.name"),
      toolDesc: t("tools.nutritionAnalysis.description"),
      href: "/",
      onTry: tryFullAssessment,
    },
  ];

  return (
    <motion.section
      id="our-tools"
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
      bg-none md:bg-[url('/images/dietBgImg.webp')]"
    >
      <div className="w-[90%] mx-auto flex flex-col gap-7.5 md:gap-25">
        <AnimatePresence mode="wait">
          {showBmiModal && (
            <BMI onClose={closeBmiModal} onGetFullAnalysis={getFullAnalysis} />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showIbwModal && (
            <IBW onClose={closeIbwModal} onGetFullAnalysis={getFullAnalysis} />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showCalCalModal && (
            <CalCal
              onClose={closeCalCalModal}
              onGetFullAnalysis={getFullAnalysis}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showBeforeStartAssessmentModal && (
            <BeforeStartAssessment onClose={closeBeforeAssessmentModal} />
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="max-w-2xl flex flex-col gap-4 md:gap-6"
        >
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E99532] leading-tight">
            {t("tools.empoweringYouOnTheJourneyOnWellness")}
          </p>

          <p className="text-base sm:text-lg md:text-2xl text-[#4F4F4F] max-w-sm sm:max-w-xl">
            {t("tools.startWithOurFreeCalculators")}
          </p>
        </motion.div>

        {/* Tools */}
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="text-[#E99532] font-bold text-xl md:text-3xl lg:text-4xl">
            {t("tools.tryOurTools")}
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
                onTry={tool.onTry}
              />
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};

export default OurTools;
