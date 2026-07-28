import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";
import RedoIcon from "@/app/[locale]/components/icons/RedoIcon";

const CTA = ({
  tryAgainHanlder,
  getFullAssessment,
}: {
  tryAgainHanlder: () => void;
  getFullAssessment: () => void;
}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4 mt-2">
      <button
        onClick={tryAgainHanlder}
        className="flex justify-center items-center gap-2.5 px-7.5 py-2.5 rounded-full border border-[#4D8E32] text-[#4D8E32] font-semibold text-[16px] cursor-pointer"
      >
        <RedoIcon />
        <span>Try Again</span>
      </button>

      <button
        onClick={getFullAssessment}
        className="flex justify-center items-center gap-2.5 px-7.5 py-2.5 rounded-full bg-[#4D8E32] text-[#FDFDFD] font-semibold text-[16px] cursor-pointer"
      >
        <span>Get Full Analysis</span>
        <div className="rotate-y-180">
          <ArrowIcon />
        </div>
      </button>
    </div>
  );
};
export default CTA;
