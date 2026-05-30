"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { getCleanPathname } from "../../utils/getCleanPathname";
import { useTranslations } from "next-intl";
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

  const pathname = getCleanPathname(pathnameWithLang);

  const isArabic = pathnameWithLang.startsWith("/ar");

  const handleLanguageSwitch = () => {
    if (isArabic) {
      router.replace(pathnameWithLang.replace("/ar", "/en"));
    } else {
      router.replace(pathnameWithLang.replace("/en", "/ar"));
    }
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
    console.log("close")
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="-z-10 pb-20 min-h-screen w-full bg-white absolute inset-0 mt-14.5 md:mt-17 lg:mt-18 flex flex-col justify-center items-center gap-7.5 overflow-scroll"
    >
      <ul className="flex flex-col items-center self-center gap-3">
        {tabs.map((tab) => (
          <Tab
            key={tab.href}
            label={tab.label}
            href={tab.href}
            isActive={pathname === tab.href}
            closeMenu={closeMenu}
          />
        ))}
      </ul>

      <button
        onClick={handleLanguageSwitch}
        className="rounded-4xl px-5 py-2 shadow-[0_0_7px_0px_rgba(0,0,0,0.2)] flex flex-row gap-2.5 cursor-pointer hover:bg-white transition-colors duration-200"
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
        className={`rounded-full cursor-pointer px-20 py-3 text-[20px] font-semibold text-[#3a6b26]
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
