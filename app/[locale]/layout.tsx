import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cookies } from "next/headers";

import type { Metadata } from "next";

import ReactQueryProvider from "@/app/[locale]/lib/react-query-provider";

import { Cairo, Roboto } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/app/[locale]/components/Theme/ThemeProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const baseUrl = "https://diet-wellness.vercel.app";

const metadataContent = {
  en: {
    title: "Diet and Wellness",
    description:
      "Improve your health with smart nutrition tools, personalized assessments, calorie calculators, wellness insights, and professional specialist support.",
    imageAlt: "Diet and Wellness health and nutrition platform",
  },
  ar: {
    title: "دايت آند ويلنس",
    description:
      "حسّن صحتك من خلال أدوات التغذية الذكية، والتقييمات المخصصة، وحاسبات السعرات، وتحليلات الصحة، ودعم المتخصصين.",
    imageAlt: "منصة دايت آند ويلنس للصحة والتغذية",
  },
} as const;

type Locale = keyof typeof metadataContent;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const content = metadataContent[currentLocale];

  const pageUrl = `${baseUrl}/${currentLocale}`;
  const imageUrl = `${baseUrl}/images/social-preview.jpg`;

  return {
    metadataBase: new URL(baseUrl),

    title: content.title,
    description: content.description,

    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },

    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "Diet and Wellness",
      locale: currentLocale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: currentLocale === "ar" ? ["en_US"] : ["ar_EG"],
      title: content.title,
      description: content.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: content.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [imageUrl],
    },
  };
}

export default async function IndexLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const savedTheme = (await cookies()).get("diet-wellness-theme")?.value;
  const initialTheme = savedTheme === "dark" ? "dark" : "light";

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      data-theme={initialTheme}
      dir={direction}
      suppressHydrationWarning
    >
      <body className={locale === "ar" ? cairo.className : roboto.className}>
        <ReactQueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider initialTheme={initialTheme}>
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}