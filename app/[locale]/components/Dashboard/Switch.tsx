"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Switch = ({
  isOn,
  activate,
  deactivate,
}: {
  isOn: boolean;
  activate: () => void;
  deactivate: () => void;
}) => {
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

  return (
    <motion.button
      initial={false}
      onClick={toggle}
      animate={{
        backgroundColor: active ? "#E99532" : "#A4A4A4",
      }}
      transition={{ duration: 0.4 }}
      className="flex w-12 cursor-pointer rounded-full p-1"
    >
      <motion.div
        initial={false}
        animate={{
          x: active ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
        className="size-5 rounded-full bg-white"
      />
    </motion.button>
  );
};

export default Switch;
