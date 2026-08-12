"use client";

import { motion } from "framer-motion";
import { reveal } from "./motion";
import type { SectionIntroProps } from "./types";

const SectionIntro = ({
  eyebrow,
  title,
  description,
  align = "start",
  className = "",
  descriptionClassName = "",
}: SectionIntroProps) => {
  const isCentered = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={reveal}
      transition={{ duration: 0.6 }}
      className={`${isCentered ? "text-center" : "text-start"} ${className}`}
    >
      <p className="type-label mb-3 font-bold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="type-section-title font-extrabold text-brand-ink">
        {title}
      </h2>
      <p
        className={`type-body-lg mt-4 text-content-muted ${descriptionClassName}`}
      >
        {description}
      </p>
    </motion.div>
  );
};

export default SectionIntro;
