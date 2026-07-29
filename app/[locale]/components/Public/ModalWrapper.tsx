"use client";

import { motion } from "framer-motion";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="h-dvh w-full overflow-y-auto overscroll-contain touch-pan-y">
        <motion.div
          className="flex min-h-full w-full items-center justify-center px-[4vw] py-3 sm:p-4"
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
          }}
        >
          <div className="flex min-h-0 max-h-[calc(100dvh-1.5rem)] w-full max-w-full justify-center overflow-y-auto overscroll-contain">
            <div className="flex w-full max-w-full justify-center">{children}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModalWrapper;
