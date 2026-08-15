"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useLocale } from "next-intl";

const SunIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="none">
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="none">
    <path
      d="M20 15.2A8 8 0 0 1 8.8 4a8.1 8.1 0 1 0 11.2 11.2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const ThemeSwitch = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const isDark = theme === "dark";
  const isRtl = locale === "ar";
  const thumbOffset = isDark ? (isRtl ? 0 : 32) : isRtl ? 32 : 0;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Use light mode" : "Use dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={toggleTheme}
      className={`relative flex h-9 w-17 shrink-0 cursor-pointer items-center rounded-full border border-line bg-surface-muted p-1 text-content-subtle transition-colors hover:border-brand hover:bg-brand-soft ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-between px-2">
        <SunIcon />
        <MoonIcon />
      </span>
      <motion.span
        initial={false}
        animate={{ x: thumbOffset }}
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
        className="absolute left-1 z-10 flex size-7 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-sm"
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.span>
    </button>
  );
};

export default ThemeSwitch;
