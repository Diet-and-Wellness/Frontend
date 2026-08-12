"use client";

import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";
import { reveal } from "./motion";

type PurposeSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  missionTitle: string;
  mission: string;
  visionTitle: string;
  vision: string;
};

const PurposeIcon = ({ variant }: { variant: "mission" | "vision" }) =>
  variant === "mission" ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-7">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m14.5 9.5 5-5M16 4.5h3.5V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-7">
      <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );

const PurposeSection = ({
  eyebrow,
  title,
  description,
  missionTitle,
  mission,
  visionTitle,
  vision,
}: PurposeSectionProps) => (
  <section className="mx-auto mt-20 w-[90%] max-w-7xl sm:mt-28">
    <SectionIntro
      eyebrow={eyebrow}
      title={title}
      description={description}
      align="center"
      className="mx-auto mb-10 max-w-3xl sm:mb-14"
    />

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
      className="grid gap-5 lg:grid-cols-2"
    >
      {[
        { title: missionTitle, text: mission, variant: "mission" as const },
        { title: visionTitle, text: vision, variant: "vision" as const },
      ].map((item) => (
        <motion.article
          key={item.title}
          variants={reveal}
          className={`relative overflow-hidden rounded-[28px] border p-7 sm:p-9 ${
            item.variant === "mission"
              ? "border-brand/15 bg-brand-ink text-brand-contrast"
              : "border-accent/20 bg-accent-soft text-content-strong"
          }`}
        >
          <div className="pointer-events-none absolute -end-14 -top-14 size-40 rounded-full border-[28px] border-current opacity-[0.06]" />
          <span
            className={`mb-8 flex size-14 items-center justify-center rounded-2xl ${
              item.variant === "mission"
                ? "bg-white/12 text-brand-contrast"
                : "bg-surface-raised text-accent"
            }`}
          >
            <PurposeIcon variant={item.variant} />
          </span>
          <h3 className="type-section-title font-extrabold">{item.title}</h3>
          <p
            className={`type-body-lg mt-5 max-w-xl ${
              item.variant === "mission"
                ? "text-brand-contrast/78"
                : "text-content-muted"
            }`}
          >
            {item.text}
          </p>
        </motion.article>
      ))}
    </motion.div>
  </section>
);

export default PurposeSection;
