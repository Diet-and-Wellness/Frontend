import { AnimatePresence, motion } from "framer-motion";
import type { CalorieCalculatorResult, MacroResult } from "@/app/[locale]/api/types/assessment.types";
import CaloriesCard from "@/app/[locale]/components/Public/CaloriesCard";
import MacrosCard from "./MacrosCard";
import { useTranslations } from "next-intl";

export type MacroGoal = "maintenance" | "fatloss" | "musclegain";

type CalorieTargetsProps = {
  calories: CalorieCalculatorResult | null;
  macros: MacroResult | null;
  activeGoal: MacroGoal;
  onGoalChange: (goal: MacroGoal) => void;
};

const goalByCardType = {
  maintenance: "maintenance",
  loss: "fatloss",
  gain: "musclegain",
} as const;

export default function CalorieTargets({
  calories,
  macros,
  activeGoal,
  onGoalChange,
}: CalorieTargetsProps) {
  const t = useTranslations("analysis");
  const cards = [
    { type: "maintenance", calories: calories?.maintenanceCalories ?? 0 },
    { type: "loss", calories: calories?.fatLossCalories ?? 0 },
    { type: "gain", calories: calories?.muscleGainCalories ?? 0 },
  ] as const;

  return (
    <div className="flex flex-col gap-6 sm:gap-7.5">
      <div>
        <p className="type-card-title mb-1.5 font-bold">{t("dailyCalorieTargets")}</p>
        <p className="type-body text-content-muted">{t("chooseGoal")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-10">
        {cards.map((card) => {
          const goal = goalByCardType[card.type];

          return (
            <motion.div
              key={card.type}
              layout
              whileTap={{ scale: 0.98 }}
              animate={{ scale: activeGoal === goal ? 1.02 : 1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <CaloriesCard
                type={card.type}
                calories={card.calories}
                clickable
                isActive={activeGoal === goal}
                onClick={() => onGoalChange(goal)}
              />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {macros && (
          <motion.div
            key={activeGoal}
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <MacrosCard macros={macros} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
