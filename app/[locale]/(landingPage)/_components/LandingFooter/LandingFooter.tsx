"use client";

import { useTranslations } from "next-intl";
import QuickLinks from "./footerComp/QuickLinks";
import Socials from "./footerComp/Socials";
import Subscribe from "./footerComp/Subscribe";

const LandingFooter = () => {
  const t = useTranslations();

  const quicklinks = [
    { href: "/", title: t("navList.links.home") },
    { href: "/about-us", title: t("navList.links.aboutUs") },
    { href: "/blogs", title: t("navList.links.blogs") },
    { href: "/contact-us", title: t("navList.links.contactUs") },
    { href: "/pricing", title: t("navList.links.pricing") },
  ];

  const tools = [
    { href: "/", title: t("tools.bmiCalculator.name") },
    { href: "/", title: t("tools.perfectWeightCalculator.name") },
    { href: "/", title: t("tools.calorieCalculator.name") },
    { href: "/", title: t("tools.nutritionAnalysis.name") },
  ];

  return (
    <footer className="w-full bg-footer py-12 text-footer-content">
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
