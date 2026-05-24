"use client";

import { motion } from "framer-motion";

const StatArrow = ({
  className = "",
  strokeWidth = "1.667",
}: {
  className?: string;
  strokeWidth?: string;
}) => {
  return (
    <span className={className}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
      >
        <motion.path
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="m22 7-8.5 8.5-5-5L2 17"
        />

        <motion.path
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeInOut",
          }}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M16 7h6v6"
        />
      </motion.svg>
    </span>
  );
};

export default StatArrow;
