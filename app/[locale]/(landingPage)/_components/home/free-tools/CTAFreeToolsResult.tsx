import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";
import RedoIcon from "@/app/[locale]/components/icons/RedoIcon";
import { useLocale, useTranslations } from "next-intl";

const CTA = ({
  tryAgainHanlder,
  getFullAssessment,
}: {
  tryAgainHanlder: () => void;
  getFullAssessment: () => void;
}) => {
  const t = useTranslations("calculators");
  const locale = useLocale();

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      <button
        onClick={tryAgainHanlder}
        className="type-control flex h-12 items-center justify-center gap-2.5 rounded-full border border-brand px-7.5 py-2.5 font-semibold text-brand cursor-pointer"
      >
        <RedoIcon />
        <span>{t("tryAgain")}</span>
      </button>

      <button
        onClick={getFullAssessment}
        className="type-control flex h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-7.5 py-2.5 font-semibold text-brand-contrast cursor-pointer"
      >
        <span>{t("fullAnalysis")}</span>
        <div className={locale === "ar" ? "" : "rotate-y-180"}>
          <ArrowIcon />
        </div>
      </button>
    </div>
  );
};
export default CTA;
