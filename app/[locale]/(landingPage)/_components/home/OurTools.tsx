"use client";

import { motion } from "framer-motion";
import Tool from "./Tool";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMe } from "@/app/[locale]/hooks/useMe";
import BmiCalculatorIcon from "@/app/[locale]/components/icons/BmiCalculatorIcon";
import HealthyWeightIcon from "@/app/[locale]/components/icons/HealthyWeightIcon";
import CalorieCalculatorIcon from "@/app/[locale]/components/icons/CalorieCalculatorIcon";
import NutritionAnalysisIcon from "@/app/[locale]/components/icons/NutritionAnalysisIcon";
import { ViewFeedbackCta } from "./ViewFeedbackCta";

const OurTools = () => {
  const t = useTranslations();
  const router = useRouter();
  const { data: me } = useMe();

  const tryBmiCalc = () => {
    router.push("/nutrition-calculators/bmi");
  };

  const tryPerfectWeightCalc = () => {
    router.push("/nutrition-calculators/healthy-weight");
  };

  const tryCalCal = () => {
    router.push("/nutrition-calculators/daily-calories");
  };

  const getFullAnalysis = async () => {
    if (!me) {
      router.push("/signin");
      return;
    }

    if (me.role !== "customer") {
      return;
    }

    router.push("/nutrition-analysis/");
    return;
  };

  const tryFullAssessment = () => {
    void getFullAnalysis();
  };

  const toolsList = [
    {
      isFree: true,
      ToolIcon: BmiCalculatorIcon,
      toolName: t("tools.bmiCalculator.name"),
      toolDesc: t("tools.bmiCalculator.description"),
      cta: t("tools.bmiCalculator.cta"),
      onTry: tryBmiCalc,
    },
    {
      isFree: true,
      ToolIcon: HealthyWeightIcon,
      toolName: t("tools.perfectWeightCalculator.name"),
      toolDesc: t("tools.perfectWeightCalculator.description"),
      cta: t("tools.perfectWeightCalculator.cta"),
      onTry: tryPerfectWeightCalc,
    },
    {
      isFree: true,
      ToolIcon: CalorieCalculatorIcon,
      toolName: t("tools.calorieCalculator.name"),
      toolDesc: t("tools.calorieCalculator.description"),
      cta: t("tools.calorieCalculator.cta"),
      onTry: tryCalCal,
    },
    {
      isFree: false,
      ToolIcon: NutritionAnalysisIcon,
      toolName: t("tools.nutritionAnalysis.name"),
      toolDesc: t("tools.nutritionAnalysis.description"),
      cta: t("tools.nutritionAnalysis.cta"),
      onTry: tryFullAssessment,
    },
  ];

  return (
    <motion.section
      id="our-tools-container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="landing-our-tools
      py-10 md:py-25
      flex flex-col justify-center items-center
      bg-no-repeat
      ltr:md:bg-right rtl:md:bg-left md:bg-bottom
      bg-contain
      lg:bg-contain
      md:bg-size-[100%_auto]
      bg-none md:bg-[url('/images/dietBgImg.webp')]"
    >
      <div className="md:hidden w-[90%] mx-auto mb-15">
        <ViewFeedbackCta />
      </div>

      <div
        id="our-tools"
        className="w-[90%] mx-auto flex flex-col gap-7.5 md:gap-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="max-w-xl flex flex-col gap-4 md:gap-5"
        >
          <p className="type-display font-bold text-accent">
            {t("tools.empoweringYouOnTheJourneyOnWellness")}
          </p>

          <p className="type-body-lg max-w-sm text-content-muted sm:max-w-xl">
            {t("tools.startWithOurFreeCalculators")}
          </p>
        </motion.div>

        {/* Tools */}
        <div className="flex flex-col gap-6 md:gap-8">
          <p className="type-section-title font-bold text-accent">
            {t("tools.exploreOurNutritionCalculators")}
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
                ToolIcon={tool.ToolIcon}
                toolName={tool.toolName}
                toolDesc={tool.toolDesc}
                cta={tool.cta}
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
