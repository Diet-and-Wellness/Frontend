"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { getCleanPathname } from "@/app/[locale]/utils/getCleanPathname";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

type tabType = { label: string; href: string };

const MobileMenu = ({
  tabs,
  setIsMenuVisible,
}: {
  tabs: tabType[];
  setIsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const pathnameWithLang = usePathname();

  const t = useTranslations();
  const locale = useLocale();
  const slideOffset = locale === "ar" ? "-100%" : "100%";

  const pathname = getCleanPathname(pathnameWithLang);

  const isArabic = pathnameWithLang.startsWith("/ar");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLanguageSwitch = () => {
    if (isArabic) {
      router.replace(pathnameWithLang.replace("/ar", "/en"));
    } else {
      router.replace(pathnameWithLang.replace("/en", "/ar"));
    }
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <motion.div
      initial={{ x: slideOffset }}
      animate={{ x: 0 }}
      exit={{ x: slideOffset }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="-z-10 flex min-h-screen w-full flex-col items-center justify-center gap-7.5 overflow-y-auto bg-white pb-20 absolute inset-0 mt-14.5 md:mt-17 lg:mt-18"
    >
      <ul className="flex flex-col items-center self-center gap-3">
        {tabs.map((tab) => (
          <Tab
            key={tab.href}
            label={tab.label}
            href={tab.href}
            isActive={isActive(tab.href)}
            closeMenu={closeMenu}
          />
        ))}
      </ul>

      <button
        onClick={handleLanguageSwitch}
        className="border-2 border-[#e1e7ef79] rounded-4xl px-5 py-2 flex flex-row gap-2.5 cursor-pointer"
      >
        <Image
          width={24}
          height={24}
          src="/icons/grommet-icons-language.svg"
          alt="langauge change icon"
        />
        <span className="text-[20px] font-bold text-[#1B3212]">
          {isArabic ? "En" : "ع"}
        </span>
      </button>

      <Link
        href={"/signin"}
        className="
            group border-2 border-[#E88B60] px-15 py-3 cursor-pointer
            lg:flex self-center rounded-full
            transition-all duration-300 active:scale-95"
      >
        <span className="text-xl font-semibold text-[#E88B60] transition-colors duration-300">
          {t("getStarted.getStart")}
        </span>
      </Link>
    </motion.div>
  );
};

const Tab = ({
  label,
  href,
  isActive,
  closeMenu,
}: {
  label: string;
  href: string;
  isActive: boolean;
  closeMenu: () => void;
}) => {
  return (
    <Link href={href} onClick={closeMenu} className="rounded-full">
      <li
        className={`rounded-full cursor-pointer px-10 py-3 text-center text-[18px] font-semibold text-[#3a6b26] sm:px-20 sm:text-[20px]
           transition-all duration-300 ease-in-out
           hover:bg-[#3a6b26] hover:text-white
           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a6b26] focus-visible:ring-offset-2 ${isActive ? "bg-[#3a6b26] text-white shadow-sm" : ""}`}
      >
        {label}
      </li>
    </Link>
  );
};

export default MobileMenu;
