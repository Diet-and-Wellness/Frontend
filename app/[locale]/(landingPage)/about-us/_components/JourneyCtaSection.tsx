"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

type JourneyCtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
};

const JourneyCtaSection = ({
  eyebrow,
  title,
  description,
  buttonLabel,
}: JourneyCtaSectionProps) => (
  <section className="mx-auto mt-20 w-[90%] max-w-7xl sm:mt-28">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[32px] bg-brand-ink px-6 py-12 text-center text-brand-contrast sm:rounded-[44px] sm:px-12 sm:py-16"
    >
      <div className="pointer-events-none absolute -end-20 -top-20 size-64 rounded-full border-[44px] border-accent/18" />
      <div className="pointer-events-none absolute -bottom-24 -start-12 size-60 rounded-full bg-brand/35 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <p className="type-label font-bold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h2 className="type-section-title mt-4 font-extrabold">{title}</h2>
        <p className="type-body-lg mx-auto mt-5 max-w-2xl text-brand-contrast/75">
          {description}
        </p>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-flex">
          <Link
            href="/nutrition-analysis/assessment"
            className="type-control inline-flex min-h-12.5 items-center justify-center rounded-full bg-accent px-7 font-bold text-accent-contrast shadow-[0_12px_30px_rgba(233,149,50,0.25)] transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {buttonLabel}
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="ms-2 size-5 rtl:rotate-180">
              <path d="M4 10h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default JourneyCtaSection;
