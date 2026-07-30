"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const subscribeToTheme = (onThemeChange: () => void) => {
  window.addEventListener("diet-wellness-theme-change", onThemeChange);

  return () =>
    window.removeEventListener("diet-wellness-theme-change", onThemeChange);
};

const getThemeSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) => {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => initialTheme,
  );

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme = theme === "light" ? "dark" : "light";

        document.documentElement.dataset.theme = nextTheme;
        document.documentElement.style.colorScheme = nextTheme;
        localStorage.setItem("diet-wellness-theme", nextTheme);
        document.cookie = `diet-wellness-theme=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax`;
        window.dispatchEvent(new Event("diet-wellness-theme-change"));
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
