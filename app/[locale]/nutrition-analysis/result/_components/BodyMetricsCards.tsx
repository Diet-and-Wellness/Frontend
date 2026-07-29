import BMIProgress from "./BmiProgressBar";
import TargetIcon from "@/app/[locale]/components/icons/TargetIcon";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";
import { useTranslations } from "next-intl";

const HEALTHY_MIN = 18.5;
const HEALTHY_MAX = 24.9;

type BodyMetricsCardsProps = {
  bmi: ReturnType<typeof healthMetrics.calculateBMI>;
  idealWeight: ReturnType<typeof healthMetrics.calculateIdealWeightResult>;
};

export default function BodyMetricsCards({
  bmi,
  idealWeight,
}: BodyMetricsCardsProps) {
  const t = useTranslations("analysis");
  const calculatorT = useTranslations("calculators");
  const bmiDifferenceLabel = calculatorT(
    {
      above: "aboveNormalBy",
      below: "belowNormalBy",
      healthy: "withinHealthyRange",
    }[bmi.direction],
  );
  const bmiAction = calculatorT(`weightAction.${bmi.action}`);
  const idealWeightStatus = calculatorT(`weightPosition.${idealWeight.status}`);
  const idealWeightAction = calculatorT(`weightAction.${idealWeight.action}`);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7.5 lg:gap-10">
      <div className="bg-white border border-[#EDEDED] p-5 rounded-2xl flex flex-col justify-between">
        <p className="type-meta font-medium text-[#4F4F4F]">
          {t("bodyMassIndex")}
        </p>
        <div className="flex gap-2.5 justify-start items-baseline">
          <p className="text-2xl font-medium sm:text-3xl lg:text-[38px]">{bmi.bmi}</p>
          <p className="type-label font-medium text-[#E99532]">{calculatorT(`bmiStatus.${bmi.status}`)}</p>
        </div>

        <BMIProgress value={bmi.bmi} />

        <div className="my-5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          <div className="w-full rounded-2xl py-2.5 px-4 flex flex-col gap-1.5 bg-[#EDF4EB]">
            <p className="type-label font-medium">{t("healthyRange")}</p>
            <p className="type-label font-medium text-[#4D8E32]">
              {HEALTHY_MIN} — {HEALTHY_MAX} kg/m²
            </p>
          </div>
          <div className="w-full rounded-2xl py-2.5 px-4 flex flex-col gap-1.5 bg-[#FCEFE0]">
            <p className="type-label font-medium">{bmiDifferenceLabel}</p>
            <p className="type-label font-medium text-[#E99532]">
              {bmi.differenceFromHealthy} kg/m²
            </p>
          </div>
        </div>

        <p className="type-meta text-[#4F4F4F]">
          {bmi.status === "Normal"
            ? t("healthyBmiMessage")
            : t("reachHealthyBmi", {
                action: bmiAction,
                from: bmi.weightRange?.from ?? "",
                to: bmi.weightRange?.to ?? "",
              })}
        </p>
      </div>

      <div className="bg-white border border-[#EDEDED] p-5 rounded-2xl flex flex-col justify-between gap-2.5">
        <p className="type-meta font-medium text-[#4F4F4F]">
          {t("idealWeightRange")}
        </p>
        <div className="flex gap-2.5 justify-start items-baseline">
          <p className="text-2xl font-medium text-[#4D8E32] sm:text-3xl lg:text-[38px]">
            {idealWeight.idealWeightRange.min} —{" "}
            {idealWeight.idealWeightRange.max}{" "}
            <span className="type-card-title font-light text-[#4F4F4F]">kg</span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#EDF4EB] px-4 py-2.5 sm:px-5 sm:py-1.5">
          <div>
            <p>{t("idealWeight")}</p>
            <p className="text-xl font-semibold text-[#4D8E32] sm:text-2xl lg:text-[25px]">
              {idealWeight.idealWeight}{" "}
              <span className="type-label font-medium">kg</span>
            </p>
          </div>
          <div className="size-11 rounded-full bg-[#C8DCBF] flex justify-center items-center">
            <TargetIcon />
          </div>
        </div>

        <p className="type-meta text-[#4F4F4F]">
          {idealWeight.difference === 0
            ? t("idealWeightMessage")
            : t("idealWeightDifference", {
                difference: idealWeight.difference,
                status: idealWeightStatus,
                action: idealWeightAction,
              })}
        </p>
      </div>
    </div>
  );
}
