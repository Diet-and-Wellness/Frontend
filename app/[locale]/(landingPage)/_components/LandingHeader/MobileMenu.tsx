"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { getCleanPathname } from "@/app/[locale]/utils/getCleanPathname";
import { useLocale, useTranslations } from "next-intl";
import LanguageIcon from "@/app/[locale]/components/icons/LanguageIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ThemeSwitch from "@/app/[locale]/components/Theme/ThemeSwitch";
import { useMe } from "@/app/[locale]/hooks/useMe";
import LogoutIcon from "@/app/[locale]/components/icons/LogoutIcon";

type tabType = { label: string; href: string };

const MobileMenu = ({
  tabs,
  setIsMenuVisible,
  onClickLogout,
  isLoggingout,
}: {
  tabs: tabType[];
  setIsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClickLogout: () => void;
  isLoggingout: boolean;
}) => {
  const router = useRouter();

  const pathnameWithLang = usePathname();

  const queryClient = useQueryClient();

  const t = useTranslations();

  const locale = useLocale();

  const slideOffset = locale === "ar" ? "-100%" : "100%";

  const pathname = getCleanPathname(pathnameWithLang);

  const isArabic = pathnameWithLang.startsWith("/ar");

  const { data: me } = useMe();

  const getCTA = () => {
    if (!me) {
      return {
        href: "/signin",
        label: t("getStarted.getStart"),
      };
    }

    switch (me.role) {
      case "customer":
        return {
          href: "/#our-tools",
          label: t("tools.tryOurTools"),
        };

      case "specialist":
        return {
          href: "/dashboard/specialist",
          label: t("dashboard.dashboard"),
        };

      case "admin":
        return {
          href: "/dashboard/admin",
          label: t("dashboard.dashboard"),
        };

      default:
        return {
          href: "/signin",
          label: t("getStarted.getStart"),
        };
    }
  };

  const handleCustomerTools = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (pathname === "/") {
      e.preventDefault();

      document.getElementById("our-tools")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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

  const handleLogout = () => {
    closeMenu();
    onClickLogout();
  };

  const cta = getCTA();

  return (
    <motion.div
      initial={{ x: slideOffset }}
      animate={{ x: 0 }}
      exit={{ x: slideOffset }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 -z-10 mt-[63.5px] flex h-[calc(100dvh-63.5px)] w-full flex-col items-center justify-start gap-7.5 overflow-y-auto bg-surface-raised px-4 pt-6 pb-10 md:mt-17.25 md:h-[calc(100dvh-69px)] lg:mt-18.25 lg:h-[calc(100dvh-73px)]"
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
        href={cta.href}
        onClick={me?.role === "customer" ? handleCustomerTools : undefined}
        scroll
        className="
          group flex min-h-12 cursor-pointer items-center self-center rounded-full
          border border-line bg-surface-muted px-8 py-1.5
          transition-all duration-200 hover:border-brand hover:bg-brand-soft active:scale-95"
      >
        <span className="text-lg font-semibold text-brand transition-colors">
          {cta.label}
        </span>
      </Link>

      {!!me && (
        <button
          type="button"
          disabled={isLoggingout}
          onClick={handleLogout}
          className="flex min-h-12 cursor-pointer items-center gap-3 rounded-full px-8 py-2 text-danger transition-colors hover:bg-surface-neutral disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogoutIcon className="text-danger" />
          <span className="text-lg font-semibold">{t("dashboard.logout")}</span>
        </button>
      )}
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
        className={`rounded-full cursor-pointer px-7 py-2 text-center text-[18px] font-semibold text-brand-hover sm:px-20 sm:text-[20px]
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
