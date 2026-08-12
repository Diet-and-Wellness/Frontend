"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { getCleanPathname } from "@/app/[locale]/utils/getCleanPathname";
import { useLocale, useTranslations } from "next-intl";
import LanguageIcon from "@/app/[locale]/components/icons/LanguageIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ThemeSwitch from "@/app/[locale]/components/Theme/ThemeSwitch";

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

  const queryClient = useQueryClient();

  const t = useTranslations();
  const locale = useLocale();
  const slideOffset = locale === "ar" ? "-100%" : "100%";

  const pathname = getCleanPathname(pathnameWithLang);

  const isArabic = pathnameWithLang.startsWith("/ar");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const switchLanguage = () => switchLanguageMutation.mutate();

  const validateCachedData = () => {
    queryClient.removeQueries({
      queryKey: ["pricingPlans"],
    });

    queryClient.removeQueries({
      queryKey: ["landingBlogs"],
    });

    queryClient.removeQueries({
      queryKey: ["publishedBlogs"],
    });

    queryClient.removeQueries({
      queryKey: ["assessment-result"],
    });
  };

  const switchLanguageMutation = useMutation({
    mutationFn: async () => {
      if (isArabic) {
        router.replace(pathnameWithLang.replace("/ar", "/en"));
      } else {
        router.replace(pathnameWithLang.replace("/en", "/ar"));
      }
    },
    onSuccess: validateCachedData,
  });

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <motion.div
      initial={{ x: slideOffset }}
      animate={{ x: 0 }}
      exit={{ x: slideOffset }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="-z-10 flex min-h-screen w-full flex-col items-center justify-center gap-7.5 overflow-y-auto bg-surface-raised pb-20 absolute inset-0 mt-14.5 md:mt-17 lg:mt-18"
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
        onClick={switchLanguage}
        className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface-muted px-5 py-2 text-content-muted transition-colors hover:border-brand hover:bg-brand-soft"
      >
        <LanguageIcon className="size-5.5" />
        <span className="text-lg font-semibold">{isArabic ? "En" : "ع"}</span>
      </button>

      <ThemeSwitch />

      <Link
        href={"/signin"}
        className="
            group border-2 border-(--color-palette-e88b60) px-10 py-2.5 cursor-pointer
            lg:flex self-center rounded-full
            transition-all duration-300 active:scale-95"
      >
        <span className="text-lg font-semibold text-(--color-palette-e88b60) transition-colors duration-300">
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
        className={`rounded-full cursor-pointer px-10 py-3 text-center text-[18px] font-semibold text-brand-hover sm:px-20 sm:text-[20px]
           transition-all duration-300 ease-in-out
           hover:bg-brand-hover hover:text-brand-contrast
           focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-hover focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
             isActive
               ? "bg-brand-hover text-surface shadow-sm"
               : "text-brand-hover"
           }`}
      >
        {label}
      </li>
    </Link>
  );
};

export default MobileMenu;
