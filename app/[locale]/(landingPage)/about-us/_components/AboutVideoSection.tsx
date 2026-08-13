"use client";

import { motion } from "framer-motion";

type AboutVideoSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  videoTitle: string;
  videoUrl?: string;
};

const AboutVideoSection = ({
  eyebrow,
  title,
  description,
  videoTitle,
  videoUrl = "https://www.youtube-nocookie.com/embed/xyQY8a-ng6g?rel=0",
}: AboutVideoSectionProps) => (
  <section className="mx-auto w-[90%] max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="mb-7 flex max-w-3xl flex-col gap-3 sm:mb-10"
    >
      <p className="type-label font-bold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h1 className="type-display font-extrabold tracking-tight text-brand-ink">
        {title}
      </h1>
      <p className="type-body-lg max-w-2xl text-content-muted">
        {description}
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-line bg-brand-ink p-1.5 shadow-[0_24px_70px_rgba(35,64,22,0.18)] sm:rounded-[36px] sm:p-2"
    >
      <div className="pointer-events-none absolute -inset-s-16 -top-16 z-10 size-40 rounded-full bg-accent/25 blur-3xl" />
      <iframe
        className="aspect-video w-full rounded-[19px] sm:rounded-[29px]"
        src={videoUrl}
        title={videoTitle}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </motion.div>
  </section>
);

export default AboutVideoSection;
