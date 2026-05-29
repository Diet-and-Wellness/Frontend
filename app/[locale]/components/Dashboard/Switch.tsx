"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Switch = () => {
  const [active, setActive] = useState(false);

  return (
    <motion.button
      onClick={() => setActive((p) => !p)}
      animate={{
        backgroundColor: active ? "#DC2626" : "#A4A4A4",
      }}
      transition={{ duration: 0.4 }}
      className="flex w-12 cursor-pointer rounded-full p-1"
    >
      <motion.div
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
