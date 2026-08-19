import LockerIcon from "@/app/[locale]/components/icons/LockerIcon";
import { NutritionInsightIcon } from "@/app/[locale]/components/icons/NutritionInsightIcon";
import { CloseBtn } from "@/app/[locale]/components/Public/CloseBtn";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function PersonalizedInsightCard() {
  const t = useTranslations("analysis");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-(--color-palette-4e9636) p-5 text-white sm:rounded-[48px] sm:p-7.5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-s-0 bottom-0 size-80 rounded-full bg-(--color-palette-2d6120) opacity-70 blur-[120px]" />
        <div className="absolute inset-e-1/4 top-0 h-80 w-[320px] rounded-full bg-(--color-palette-7bc85a) opacity-20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-surface-raised/15">
            <NutritionInsightIcon />
          </div>

          <h2 className="type-card-title font-bold">
            {t("personalizedInsight")}
          </h2>
        </div>

        <p className="type-body w-full text-white/95">
          {t("personalizedInsightText")}
        </p>

        <Link
          href={"/pricing"}
          className="type-control w-full cursor-pointer place-self-start rounded-full bg-surface-raised px-6 py-3 font-semibold text-brand sm:w-auto sm:px-15"
        >
          {t("bookSpecialist")}
        </Link>
      </div>
    </div>
  );
}

export function PayToAccessCard({
  onClickPay,
  onClose,
  loading,
}: {
  onClickPay: () => void;
  onClose: () => void;
  loading: boolean;
}) {
  const t = useTranslations("analysis.paywall");

  return (
    <div className="sticky top-1/4 mt-40 flex max-w-100 w-[92.5%] flex-col items-center justify-between gap-4 place-self-center rounded-3xl bg-surface p-7.5 shadow-xs border border-line">
      <div className="absolute inset-e-4 top-4 flex justify-end">
        <CloseBtn onClose={onClose} />
      </div>

      <div className="flex size-16 items-center justify-center rounded-full bg-accent-softer">
        <LockerIcon />
      </div>

      <p className="type-card-title text-center font-semibold text-content">
        {t("title")}
      </p>

      <p className="type-body text-center text-content-muted">
        {t("description")}
      </p>

      <button
        disabled={loading}
        onClick={onClickPay}
        className="type-control mt-2.5 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border border-line bg-accent font-semibold text-accent-contrast"
      >
        {loading ? (
          <Spinner spinnerSize={26} />
        ) : (
          <span>{t("unlockButton", { price: 25 })}</span>
        )}
      </button>
    </div>
  );
}
