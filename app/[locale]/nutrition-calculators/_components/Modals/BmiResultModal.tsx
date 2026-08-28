import CTA from "@/app/[locale]/nutrition-calculators/_components/CTAFreeToolsResult";
import ToolModalHeader from "@/app/[locale]/nutrition-calculators/_components/ToolModalHeader";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { visualColors } from "@/app/[locale]/styles/colors";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import ReactSpeedometer from "react-d3-speedometer";

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

type BMIStatus = "Underweight" | "Normal" | "Overweight" | "Obesity";

interface BMIResult {
  bmi: number;
  status: BMIStatus;
  differenceFromHealthy: number;

  weightRange: {
    from: number;
    to: number;
  } | null;

  direction: "above" | "below" | "healthy";
  action: "Losing" | "Gaining" | "Maintaining";
}

const HEALTHY_MIN = 18.5;
const HEALTHY_MAX = 24.9;

const BmiResultModal = ({
  bmiResult,
  tryAgainHandler,
}: {
  bmiResult: BMIResult | null;
  tryAgainHandler: () => void;
}) => {
  const t = useTranslations("calculators");

  const direction = bmiResult?.direction ?? "healthy";
  const action = bmiResult?.action ?? "Maintaining";

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
        className="flex max-h-[85dvh] w-[min(100%,35rem)] min-h-0 flex-col overflow-hidden rounded-2xl bg-surface border border-line"
      >
        <ToolModalHeader toolName={t("bmiTitle")} />

        <div className="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="type-card-title font-medium">{t("bmiScore")}</p>
            <p className="text-3xl font-bold text-brand sm:text-4xl">
              {bmiResult?.bmi}
            </p>
            <p
              className={`type-card-title ${bmiResult?.status === "Normal" ? "text-(--color-palette-337516)" : "text-accent"} font-medium`}
            >
              {t(`bmiStatus.${bmiResult?.status ?? "Normal"}`)}
            </p>
          </div>

          <ReactSpeedometer
            value={bmiResult ? Math.min(bmiResult.bmi, 40) : 10}
            minValue={10}
            maxValue={40}
            segments={4}
            customSegmentStops={[10, 18.5, 25, 30, 40]}
            segmentColors={[
              visualColors.bmiLow,
              visualColors.bmiNormal,
              visualColors.bmiHigh,
              visualColors.bmiVeryHigh,
            ]}
            needleColor={visualColors.gaugeNeedle}
            needleHeightRatio={0.6}
            currentValueText=""
            textColor={visualColors.gaugeText}
            ringWidth={30}
            width={300}
            height={180}
            valueTextFontSize="0px"
          />

          <div className="w-full rounded-2xl border border-brand px-7.5 py-3 flex flex-col justify-center items-center gap-1.5 bg-brand-soft">
            <p className="type-label font-medium">{t("healthyBmiRange")}</p>
            <p className="type-card-title font-semibold text-brand">
              {HEALTHY_MIN} - {HEALTHY_MAX}{" "}
              <span className="type-label font-medium text-content-strong">
                kg/m²
              </span>
            </p>
          </div>

          {bmiResult?.status === "Normal" || (
            <div className="w-full rounded-2xl border border-accent p-4 md:px-7.5 flex flex-col justify-center items-center gap-1.5 bg-accent-softer">
              <p className="type-label font-medium">
                {t("bmiDifference", {
                  difference: bmiResult?.differenceFromHealthy ?? 0,
                  position: t(`weightPosition.${direction}`),
                })}
              </p>
              <p className="type-label text-content-strong">
                {t("bmiRecommendation", {
                  action: t(`weightAction.${action}`),
                  from: bmiResult?.weightRange?.from ?? "",
                  to: bmiResult?.weightRange?.to ?? "",
                })}
              </p>
            </div>
          )}
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

export default BmiResultModal;
