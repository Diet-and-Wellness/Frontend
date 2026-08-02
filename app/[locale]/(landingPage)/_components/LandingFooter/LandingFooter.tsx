"use client";

import { useTranslations } from "next-intl";
import QuickLinks from "./footerComp/QuickLinks";
import Socials from "./footerComp/Socials";
import Subscribe from "./footerComp/Subscribe";
import { AnimatePresence } from "framer-motion";
import BMI from "../home/free-tools/BMI";
import IBW from "../home/free-tools/IBW";
import CalCal from "../home/free-tools/CalCal";
import BeforeStartAssessment from "../home/free-tools/BeforeStartAssessment";
import { useState } from "react";
import { assessmentApi } from "@/app/[locale]/api/endpoints/assessment.api";
import { useRouter } from "next/navigation";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { hasAssessmentDraft } from "@/app/[locale]/utils/assessmentDraft";

const LandingFooter = () => {
  const t = useTranslations();

  const router = useRouter();

  const { data: me } = useMe();

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

  const closeBeforeAssessmentModal = () => {
    setShowBeforeStartAssessmentModal(false);
  };

  const getFullAnalysis = async () => {
    setShowBmiModal(false);
    setShowIbwModal(false);
    setShowCalCalModal(false);

    if (me?.id) {
      try {
        const { data } = await assessmentApi.getAssessmentsResult();

        if (data?.data) {
          router.push("/nutrition-analysis/result");
          return;
        }
      } catch {
        // No completed result is a valid state when the user has not finished yet.
      }

      if (hasAssessmentDraft(me.id)) {
        router.push("/nutrition-analysis/assessment");
        return;
      }
    }

    setShowBeforeStartAssessmentModal(true);
  };

  const tryFullAssessment = () => {
    void getFullAnalysis();
  };

  const quicklinks = [
    { href: "/", title: t("navList.links.home") },
    { href: "/about-us", title: t("navList.links.aboutUs") },
    { href: "/blogs", title: t("navList.links.blogs") },
    { href: "/contact-us", title: t("navList.links.contactUs") },
    { href: "/pricing", title: t("navList.links.pricing") },
  ];

  const tools = [
    { onTry: tryBmiCalc, title: t("tools.bmiCalculator.name") },
    {
      onTry: tryPerfectWeightCalc,
      title: t("tools.perfectWeightCalculator.name"),
    },
    { onTry: tryCalCal, title: t("tools.calorieCalculator.name") },
    {
      onTry: tryFullAssessment,
      title: t("tools.nutritionAnalysis.name"),
    },
  ];

  return (
    <footer className="w-full bg-footer py-12 text-footer-content">
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

      <div className="mx-auto flex w-[90%] flex-col gap-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:justify-between">
          <Socials />
          <QuickLinks title={t("footer.quickLinks")} linksList={quicklinks} />
          <QuickLinks title={t("footer.tools")} linksList={tools} />
          <Subscribe />
        </div>

        <p className="text-center text-sm font-extralight text-footer-content-muted md:text-lg">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
