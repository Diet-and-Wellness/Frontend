"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const DISMISSED_AT_KEY = "diet-wellness-pwa-prompt-dismissed-at";
const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    navigator.standalone === true
  );
}

function isIosDevice() {
  const classicIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const modernIpad =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return classicIosDevice || modernIpad;
}

function wasRecentlyDismissed() {
  const dismissedAt = Number(localStorage.getItem(DISMISSED_AT_KEY));
  return Number.isFinite(dismissedAt) && Date.now() - dismissedAt < DISMISS_FOR_MS;
}

export default function PwaInstallPrompt() {
  const t = useTranslations("pwaInstall");
  const [isVisible, setIsVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isStandalone() || wasRecentlyDismissed()) {
      return;
    }

    let iosPromptTimer: ReturnType<typeof setTimeout> | undefined;

    if (isIosDevice()) {
      iosPromptTimer = setTimeout(() => {
        setIsIos(true);
        setIsVisible(true);
      }, 0);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleInstalled = () => {
      localStorage.removeItem(DISMISSED_AT_KEY);
      setIsVisible(false);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      if (iosPromptTimer) {
        clearTimeout(iosPromptTimer);
      }

      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_AT_KEY, String(Date.now()));
    setIsVisible(false);
  };

  const install = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setIsVisible(false);
    }

    setInstallPrompt(null);
  };

  if (!isVisible || (!isIos && !installPrompt)) {
    return null;
  }

  return (
    <aside
      aria-label={t("title")}
      aria-live="polite"
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[100] mx-auto max-w-md rounded-2xl border border-line bg-surface-raised p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("dismiss")}
        className="absolute end-3 top-3 flex size-8 items-center justify-center rounded-full text-content-subtle transition hover:bg-surface-neutral hover:text-content"
      >
        <span aria-hidden="true" className="text-2xl leading-none">
          ×
        </span>
      </button>

      <div className="flex items-start gap-3 pe-8">
        <Image
          src="/icons/icon-192x192.png"
          width={56}
          height={56}
          alt=""
          className="size-14 shrink-0 rounded-xl"
        />

        <div className="min-w-0">
          <h2 className="text-base font-bold text-content-strong">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-content-muted">
            {isIos ? t("iosInstructions") : t("androidDescription")}
          </p>
        </div>
      </div>

      {isIos ? (
        <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm font-semibold text-brand-deep">
          <ShareIcon />
          <span>{t("iosAction")}</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={install}
          className="mt-3 w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-contrast transition hover:bg-brand-hover"
        >
          {t("install")}
        </button>
      )}
    </aside>
  );
}

function ShareIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 shrink-0"
    >
      <path
        d="M12 15V3m0 0L8 7m4-4 4 4M6 10H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
