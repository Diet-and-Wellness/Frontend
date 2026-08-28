import { useTranslations } from "next-intl";
import CTA from "../CTAFreeToolsResult";
import { motion } from "framer-motion";
import ToolModalHeader from "../ToolModalHeader";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useRouter } from "next/navigation";
import { useMe } from "@/app/[locale]/hooks/useMe";

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

interface HealthyWeightResult {
  healthyWeight: number;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  difference: number;
  action: "Gaining" | "Losing" | "Maintaining";
  status: "above" | "below" | "healthy";
}

const HealthyWeightResultModal = ({
  ibwResult,
  tryAgainHandler,
}: {
  ibwResult: HealthyWeightResult | null;
  tryAgainHandler: () => void;
}) => {
  const t = useTranslations("calculators");
  
  const status = ibwResult?.status ?? "healthy";
  const action = ibwResult?.action ?? "Maintaining";

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
        className="flex max-h-[85dvh] min-h-0 flex-col overflow-hidden rounded-2xl bg-surface border border-line"
      >
        <ToolModalHeader toolName={t("healthyWeightTitle")} />

        <div className="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
          <p className="type-body text-content-muted font-medium">
            {t("healthyWeightRange")}
          </p>

          <p className="text-3xl font-semibold text-brand sm:text-4xl">
            {ibwResult?.healthyWeightRange.min} -{" "}
            {ibwResult?.healthyWeightRange.max} {t("kg")}
          </p>

          <div className="w-full bg-brand-soft px-7.5 py-4 rounded-2xl border border-brand flex flex-col justify-center items-center gap-1.5">
            <p className="type-card-title font-medium">{t("healthyWeight")}</p>
            <p className="type-card-title font-bold text-brand">
              {ibwResult?.healthyWeight} <span>{t("kg")}</span>
            </p>
          </div>

          <div className="mb-5 w-full bg-accent-softer p-4 md:px-7.5 rounded-2xl border border-accent flex flex-col justify-center items-center gap-1.5">
            <p className="type-body font-medium text-brand">
              {t("healthyWeightDifference", {
                difference: ibwResult?.difference ?? 0,
                position: t(`weightPosition.${status}`),
              })}
            </p>
            <p className="type-label font-medium text-content-muted">
              {t("healthyWeightRecommendation", {
                action: t(`weightAction.${action}`),
                difference: ibwResult?.difference ?? 0,
              })}
            </p>
          </div>
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

export default HealthyWeightResultModal;
