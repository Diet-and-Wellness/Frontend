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
    <footer className="w-full bg-[#2D5A3D] py-12">
      <div className="mx-auto w-[90%] flex flex-col gap-12">
        {/* Layout */}
        <div className="flex flex-row justify-between gap-10 flex-wrap">
          <Socials />
          <QuickLinks title={t("footer.quickLinks")} linksList={quicklinks} />
          <QuickLinks title={t("footer.tools")} linksList={tools} />
          <Subscribe />
        </div>

        {/* Footer bottom */}
        <p className="text-center text-white/80 text-sm md:text-lg font-extralight">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
