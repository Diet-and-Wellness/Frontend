"use client";

import { AnimatePresence, motion } from "framer-motion";

const FieldError = ({ id, message }: { id: string; message?: string }) => (
  <AnimatePresence initial={false}>
    {message && (
      <motion.p
        id={id}
        role="alert"
        initial={{ opacity: 0, y: -5, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -4, height: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="type-meta flex items-center gap-1.5 text-danger"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="size-4 shrink-0"
        >
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.7" />
          <path d="M10 6.2v4.5M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

export default FieldError;
