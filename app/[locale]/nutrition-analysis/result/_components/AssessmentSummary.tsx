import { GrainGradient } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("analysis");
  return (
    <div className="mx-auto w-[calc(100%-2rem)] max-w-260 overflow-hidden rounded-3xl sm:w-[calc(100%-2.5rem)] sm:rounded-4xl">
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
        <div className="flex w-full flex-col items-center justify-center gap-2.5 bg-white/40 p-6 text-center backdrop-blur-xs sm:p-8 md:p-12">
          <h3 className="type-display font-bold">{t("summaryTitle")}</h3>
          <p className="type-body-lg text-[#4F4F4F]">
            {t("summarySubtitle")}
          </p>

          <div className="relative mt-5 flex h-45 w-45 items-center justify-center sm:h-55 sm:w-55">
            <motion.svg
              viewBox="0 0 220 220"
              aria-hidden="true"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              width="220"
              height="220"
              className="size-full rounded-full bg-white shadow-xs"
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
                strokeDasharray={`${circumference} ${circumference}`}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeOut" }}
                transform="rotate(-90 110 110)"
              />
            </motion.svg>
            <p className="absolute text-3xl font-bold sm:text-[38px]">
              {percentage}%
            </p>
          </div>

          <div
            className="mt-2.5 px-5 py-2 rounded-full flex items-center gap-2"
            style={{ backgroundColor: status.bgColor }}
          >
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: status.color }}
            />
            <p className="type-label font-semibold" style={{ color: status.color }}>
              {status.label}
            </p>
          </div>

          <p className="type-body mt-5 text-center text-[#4F4F4F] sm:px-12 md:px-30">
            {status.description}
          </p>
        </div>
      </GrainGradient>
    </div>
  );
}
