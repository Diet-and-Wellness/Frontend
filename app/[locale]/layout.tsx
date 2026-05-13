import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";

import { Roboto } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diet and Wellness",
  description:
    "Diet & Wellness is a modern health and fitness platform focused on helping users achieve their wellness goals through smart nutrition tools and personalized guidance. The app includes calorie calculators, custom diet plan generation, progress tracking, and wellness management features. Users can also connect with professional coaches and nutrition specialists for personalized support, making the platform a complete solution for healthy lifestyle transformation.",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} data-scroll-behavior="smooth" dir={direction}>
      <body className={`${roboto.className}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
