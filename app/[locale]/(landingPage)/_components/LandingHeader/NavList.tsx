"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { getCleanPathname } from "@/app/[locale]/utils/getCleanPathname";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useMe } from "@/app/[locale]/hooks/useMe";
import LanguageIcon from "@/app/[locale]/components/icons/LanguageIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type tabType = { label: string; href: string };

const NavList = ({ tabs }: { tabs: tabType[] }) => {
  const router = useRouter();
  const pathnameWithLang = usePathname();
  const locale = useLocale();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const t = useTranslations();

  const queryClient = useQueryClient();

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

  const cta = getCTA();

  const pathname = getCleanPathname(pathnameWithLang);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const switchToArabic = () => switchToArabicMutation.mutate();

  const switchToEnglish = () => switchToEnglishMutation.mutate();

  const validateCachedData = () => {
    setShowLanguageOptions(false);

    queryClient.removeQueries({
      queryKey: ["pricingPlans"],
    });

    queryClient.removeQueries({
      queryKey: ["landingBlogs"],
    });

    queryClient.removeQueries({
      queryKey: ["publishedBlogs"],
    });
  };

  const switchToEnglishMutation = useMutation({
    mutationFn: async () => {
      const isArabic = locale === "ar";
      if (isArabic) router.replace(pathnameWithLang.replace("/ar", "/en"));
    },
    onSuccess: validateCachedData,
  });

  const switchToArabicMutation = useMutation({
    mutationFn: async () => {
      const isEnglish = locale === "en";
      if (isEnglish) router.replace(pathnameWithLang.replace("/en", "/ar"));
    },
    onSuccess: validateCachedData,
  });

  const handleCustomerTools = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();

      document.getElementById("our-tools")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={`min-w-[70%] hidden xl:flex-row xl:flex xl:justify-between xl:items-center gap-15`}
    >
      <ul
        className="
        xl:flex items-center self-center gap-1 
        rounded-full border border-line p-1 bg-surface-muted bg-surface-muted text-content-subtle transition-colors"
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
          onMouseEnter={() => setShowLanguageOptions(true)}
          onMouseLeave={() => setShowLanguageOptions(false)}
          className="relative"
        >
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={showLanguageOptions}
            onClick={() => setShowLanguageOptions((current) => !current)}
            className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface-muted px-5 py-2 text-content-muted transition-colors hover:border-brand hover:bg-brand-soft"
          >
            <LanguageIcon className="size-5.5" />
            <span className="text-lg font-semibold">
              {locale === "en" ? "En" : "ع"}
            </span>
          </button>

          <AnimatePresence>
            {showLanguageOptions && (
              <div className="absolute right-0 top-full z-50 pt-2">
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="flex flex-col gap-2 rounded-2xl border border-line bg-surface-raised p-2 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                >
                  <button
                    role="menuitem"
                    onClick={switchToEnglish}
                    className={`min-w-40 cursor-pointer rounded-xl p-2 text-center text-base font-medium transition-colors ${
                      locale === "en"
                        ? "bg-brand-soft text-brand"
                        : "hover:bg-surface-neutral"
                    }`}
                  >
                    English
                  </button>
                  <button
                    role="menuitem"
                    onClick={switchToArabic}
                    className={`min-w-40 cursor-pointer rounded-xl p-2 text-center text-base font-semibold transition-colors ${
                      locale === "ar"
                        ? "bg-brand-soft text-brand"
                        : "hover:bg-surface-neutral"
                    }`}
                  >
                    العربية
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href={cta.href}
          onClick={me?.role === "customer" ? handleCustomerTools : undefined}
          scroll
          className="
          group flex min-h-11 cursor-pointer items-center self-center rounded-full
          border border-line bg-surface-muted px-8 py-2
          transition-all duration-200 hover:border-brand hover:bg-brand-soft active:scale-95"
        >
          <span className="text-lg font-semibold text-brand transition-colors">
            {cta.label}
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
        className={`rounded-full cursor-pointer px-5 py-1.5 text-[18px] font-semibold text-brand-hover
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

export default NavList;
