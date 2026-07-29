import { motion } from "framer-motion";
import type { MacroResult } from "@/app/[locale]/api/types/assessment.types";
import ProgressBar from "@/app/[locale]/components/Public/ProgressBar";
import { useTranslations } from "next-intl";

type Segment = {
  label: string;
  value: number;
  color: string;
};

type DonutChartProps = {
  size?: number;
  strokeWidth?: number;
  centerValue: number | string;
  centerLabel?: string;
  segments: Segment[];
};

function DonutChart({
  size = 180,
  strokeWidth = 22,
  centerValue,
  centerLabel,
  segments,
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((segment, index) => {
            const previousValue = segments
              .slice(0, index)
              .reduce((sum, current) => sum + current.value, 0);
            const length = (segment.value / 100) * circumference;
            const dashOffset = -((previousValue / 100) * circumference);

            return (
              <motion.circle
                key={segment.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${length} ${circumference}`}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            );
          })}
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold leading-none sm:text-3xl lg:text-[36px]">{centerValue}</p>
        {centerLabel && <p className="type-label text-[#666]">{centerLabel}</p>}
      </div>
    </div>
  );
}

type MacroDetailsBarProps = {
  title: string;
  percentage: number;
  grams: number;
  kcal: number;
  barBgColor: string;
};

function MacroDetailsBar({
  title,
  percentage,
  grams,
  kcal,
  barBgColor,
}: MacroDetailsBarProps) {
  return (
    <div className="flex items-center justify-between gap-7.5">
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-5">
          <span className="type-label font-medium">{title}</span>
          <span className="type-label text-gray-600">{percentage}%</span>
        </div>
        <ProgressBar score={percentage} bgColor={barBgColor} height={11} />
      </div>
      <div className="min-w-20">
        <p className="type-label text-nowrap font-semibold">{grams} g</p>
        <p className="type-label text-nowrap text-gray-500">{kcal} kcal</p>
      </div>
    </div>
  );
}

export default function MacrosCard({ macros }: { macros: MacroResult }) {
  const t = useTranslations("analysis");
  const segments: Segment[] = [
    { label: t("protein"), value: 30, color: "#5B8FF9" },
    { label: t("carbohydrates"), value: 55, color: "#4D8E32" },
    { label: t("fat"), value: 15, color: "#E99532" },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-2xl border border-[#E1E7EF] px-5 py-6 sm:px-7.5 sm:py-8 md:flex-row md:gap-10 md:px-15 md:py-10">
      <div className="shrink-0">
        <DonutChart
          size={180}
          centerValue={macros.calories}
          centerLabel="kcal"
          segments={segments}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4 self-stretch">
        <MacroDetailsBar
          title={t("protein")}
          percentage={30}
          grams={macros.protein.grams}
          kcal={macros.protein.calories}
          barBgColor="#5B8FF9"
        />
        <MacroDetailsBar
          title={t("carbohydrates")}
          percentage={55}
          grams={macros.carbs.grams}
          kcal={macros.carbs.calories}
          barBgColor="#4D8E32"
        />
        <MacroDetailsBar
          title={t("fat")}
          percentage={15}
          grams={macros.fat.grams}
          kcal={macros.fat.calories}
          barBgColor="#E99532"
        />
      </div>
    </div>
  );
}
