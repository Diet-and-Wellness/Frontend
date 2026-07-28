import { motion } from "framer-motion";
import type { MacroResult } from "@/app/[locale]/api/types/assessment.types";
import ProgressBar from "@/app/[locale]/components/Public/ProgressBar";

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
        <p className="text-[36px] font-bold leading-none">{centerValue}</p>
        {centerLabel && <p className="text-[#666] text-xl">{centerLabel}</p>}
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
          <span className="text-[18px] font-medium">{title}</span>
          <span className="text-[16px] text-gray-600">{percentage}%</span>
        </div>
        <ProgressBar score={percentage} bgColor={barBgColor} height={11} />
      </div>
      <div className="min-w-20">
        <p className="text-nowrap text-[16px] font-semibold">{grams} g</p>
        <p className="text-nowrap text-[16px] text-gray-500">{kcal} kcal</p>
      </div>
    </div>
  );
}

export default function MacrosCard({ macros }: { macros: MacroResult }) {
  const segments: Segment[] = [
    { label: "Protein", value: 30, color: "#5B8FF9" },
    { label: "Carbohydrates", value: 55, color: "#4D8E32" },
    { label: "Fat", value: 15, color: "#E99532" },
  ];

  return (
    <div className="w-full py-10 px-15 rounded-2xl border border-[#E1E7EF] flex items-center gap-10">
      <div className="shrink-0">
        <DonutChart
          size={180}
          centerValue={macros.calories}
          centerLabel="kcal"
          segments={segments}
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <MacroDetailsBar
          title="Protein"
          percentage={30}
          grams={macros.protein.grams}
          kcal={macros.protein.calories}
          barBgColor="#5B8FF9"
        />
        <MacroDetailsBar
          title="Carbohydrates"
          percentage={55}
          grams={macros.carbs.grams}
          kcal={macros.carbs.calories}
          barBgColor="#4D8E32"
        />
        <MacroDetailsBar
          title="Fat"
          percentage={15}
          grams={macros.fat.grams}
          kcal={macros.fat.calories}
          barBgColor="#E99532"
        />
      </div>
    </div>
  );
}
