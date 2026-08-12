"use client";

import { AnimatePresence, motion } from "framer-motion";

const FormAlert = ({ message }: { message?: string | null }) => (
  <AnimatePresence initial={false}>
    {message && (
      <motion.div
        role="alert"
        aria-live="assertive"
        initial={{ opacity: 0, y: -8, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -6, height: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-start gap-3 overflow-hidden rounded-xl border border-danger/25 bg-danger-soft px-4 py-3 text-danger"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="mt-0.5 size-5 shrink-0">
          <path d="M12 3 2.8 20h18.4L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 9v4.5M12 17h.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
        <p className="type-label font-medium">{message}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default FormAlert;
