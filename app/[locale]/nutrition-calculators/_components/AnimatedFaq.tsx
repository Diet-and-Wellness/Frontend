"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ChevronIcon } from "./CalculatorContentIcons";

type Faq = {
  question: string;
  answer: string;
};

export default function AnimatedFaq({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const triggerId = `faq-trigger-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={faq.question}
            className="border-b border-line bg-surface-raised last:border-b-0"
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-start transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand sm:px-5"
              >
                <span className="type-body flex-1 font-semibold text-content">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-brand transition-colors group-hover:border-brand/40 group-hover:bg-brand-soft"
                  aria-hidden="true"
                >
                  <ChevronIcon className="size-4" />
                </motion.span>
              </button>
            </h3>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{
                height: { duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: reduceMotion ? 0 : 0.2 },
              }}
              className="overflow-hidden"
            >
              <p className="max-w-4xl px-4 pb-5 pe-14 type-body text-content-muted sm:px-5 sm:pe-16">
                {faq.answer}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
