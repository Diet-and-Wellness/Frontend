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
      {/* scroll container */}
      <motion.div
        className="max-h-[95vh] w-full flex justify-center p-4 overflow-y-auto"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 10 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
      >
        {/* content wrapper (IMPORTANT FIX) */}
        <div className="w-full flex justify-center">
          <div className="w-fit max-w-full">{children}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalWrapper;
