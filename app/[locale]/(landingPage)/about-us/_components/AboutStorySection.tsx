"use client";

import { motion } from "framer-motion";
import BenefitIcon from "./BenefitIcon";
import { reveal } from "./motion";

type BenefitType = {
  title: string;
  description: string;
};

type AboutStorySectionProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  foundedValue: string;
  foundedLabel: string;
  clientsValue: string;
  clientsLabel: string;
  reasonsTitle: string;
  reasons: BenefitType[];
  philosophy: string;
};

const AboutStorySection = ({
  eyebrow,
  title,
  paragraphs,
  foundedValue,
  foundedLabel,
  clientsValue,
  clientsLabel,
  reasonsTitle,
  reasons,
  philosophy,
}: AboutStorySectionProps) => (
  <section className="mt-20 sm:mt-28">
    <div className="relative mx-auto w-[94%] max-w-375 overflow-hidden rounded-4xl bg-brand-softer px-[5%] py-14 sm:rounded-[48px] sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -inset-e-24 -top-24 size-72 rounded-full border-52 border-accent/10" />
      <div className="pointer-events-none absolute -bottom-24 -inset-s-24 size-64 rounded-full bg-brand/8 blur-2xl" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={reveal}
        transition={{ duration: 0.6 }}
        className="relative mb-10 max-w-5xl lg:mb-14"
      >
        <p className="type-label mb-4 font-bold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
        <h2 className="type-section-title max-w-3xl font-extrabold tracking-tight text-brand-ink">
          {title}
        </h2>
        <div className="mt-6 grid max-w-5xl gap-4 text-content-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="type-body-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { value: foundedValue, label: foundedLabel },
            { value: clientsValue, label: clientsLabel },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-44 items-center gap-3 rounded-2xl border border-brand/10 bg-surface-raised px-5 py-3 shadow-[0_10px_30px_rgba(35,64,22,0.06)]"
            >
              <strong className="type-card-title text-brand-ink">
                {stat.value}
              </strong>
              <span className="type-meta font-semibold text-content-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="flex flex-col rounded-[28px] border border-brand/10 bg-surface-raised p-5 shadow-[0_22px_65px_rgba(35,64,22,0.08)] sm:p-8"
      >
        <motion.h3
          variants={reveal}
          className="type-card-title mb-5 font-bold text-brand-ink sm:mb-7"
        >
          {reasonsTitle}
        </motion.h3>

        <div className="grid flex-1 gap-5 lg:grid-cols-2 sm:gap-7.5">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              variants={reveal}
              className={`group flex flex-col gap-1.5 rounded-2xl border border-line bg-surface-subtle p-5 text-content-muted transition-all duration-300`}
            >
              <span className="flex size-11 mb-2.5 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <BenefitIcon index={index % 4} />
              </span>
              <p className="type-body font-semibold leading-snug">
                {reason.title}
              </p>
              <p className=" font-light leading-snug">{reason.description}</p>
            </motion.div>
          ))}
          <div className="flex items-start gap-4 rounded-2xl border border-accent/20 bg-accent-soft p-5">
            <span className="w-1 shrink-0 self-stretch rounded-full bg-accent" />
            <p className="type-body text-content-strong">{philosophy}</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutStorySection;
