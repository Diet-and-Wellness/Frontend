import CTA from "@/app/[locale]/nutrition-calculators/_components/CTAFreeToolsResult";
import ToolModalHeader from "@/app/[locale]/nutrition-calculators/_components/ToolModalHeader";
import { CalorieCalculatorResult } from "@/app/[locale]/api/types/assessment.types";
import BarsIcon from "@/app/[locale]/components/icons/BarsIcon";
import CaloriesCard from "@/app/[locale]/components/Public/CaloriesCard";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const pageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: 90,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 90,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
} as const;

const DailyCaloriesResultModal = ({
  calcalResult,
  tryAgainHandler,
}: {
  calcalResult: CalorieCalculatorResult | null;
  tryAgainHandler: () => void;
}) => {
  const t = useTranslations("calculators");

  const router = useRouter();

  const { data: me } = useMe();

  const getFullAssessment = () => {
    if (!me) {
      router.push("/signin");
      return;
    }

    if (me.role !== "customer") {
      return;
    }

    router.push("/nutrition-analysis/");
    return;
  };

  return (
    <ModalWrapper>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex max-h-[85dvh] w-[min(100%,62.5rem)] flex-col overflow-hidden rounded-2xl bg-surface border border-line"
      >
        <ToolModalHeader toolName={t("calorieTitle")} />

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
          <div className="flex justify-center items-center gap-5">
            <div className="p-2.5 bg-(--color-palette-f2f7f0) rounded-full flex justify-center items-center">
              <BarsIcon />
            </div>
            <p className="type-card-title text-center font-medium text-brand-dark">
              {t("dailyCalorieNeeds")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <CaloriesCard
              type="maintenance"
              calories={calcalResult?.maintenanceCalories ?? 0}
            />
            <CaloriesCard
              type="loss"
              calories={calcalResult?.fatLossCalories ?? 0}
            />
            <CaloriesCard
              type="gain"
              calories={calcalResult?.muscleGainCalories ?? 0}
            />
          </div>

          <p className="type-label rounded-xl bg-brand-softer px-5 py-3 text-center font-medium text-content-muted">
            {t("estimatedValues")}
          </p>
        </div>

        <div className="shrink-0 border-t border-line bg-surface p-5 sm:px-7.5">
          <CTA
            tryAgainHanlder={tryAgainHandler}
            getFullAssessment={getFullAssessment}
          />
        </div>
      </motion.div>
    </ModalWrapper>
  );
};

export default DailyCaloriesResultModal;
