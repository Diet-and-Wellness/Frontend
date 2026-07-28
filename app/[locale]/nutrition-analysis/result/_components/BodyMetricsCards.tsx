import BMIProgress from "./BmiProgressBar";
import TargetIcon from "@/app/[locale]/components/icons/TargetIcon";
import { healthMetrics } from "@/app/[locale]/utils/healthMetrics";

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
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="bg-white border border-[#EDEDED] p-5 rounded-2xl flex flex-col justify-between">
        <p className="text-[#4F4F4F] text-[14px] font-medium">
          BODY MASS INDEX
        </p>
        <div className="flex gap-2.5 justify-start items-baseline">
          <p className="text-[38px] font-medium">{bmi.bmi}</p>
          <p className="text-[#E99532] text-[16px] font-medium">{bmi.status}</p>
        </div>

        <BMIProgress value={bmi.bmi} />

        <div className="grid grid-cols-2 gap-2.5 my-5">
          <div className="w-full rounded-2xl py-2.5 px-4 flex flex-col gap-1.5 bg-[#EDF4EB]">
            <p className="text-[16px] font-medium">Healthy Range</p>
            <p className="text-[16px] font-medium text-[#4D8E32]">
              {HEALTHY_MIN} — {HEALTHY_MAX} kg/m²
            </p>
          </div>
          <div className="w-full rounded-2xl py-2.5 px-4 flex flex-col gap-1.5 bg-[#FCEFE0]">
            <p className="text-[16px] font-medium">Above normal by</p>
            <p className="text-[16px] font-medium text-[#E99532]">
              {bmi.differenceFromHealthy} kg/m²
            </p>
          </div>
        </div>

        <p className="text-[14px] text-[#4F4F4F]">
          {bmi.status === "Normal"
            ? "You're already within a healthy BMI range. Maintain your current weight by continuing your healthy habits."
            : `${bmi.action} about ${bmi.weightRange?.from} — ${bmi.weightRange?.to} kg can help you reach a healthier BMI`}
        </p>
      </div>

      <div className="bg-white border border-[#EDEDED] p-5 rounded-2xl flex flex-col justify-between gap-2.5">
        <p className="text-[#4F4F4F] text-[14px] font-medium">
          IDEAL WEIGHT RANGE
        </p>
        <div className="flex gap-2.5 justify-start items-baseline">
          <p className="text-[38px] font-medium text-[#4D8E32]">
            {idealWeight.idealWeightRange.min} —{" "}
            {idealWeight.idealWeightRange.max}{" "}
            <span className="text-[#4F4F4F] text-[22px] font-light">kg</span>
          </p>
        </div>

        <div className="flex justify-between items-center py-1.5 px-5 rounded-2xl bg-[#EDF4EB]">
          <div>
            <p>Ideal weight</p>
            <p className="text-[#4D8E32] text-[25px] font-semibold">
              {idealWeight.idealWeight}{" "}
              <span className="text-[16px] font-medium">kg</span>
            </p>
          </div>
          <div className="size-11 rounded-full bg-[#C8DCBF] flex justify-center items-center">
            <TargetIcon />
          </div>
        </div>

        <p className="text-[14px] text-[#4F4F4F]">
          {idealWeight.difference === 0
            ? "You're already at your ideal weight. Focus on maintaining your current healthy habits."
            : `You’re ${idealWeight.difference} kg ${idealWeight.status} your ideal weight — a gentle deficit will help you get there.`}
        </p>
      </div>
    </div>
  );
}
