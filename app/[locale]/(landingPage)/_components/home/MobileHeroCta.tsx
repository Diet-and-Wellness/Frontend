"use client";

import { useMe } from "@/app/[locale]/hooks/useMe";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const MobileHeroCta = () => {
  const t = useTranslations("hero.mobileCta");

  const { data: me } = useMe();
  const router = useRouter();

  const handleGetStart = () => {
    if (me) {
      router.push("/nutrition-analysis/");
      return;
    } else {
      router.push("/signin");
      return;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
      className="pointer-events-auto absolute inset-x-4 bottom-5 z-20 overflow-hidden rounded-3xl border border-line/60 bg-surface-raised/92 p-4 text-content shadow-[0_20px_50px_rgba(17,24,39,0.18)] backdrop-blur-md md:hidden w-[90%] mx-auto"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-e-8 -top-10 size-24 rounded-full border-18 border-accent/25"
      />

      <div className="relative">
        <p className="type-meta font-bold uppercase tracking-[0.18em] text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="mt-1.5 max-w-100 text-xl font-extrabold leading-tight">
          {t("title")}
        </h1>

        <button
          onClick={handleGetStart}
          className="type-control mt-4 flex min-h-12 w-full items-center justify-between rounded-full bg-accent px-5 font-bold text-accent-contrast shadow-[0_10px_24px_rgba(233,149,50,0.24)] transition-[background-color,transform] duration-200 hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent active:scale-[0.98]"
        >
          <span>{t("button")}</span>
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-white/18"
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="size-4.5 rtl:rotate-180"
            >
              <path
                d="M4 10h12m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </motion.div>
  );
};
