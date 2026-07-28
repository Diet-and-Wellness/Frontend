import { motion } from "framer-motion";

const ProgressBar = ({
  score,
  bgColor,
  height = 8,
}: {
  score: number;
  bgColor: string;
  height?: number;
}) => {
  return (
    <div
      className="rounded-full bg-[#EEF2F7] overflow-hidden"
      style={{ height: height }}
    >
      <motion.div
        initial={{
          width: 0,
        }}
        whileInView={{
          width: `${score}%`,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.9,
        }}
        className="h-full rounded-full"
        style={{
          background: bgColor,
        }}
      />
    </div>
  );
};

export default ProgressBar;
