import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";
import RedoIcon from "@/app/[locale]/components/icons/RedoIcon";
import { useTranslations } from "next-intl";

const CTA = ({
  tryAgainHanlder,
  getFullAssessment,
}: {
  tryAgainHanlder: () => void;
  getFullAssessment: () => void;
}) => {
  const t = useTranslations("calculators");
  return (
    <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      <button
        onClick={tryAgainHanlder}
        className="type-control flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#4D8E32] px-7.5 py-2.5 font-semibold text-[#4D8E32] cursor-pointer"
      >
        <RedoIcon />
        <span>{t("tryAgain")}</span>
      </button>

      <button
        onClick={getFullAssessment}
        className="type-control flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#4D8E32] px-7.5 py-2.5 font-semibold text-[#FDFDFD] cursor-pointer"
      >
        <span>{t("fullAnalysis")}</span>
        <div className="rotate-y-180">
          <ArrowIcon />
        </div>
      </button>
    </div>
  );
};
export default CTA;
