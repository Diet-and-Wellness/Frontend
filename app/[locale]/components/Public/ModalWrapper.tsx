"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const [viewport, setViewport] = useState({
    height: "100dvh",
    top: "0px",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      const visualViewport = window.visualViewport;

      setViewport({
        height: `${visualViewport?.height ?? window.innerHeight}px`,
        top: `${visualViewport?.offsetTop ?? 0}px`,
      });
    };

    updateViewport();

    window.visualViewport?.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const isEditableField = (element: EventTarget | null) =>
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement;

  const keepFocusedFieldVisible = (event: React.FocusEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!isEditableField(target)) {
      return;
    }

    setIsEditing(true);

    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 250);
  };

  const resetEditingState = () => {
    window.setTimeout(() => setIsEditing(isEditableField(document.activeElement)), 0);
  };

  return (
    <motion.div
      className={`fixed inset-x-0 z-50 flex justify-center bg-black/40 backdrop-blur-xs ${
        isEditing ? "items-start" : "items-center"
      }`}
      style={viewport}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="h-full w-full overflow-y-auto overscroll-contain touch-pan-y">
        <motion.div
          className={`flex min-h-full w-full justify-center px-[4vw] py-3 sm:p-4 ${
            isEditing ? "items-start" : "items-center"
          }`}
          onFocusCapture={keepFocusedFieldVisible}
          onBlurCapture={resetEditingState}
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 10 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
          }}
        >
          <div className="flex min-h-0 max-h-[calc(100%-1.5rem)] w-full max-w-full justify-center overflow-y-auto overscroll-contain">
            <div className="flex w-full max-w-full justify-center">{children}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModalWrapper;
