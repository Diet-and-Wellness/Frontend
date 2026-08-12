import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalDocument, {
  type LegalSection,
} from "../_components/legal/LegalDocument";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: {
        en: "/en/privacy-policy",
        ar: "/ar/privacy-policy",
      },
    },
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacy");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <LegalDocument
      eyebrow={t("eyebrow")}
      title={t("title")}
      lastUpdated={t("lastUpdated")}
      intro={[t("intro"), t("acknowledgement")]}
      sections={sections}
    />
  );
}
