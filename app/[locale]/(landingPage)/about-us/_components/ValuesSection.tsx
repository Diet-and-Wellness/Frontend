"use client";

import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";
import { reveal } from "./motion";
import type { ValueItem } from "./types";

type ValuesSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  values: ValueItem[];
};

const valueIcons = [
  <path key="science" d="M9 3v5l-4.5 8a3 3 0 0 0 2.6 4.5h9.8a3 3 0 0 0 2.6-4.5L15 8V3M7 14h10M8 3h8" />,
  <path key="trust" d="m12 3 7 3v5c0 4.4-2.8 7.8-7 10-4.2-2.2-7-5.6-7-10V6l7-3Zm-3 9 2 2 4-4" />,
  <path key="care" d="M19.5 5.5A5 5 0 0 0 12 6a5 5 0 0 0-7.5-.5C.5 9.5 4 15 12 20c8-5 11.5-10.5 7.5-14.5Z" />,
  <path key="sustainability" d="M20 7v5h-5M18.5 15.5A7.5 7.5 0 1 1 19 8l1 4" />,
];

const ValuesSection = ({
  eyebrow,
  title,
  description,
  values,
}: ValuesSectionProps) => (
  <section className="mx-auto mt-20 w-[90%] max-w-7xl sm:mt-28">
    <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:gap-16">
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="lg:sticky lg:top-28"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {values.map((value, index) => (
          <motion.article
            key={value.title}
            variants={reveal}
            className="rounded-3xl border border-line bg-surface-raised p-6 shadow-[0_12px_38px_rgba(35,64,22,0.06)] sm:p-7"
          >
            <span className="mb-7 flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-6">
                {valueIcons[index % valueIcons.length]}
              </svg>
            </span>
            <h3 className="type-card-title font-bold text-brand-ink">
              {value.title}
            </h3>
            <p className="type-body mt-3 text-content-muted">
              {value.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ValuesSection;
