"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLocale } from "next-intl";

const Switch = ({
  isOn,
  activate,
  deactivate,
  activeBgColor,
  deactiveBgColor,
}: {
  isOn: boolean;
  activate: () => void;
  deactivate: () => void;
  activeBgColor?: string;
  deactiveBgColor?: string;
}) => {
  const locale = useLocale();
  const [active, setActive] = useState(isOn);

  const toggle = () => {
    if (active) {
      setActive(false);
      deactivate();
    } else {
      setActive(true);
      activate();
    }
  };

  const bgColorActive = activeBgColor ? activeBgColor : "var(--color-palette-e99532)";
  const bgColorDeactive = deactiveBgColor ? deactiveBgColor : "var(--color-palette-a4a4a4)";

  return (
    <motion.button
      initial={false}
      onClick={toggle}
      animate={{
        backgroundColor: active ? bgColorActive : bgColorDeactive,
      }}
      transition={{ duration: 0.4 }}
      className="flex w-12 cursor-pointer rounded-full p-1"
    >
      <motion.div
        initial={false}
        animate={{
          x: active ? (locale === "ar" ? -20 : 20) : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
        className="size-5 rounded-full bg-surface-raised"
      />
    </motion.button>
  );
};

export default Switch;
