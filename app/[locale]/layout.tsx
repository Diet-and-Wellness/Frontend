import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";

import ReactQueryProvider from "@/app/[locale]/lib/react-query-provider";
import { ThemeProvider } from "@/app/[locale]/components/Theme/ThemeProvider";

import "./globals.css";

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

const baseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://diet-wellness.vercel.app"
).replace(/\/$/, "");

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
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const content = metadataContent[currentLocale];

  const pageUrl = `${baseUrl}/${currentLocale}`;

  const imageUrl = `${baseUrl}/images/social-peview.png`;

  return {
    metadataBase: new URL(baseUrl),

    title: {
      default: content.title,
      template: `%s | ${content.title}`,
    },

    description: content.description,

    applicationName: "Diet and Wellness",

    alternates: {
      canonical: pageUrl,

      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/en`,
      },
    },

    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "Diet and Wellness",
      title: content.title,
      description: content.description,
      locale: currentLocale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: currentLocale === "ar" ? ["en_US"] : ["ar_EG"],

      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: content.imageAlt,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,

      images: [
        {
          url: imageUrl,
          alt: content.imageAlt,
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
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
      dir={direction}
      data-scroll-behavior="smooth"
      data-theme={initialTheme}
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
