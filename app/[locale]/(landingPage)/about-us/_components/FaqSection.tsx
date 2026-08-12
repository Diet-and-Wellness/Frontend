"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionIntro from "./SectionIntro";
import type { Faq } from "./types";

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  faqs: Faq[];
};

const FaqSection = ({
  eyebrow,
  title,
  description,
  faqs,
}: FaqSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto mt-20 grid w-[90%] max-w-7xl gap-10 sm:mt-28 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        description={description}
        descriptionClassName="max-w-md"
      />

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;
          const triggerId = `faq-trigger-${index}`;

          return (
            <motion.div
              layout
              key={faq.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={`overflow-hidden rounded-2xl border bg-surface-raised px-5 transition-[border-color,box-shadow] duration-300 sm:px-6 ${
                isOpen
                  ? "border-brand/35 shadow-[0_14px_38px_rgba(35,64,22,0.08)]"
                  : "border-line"
              }`}
            >
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() =>
                  setOpenIndex((current) =>
                    current === index ? null : index,
                  )
                }
                className="type-body-lg flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-start font-semibold text-content-strong"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span className="absolute h-3.5 w-0.5 rounded-full bg-current" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={answerId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.36,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: 0.22, ease: "easeOut" },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -8 }}
                      animate={{ y: 0 }}
                      exit={{ y: -6 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="type-body max-w-2xl pb-5 pe-10 text-content-muted"
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
