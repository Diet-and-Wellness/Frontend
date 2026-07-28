"use client";

import { motion } from "framer-motion";

interface BMIProgressProps {
  value: number;
  min?: number;
  max?: number;
}

const BMIProgress = ({ value, min = 10, max = 40 }: BMIProgressProps) => {
  const clampedValue = Math.max(min, Math.min(value, max));
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-8 flex items-center">
        <div
          className="w-full h-3 rounded-full"
          style={{
            background:
              "linear-gradient(90deg,#ff5b4d 0%,#f7a34b 30%,#eef35a 50%,#9dd56f 75%,#49c38c 100%)",
          }}
        />

        <motion.div
          initial={{ left: 0 }}
          animate={{
            left: `calc(${percentage}% - 5px)`,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-7.5 rounded-full bg-black shadow-lg"
        />
      </div>
    </div>
  );
};

export default BMIProgress;
