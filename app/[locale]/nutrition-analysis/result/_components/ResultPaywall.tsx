import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import LockerIcon from "@/app/[locale]/components/icons/LockerIcon";
import SparklesIcon from "@/app/[locale]/components/icons/Sparkles";

export function PersonalizedInsightCard() {
  return (
    <div className="relative overflow-hidden rounded-[48px] p-7.5 bg-[#4E9636] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 size-80 rounded-full bg-[#2D6120] blur-[120px] opacity-70" />
        <div className="absolute right-1/4 top-0 w-[320px] h-80 rounded-full bg-[#7BC85A] blur-[120px] opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-white/15 flex items-center justify-center">
            <SparklesIcon />
          </div>
          <h2 className="text-[20px] font-bold">Personalized Insight</h2>
        </div>

        <p className="w-full text-[20px] leading-[1.35] text-white/95">
          “The biggest opportunity for improvement is meal organization.
          Reducing long gaps between meals may help improve appetite regulation,
          reduce sugar cravings, and support better energy levels throughout the
          day.”
        </p>

        <button className="place-self-start px-15 py-3 rounded-full bg-[#FDFDFD] text-[#4D8E32] font-semibold text-[18px] cursor-pointer">
          Book a Specialist
        </button>
      </div>
    </div>
  );
}

export function PayToAccessCard() {
  return (
    <div className="bg-[#FFFEFD] p-7.5 rounded-3xl max-w-110 shadow-xs sticky top-1/4 mt-40 place-self-center flex flex-col justify-between items-center gap-4">
      <div className="flex justify-end absolute right-4 top-4">
        <button
          onClick={() => {}}
          className="hover:bg-gray-100 transition-colors duration-200 justify-end place-self-end p-3 rounded-full cursor-pointer"
        >
          <CloseIcon className="text-gray-600" height="16" width="16" />
        </button>
      </div>
      <div className="size-16 bg-[#FDF4EB] flex justify-center items-center rounded-full">
        <LockerIcon />
      </div>
      <p className="text-[25px] font-semibold">Unlock Your Full Request</p>
      <p className="text-[18px] text-[#4F4F4F] text-center">
        Get detailed recommendations, results and personalized insights.
      </p>
      <button
        onClick={() => {}}
        className="bg-[#E99532] mt-2.5 w-full min-h-12 rounded-full border border-[#E1E7EF] text-[20px] font-semibold cursor-pointer text-[#FDFDFD]"
      >
        Unlock For 25 EGP
      </button>
    </div>
  );
}
