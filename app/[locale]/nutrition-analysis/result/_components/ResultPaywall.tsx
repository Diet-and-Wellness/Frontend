import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import LockerIcon from "@/app/[locale]/components/icons/LockerIcon";
import SparklesIcon from "@/app/[locale]/components/icons/Sparkles";
import { useTranslations } from "next-intl";

export function PersonalizedInsightCard() {
  const t = useTranslations("analysis");
  return (
    <div className="relative overflow-hidden rounded-3xl bg-(--color-palette-4e9636) p-5 text-white sm:rounded-[48px] sm:p-7.5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-s-0 bottom-0 size-80 rounded-full bg-(--color-palette-2d6120) blur-[120px] opacity-70" />
        <div className="absolute inset-e-1/4 top-0 w-[320px] h-80 rounded-full bg-(--color-palette-7bc85a) blur-[120px] opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-surface-raised/15 flex items-center justify-center">
            <SparklesIcon />
          </div>
          <h2 className="type-card-title font-bold">{t("personalizedInsight")}</h2>
        </div>

        <p className="type-body w-full text-white/95">
          {t("personalizedInsightText")}
        </p>

        <button className="type-control place-self-start w-full rounded-full bg-surface-raised px-6 py-3 font-semibold text-brand cursor-pointer sm:w-auto sm:px-15">
          {t("bookSpecialist")}
        </button>
      </div>
    </div>
  );
}

export function PayToAccessCard() {
  return (
    <div className="bg-surface p-7.5 rounded-3xl max-w-110 shadow-xs sticky top-1/4 mt-40 place-self-center flex flex-col justify-between items-center gap-4">
      <div className="flex justify-end absolute inset-e-4 top-4">
        <button
          onClick={() => {}}
          className="hover:bg-surface-neutral transition-colors duration-200 justify-end place-self-end p-3 rounded-full cursor-pointer"
        >
          <CloseIcon className="text-content-muted" height="16" width="16" />
        </button>
      </div>
      <div className="size-16 bg-accent-softer flex justify-center items-center rounded-full">
        <LockerIcon />
      </div>
      <p className="type-card-title font-semibold">Unlock Your Full Request</p>
      <p className="type-body text-center text-content-muted">
        Get detailed recommendations, results and personalized insights.
      </p>
      <button
        onClick={() => {}}
        className="type-control mt-2.5 min-h-12 w-full rounded-full border border-line bg-accent font-semibold text-surface-raised cursor-pointer"
      >
        Unlock For 25 EGP
      </button>
    </div>
  );
}
