import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ScientificCalculatorPage from "../_components/ScientificCalculatorPage";
import { isCalculatorLocale } from "../_components/calculatorContent";
import { createCalculatorMetadata } from "../_components/calculatorSeo";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isCalculatorLocale(locale)) notFound();
  return createCalculatorMetadata(locale, "healthy-weight");
}

export default async function HealthyWeightLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isCalculatorLocale(locale)) notFound();

  return (
    <ScientificCalculatorPage locale={locale} slug="healthy-weight">
      {children}
    </ScientificCalculatorPage>
  );
}
