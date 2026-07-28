import { GrainGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

export type AssessmentStatus = {
  label: string;
  color: string;
  bgColor: string;
  description: string;
};

type AssessmentSummaryProps = {
  percentage: number;
  circumference: number;
  offset: number;
  status: AssessmentStatus;
};

export default function AssessmentSummary({
  percentage,
  circumference,
  offset,
  status,
}: AssessmentSummaryProps) {
  return (
    <div className="rounded-4xl overflow-auto max-w-260 mx-auto">
      <GrainGradient
        width="100%"
        height="100%"
        colors={["#f7a969", "#ffbc85"]}
        colorBack="#98E694"
        softness={0.7}
        intensity={0.6}
        noise={0}
        speed={5}
        className="flex justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center gap-2.5 p-12 bg-white/40 backdrop-blur-xs w-full">
          <h3 className="text-[48px] font-bold">Your Nutrition Assessment</h3>
          <p className="text-[#4F4F4F] text-[25px]">
            Summary & personalized insights
          </p>

          <div className="flex justify-center items-center mt-5">
            <p className="text-[38px] font-bold absolute">{percentage}%</p>
            <motion.svg
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              width="220"
              height="220"
              className="rounded-full bg-white shadow-xs"
            >
              <circle
                cx="110"
                cy="110"
                r="90"
                stroke="#ECECEC"
                strokeWidth="14"
                fill="none"
              />
              <motion.circle
                cx="110"
                cy="110"
                r="90"
                stroke={status.color}
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeOut" }}
                transform="rotate(-90 110 110)"
              />
            </motion.svg>
          </div>

          <div
            className="mt-2.5 px-5 py-2 rounded-full flex items-center gap-2"
            style={{ backgroundColor: status.bgColor }}
          >
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: status.color }}
            />
            <p className="text-[16px] font-semibold" style={{ color: status.color }}>
              {status.label}
            </p>
          </div>

          <p className="text-[#4F4F4F] text-[20px] px-30 text-center mt-5">
            {status.description}
          </p>
        </div>
      </GrainGradient>
    </div>
  );
}
