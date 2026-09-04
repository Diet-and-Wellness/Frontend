import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const RetestCTA = () => {
  const t = useTranslations("analysis");
  const locale = useLocale();
  const router = useRouter();

  const startRetest = () => {
    router.push(`/${locale}/nutrition-analysis/assessment?retest=true`);
  };

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-line bg-surface-raised p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7.5">
      <div className="space-y-1.5">
        <h2 className="type-card-title font-bold text-content">
          {t("retestTitle")}
        </h2>
        <p className="type-body text-content-muted max-w-lg">
          {t("retestDescription")}
        </p>
      </div>

      <button
        type="button"
        onClick={startRetest}
        className="type-control shrink-0 cursor-pointer rounded-full bg-accent px-6 py-3 font-semibold text-accent-contrast transition-opacity hover:opacity-90 sm:px-8"
      >
        {t("retestButton")}
      </button>
    </section>
  );
};
