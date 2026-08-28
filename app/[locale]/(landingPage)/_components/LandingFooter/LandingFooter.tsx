"use client";

import { useTranslations } from "next-intl";
import QuickLinks from "./footerComp/QuickLinks";
import Socials from "./footerComp/Socials";
import { useRouter } from "next/navigation";
import { useMe } from "@/app/[locale]/hooks/useMe";

const LandingFooter = () => {
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
    },
  ];

  return (
    <footer className="w-full bg-footer py-12 text-footer-content">
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
