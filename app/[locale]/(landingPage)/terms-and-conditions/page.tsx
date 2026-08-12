import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LegalDocument, {
  type LegalSection,
} from "../_components/legal/LegalDocument";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: `/${locale}/terms-and-conditions`,
      languages: {
        en: "/en/terms-and-conditions",
        ar: "/ar/terms-and-conditions",
      },
    },
  };
}

export default async function TermsAndConditionsPage() {
  const t = await getTranslations("terms");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <LegalDocument
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={[t("intro")]}
      sections={sections}
    />
  );
}
