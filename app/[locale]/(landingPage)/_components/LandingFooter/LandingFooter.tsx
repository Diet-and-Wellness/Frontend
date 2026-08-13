"use client";

import { useTranslations } from "next-intl";
import QuickLinks from "./footerComp/QuickLinks";
import Socials from "./footerComp/Socials";
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
  const [checkingAssessment, setCheckingAssessment] = useState(false);

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

  const closeCalculatorModals = () => {
    setShowBmiModal(false);
    setShowIbwModal(false);
    setShowCalCalModal(false);
  };

  const redirectToAssessmentFlow = async (customerId: string) => {
    try {
      const { data } = await assessmentApi.getAssessmentsResult();

      if (data?.data) {
        router.push("/nutrition-analysis/result");
        return;
      }
    } catch (error) {
      console.error("Failed to get assessment result:", error);
    }

    const destination = hasAssessmentDraft(customerId)
      ? "/nutrition-analysis/assessment"
      : "/nutrition-analysis/assessment";

    router.push(destination);
  };

  const getFullAnalysis = async () => {
    closeCalculatorModals();

    if (!me) {
      router.replace("/signin");
      return;
    }

    if (me.role !== "customer") {
      return;
    }

    try {
      setCheckingAssessment(true);
      await redirectToAssessmentFlow(me.id);
    } catch (error) {
      console.error("Failed to open full analysis:", error);
    } finally {
      setCheckingAssessment(false);
    }
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
    { href: "/terms-and-conditions", title: t("terms.title") },
    { href: "/privacy-policy", title: t("privacy.title") },
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
      loading: checkingAssessment,
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
        </div>

        <p className="text-center text-sm font-extralight text-footer-content-muted md:text-lg">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
