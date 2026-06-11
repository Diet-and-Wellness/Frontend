"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getCleanPathname } from "../../utils/getCleanPathname";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

type tabType = { label: string; href: string };

const NavList = ({ tabs }: { tabs: tabType[] }) => {
  const router = useRouter();
  const pathnameWithLang = usePathname();
  const locale = useLocale();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const t = useTranslations();

  const pathname = getCleanPathname(pathnameWithLang);

  console.log(pathname);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleLanguageOptions = () => setShowLanguageOptions((value) => !value);

  const switchToEnglish = () => {
    const isArabic = locale === "ar";
    if (isArabic) router.replace(pathnameWithLang.replace("/ar", "/en"));
    toggleLanguageOptions();
  };

  const switchToArabic = () => {
    const isEnglish = locale === "en";
    if (isEnglish) router.replace(pathnameWithLang.replace("/en", "/ar"));
    toggleLanguageOptions();
  };

  return (
    <div
      className={`min-w-[70%] hidden xl:flex-row xl:flex xl:justify-between xl:items-center gap-3`}
    >
      <ul
        className="
        xl:flex items-center self-center gap-1 
        rounded-full border-2 border-[#3a6b26] p-1"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.href}
            label={tab.label}
            href={tab.href}
            isActive={isActive(tab.href)}
          />
        ))}
      </ul>

      <div className="flex flex-row justify-center items-center gap-3">
        <div
          onMouseEnter={toggleLanguageOptions}
          onMouseLeave={toggleLanguageOptions}
          className="relative"
        >
          <div className="rounded-4xl px-5 py-2 border-2 border-[#e1e7ef79] flex flex-row gap-2.5 cursor-pointer hover:bg-white transition-colors duration-200">
            <Image
              width={24}
              height={24}
              src="/icons/grommet-icons-language.svg"
              alt="langauge change icon"
            />
            <span className="text-[20px] font-bold text-[#1B3212]">{"En"}</span>
          </div>

          <AnimatePresence>
            {showLanguageOptions && (
              <motion.div
                initial={{ opacity: 0, top: 50 }}
                animate={{ opacity: 1, top: 70 }}
                exit={{ opacity: 0, top: 50 }}
                className={`p-3 rounded-2xl bg-white flex flex-col gap-2 absolute shadow-[0_0_5px_0px_rgba(0,0,0,0.2)]`}
              >
                <button
                  onClick={switchToEnglish}
                  className={`min-w-40 p-1.5 text-center rounded-lg text-[20px] font-medium
                    ${locale === "en" ? "bg-[#3a6b261e] text-[#3A6B26]" : "bg-white"} 
                    ${locale === "ar" && "hover:bg-gray-100 transition-colors duration-200 cursor-pointer"}`}
                >
                  English
                </button>
                <button
                  onClick={switchToArabic}
                  className={`min-w-40 p-1.5 text-center rounded-lg text-[20px] font-bold 
                    ${locale === "ar" ? "bg-[#3a6b261e] text-[#3A6B26]" : "bg-white"} 
                    ${locale === "en" && "hover:bg-gray-100 transition-colors duration-200 cursor-pointer"}`}
                >
                  العربية
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href={"/signin"}
          className="
          group border-2 border-[#3a6b26] px-8 py-2 cursor-pointer
          hover:bg-[#3a6b26] lg:flex self-center rounded-full
          transition-all duration-300 active:scale-95"
        >
          <span className="text-xl font-semibold text-[#3a6b26] group-hover:text-white transition-colors duration-300">
            {t("getStarted.getStart")}
          </span>
        </Link>
      </div>
    </div>
  );
};

const Tab = ({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link href={href} className="rounded-full">
      <li
        className={`rounded-full cursor-pointer px-5 py-1.5 text-[20px] font-semibold text-[#3a6b26]
           transition-all duration-300 ease-in-out
           hover:bg-[#3a6b26] hover:text-white
           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a6b26] focus-visible:ring-offset-2 ${isActive ? "bg-[#3a6b26] text-white shadow-sm" : ""}`}
      >
        {label}
      </li>
    </Link>
  );
};

export default NavList;
