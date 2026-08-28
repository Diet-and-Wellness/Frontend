"use client";

import LanguageIcon from "@/app/[locale]/components/icons/LanguageIcon";
import ThemeSwitch from "@/app/[locale]/components/Theme/ThemeSwitch";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Logo from "./Logo";

const MinimalHeader = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("legal");

  const targetLocale = locale === "en" ? "ar" : "en";

  const switchLanguage = () => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    router.replace(segments.join("/"));
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line/80 bg-surface/85 backdrop-blur-xl">
      <nav
        aria-label={t("headerNavigation")}
        className="mx-auto flex w-[90%] max-w-7xl items-center justify-between py-2"
      >
        <Logo href="/" />

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={switchLanguage}
            aria-label={
              targetLocale === "ar" ? t("switchToArabic") : t("switchToEnglish")
            }
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface-muted px-4 text-content-muted transition-colors hover:border-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-5"
          >
            <LanguageIcon className="size-5" />
            <span className="font-semibold">
              {targetLocale === "ar" ? "العربية" : "English"}
            </span>
          </button>

          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
};

export default MinimalHeader;
