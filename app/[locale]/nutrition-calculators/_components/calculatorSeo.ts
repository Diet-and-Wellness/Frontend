import type { Metadata } from "next";
import {
  calculatorContent,
  type CalculatorLocale,
  type CalculatorSlug,
} from "./calculatorContent";

const BASE_URL = "https://diet-n-wellness.com";

export function createCalculatorMetadata(
  locale: CalculatorLocale,
  slug: CalculatorSlug,
): Metadata {
  const content = calculatorContent[locale][slug];
  const pageUrl = `${BASE_URL}/${locale}/nutrition-calculators/${slug}`;
  const alternateLocale = locale === "en" ? "ar" : "en";

  return {
    title: content.metaTitle,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${BASE_URL}/en/nutrition-calculators/${slug}`,
        ar: `${BASE_URL}/ar/nutrition-calculators/${slug}`,
        "x-default": `${BASE_URL}/ar/nutrition-calculators/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: content.metaTitle,
      description: content.description,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: [alternateLocale === "ar" ? "ar_EG" : "en_US"],
      images: [
        {
          url: `${BASE_URL}/images/social-preview.png`,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.description,
      images: [`${BASE_URL}/images/social-preview.png`],
    },
    robots: { index: true, follow: true },
  };
}

export function createCalculatorJsonLd(
  locale: CalculatorLocale,
  slug: CalculatorSlug,
) {
  const content = calculatorContent[locale][slug];
  const url = `${BASE_URL}/${locale}/nutrition-calculators/${slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#calculator`,
        name: content.metaTitle,
        description: content.description,
        url,
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Nutrition calculator",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and a modern web browser",
        inLanguage: locale,
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@type": "Organization",
          name: "Diet & Wellness",
          url: BASE_URL,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "ar" ? "الرئيسية" : "Home",
            item: `${BASE_URL}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "ar" ? "حاسبات التغذية" : "Nutrition calculators",
            item: url,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.metaTitle,
            item: url,
          },
        ],
      },
    ],
  };
}
