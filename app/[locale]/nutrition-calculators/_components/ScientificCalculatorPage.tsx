import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import BmiCalculatorIcon from "@/app/[locale]/components/icons/BmiCalculatorIcon";
import CalorieCalculatorIcon from "@/app/[locale]/components/icons/CalorieCalculatorIcon";
import HealthyWeightIcon from "@/app/[locale]/components/icons/HealthyWeightIcon";
import {
  calculatorContent,
  type CalculatorLocale,
  type CalculatorSlug,
} from "./calculatorContent";
import { createCalculatorJsonLd } from "./calculatorSeo";
import AnimatedFaq from "./AnimatedFaq";
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  ChartResultIcon,
  FlaskIcon,
  HelpCircleIcon,
  ListChecksIcon,
  ShieldCheckIcon,
  SlidersIcon,
  TargetRangeIcon,
  VerifiedIcon,
} from "./CalculatorContentIcons";

const toolIcons = {
  bmi: BmiCalculatorIcon,
  "healthy-weight": HealthyWeightIcon,
  "daily-calories": CalorieCalculatorIcon,
};

const relatedNames: Record<CalculatorLocale, Record<CalculatorSlug, string>> = {
  en: {
    bmi: "BMI calculator",
    "healthy-weight": "Healthy weight calculator",
    "daily-calories": "Daily calorie calculator",
  },
  ar: {
    bmi: "حاسبة مؤشر كتلة الجسم",
    "healthy-weight": "حاسبة الوزن الصحي",
    "daily-calories": "حاسبة السعرات اليومية",
  },
};

function SectionHeading({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand-soft text-brand">
        {icon}
      </span>
      <h2 className="type-card-title font-bold text-content">{children}</h2>
    </div>
  );
}

export default function ScientificCalculatorPage({
  locale,
  slug,
  children,
}: {
  locale: CalculatorLocale;
  slug: CalculatorSlug;
  children: ReactNode;
}) {
  const content = calculatorContent[locale][slug];
  const ToolIcon = toolIcons[slug];
  const jsonLd = createCalculatorJsonLd(locale, slug);
  const relatedSlugs = (Object.keys(toolIcons) as CalculatorSlug[]).filter(
    (item) => item !== slug,
  );
  const highlightIcons = [SlidersIcon, TargetRangeIcon, ChartResultIcon];
  const formulaParts = content.formula.split(" · ");

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:gap-10">
        <header className="max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1.5 text-sm font-semibold text-brand">
            <VerifiedIcon className="size-4" />
            {content.eyebrow}
          </span>
          <h1 className="text-[clamp(1.65rem,4vw,2.5rem)] leading-[1.2] font-bold text-content">
            {content.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl type-body text-content-muted sm:mt-4">
            {content.introduction}
          </p>
        </header>

        {children}

        <article className="w-full space-y-6 md:space-y-8">
          <ul
            className="grid gap-4 sm:grid-cols-3"
            aria-label={locale === "ar" ? "ملخص الأداة" : "Tool summary"}
          >
            {content.highlights.map((item, index) => {
              const HighlightIcon = highlightIcons[index];
              return (
                <li
                  key={item.label}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-surface-raised p-5 transition-colors hover:border-brand/40"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-subtle text-brand transition-colors group-hover:border-brand/20 group-hover:bg-brand-soft">
                      <HighlightIcon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="type-meta font-semibold uppercase tracking-wider text-content-subtle">
                        {item.label}
                      </p>
                      <p className="mt-1.5 type-card-title font-bold text-brand">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="relative overflow-hidden rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
              <SectionHeading icon={<FlaskIcon className="size-5" />}>
                {content.scienceTitle}
              </SectionHeading>
              <div className="space-y-4 type-body text-content-muted">
                {content.science.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-brand/20 bg-brand-softer p-5">
                <p className="type-meta font-bold uppercase tracking-wider text-brand">
                  {content.formulaLabel}
                </p>
                <div className="mt-2 space-y-1.5 type-body font-semibold text-content">
                  {formulaParts.map((part) => (
                    <p
                      key={part}
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      className="text-start [unicode-bidi:plaintext]"
                    >
                      {part}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
              <SectionHeading icon={<ToolIcon className="size-6" />}>
                {content.interpretationTitle}
              </SectionHeading>
              <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
                {content.interpretation.map((item) => (
                  <div
                    key={item.range}
                    className="grid gap-1 bg-surface-subtle px-4 py-3 sm:grid-cols-[0.8fr_1.2fr] sm:gap-4"
                  >
                    <dt className="text-start type-label font-bold text-brand">
                      <bdi dir="auto">{item.range}</bdi>
                    </dt>
                    <dd className="type-label text-content-muted">
                      <bdi dir="auto">{item.meaning}</bdi>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
              <SectionHeading icon={<ShieldCheckIcon className="size-5" />}>
                {content.limitationsTitle}
              </SectionHeading>
              <ul className="space-y-4">
                {content.limitations.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 type-body text-content-muted"
                  >
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
              <SectionHeading icon={<ListChecksIcon className="size-5" />}>
                {content.useTitle}
              </SectionHeading>
              <ol className="space-y-4">
                {content.useSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 type-body text-content-muted"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft type-meta font-bold text-accent-dark">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="rounded-3xl border border-line bg-surface-raised p-6 sm:p-8">
            <SectionHeading icon={<HelpCircleIcon className="size-5" />}>
              {content.faqTitle}
            </SectionHeading>
            <AnimatedFaq faqs={content.faqs} />
          </section>

          <section className="rounded-3xl border border-brand/15 bg-brand-softer p-6 sm:p-8">
            <h2 className="type-card-title font-bold text-content">
              {content.relatedTitle}
            </h2>
            <p className="mt-2 type-body text-content-muted">
              {content.relatedDescription}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedSlugs.map((relatedSlug) => {
                const RelatedIcon = toolIcons[relatedSlug];
                return (
                  <Link
                    key={relatedSlug}
                    href={`/nutrition-calculators/${relatedSlug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-surface-raised p-4 transition-colors hover:border-brand/60 hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <RelatedIcon className="size-6" />
                    </span>
                    <span className="type-label font-semibold text-content group-hover:text-brand">
                      {relatedNames[locale][relatedSlug]}
                    </span>
                    <span
                      className="ms-auto shrink-0 text-brand transition-transform group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      <ArrowUpRightIcon
                        className="size-5"
                        style={
                          locale === "ar"
                            ? { transform: "scaleX(-1)" }
                            : undefined
                        }
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <footer className="border-t border-line pt-6">
            <div className="flex items-center gap-2.5">
              <BookOpenIcon className="size-5 text-brand" />
              <h2 className="type-label font-bold text-content">
                {content.sourcesTitle}
              </h2>
            </div>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {content.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-2 type-label font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
                  >
                    <span>{source.label}</span>
                    <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-2xl border border-line bg-surface-muted p-4 type-meta text-content-subtle">
              {content.disclaimer}
            </p>
          </footer>
        </article>
      </section>
    </main>
  );
}
