"use client";

import ClockIcon from "@/app/[locale]/components/icons/ClockIcon";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const AssessmentProgress = ({
  lastAnsweredSectionIndex,
  total,
}: {
  lastAnsweredSectionIndex: number;
  total: number;
}) => {
  const t = useTranslations();
  const progress = Math.ceil((lastAnsweredSectionIndex / total) * 100);
  const completed = progress === 100;

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-2 bg-white py-4 sm:py-5">
      <p className="type-label font-medium text-[#4F4F4F]">
        {t("analysis.progress")}
      </p>

      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium text-[#4D8E32] sm:text-3xl lg:text-[36px]">{progress}%</p>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <p className="type-meta font-medium text-[#4F4F4F]">
            {t("analysis.minutes", { count: 15 })}
          </p>
        </div>
      </div>

      <div className="w-full rounded-full overflow-hidden bg-[#EDEDED]">
        <div className="absolute rounded-full w-full h-3 flex justify-evenly items-center">
          {Array.from({ length: total - 1 }).map((_, index) => (
            <div key={index} className="size-1 bg-white rounded-full" />
          ))}
        </div>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`${completed ? "bg-[#4D8E32]" : "bg-[#E99532]"} p-1.5 rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default AssessmentProgress;
