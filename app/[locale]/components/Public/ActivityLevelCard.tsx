import HighActivityIcon from "../icons/HighActivityIcon";
import LowActivityIcon from "../icons/LowActivityIcon";
import MediumActivityIcon from "../icons/MediumActivityIcon";
import VeryHighActivityIcon from "../icons/VeryHighActivityIcon";
import { useTranslations } from "next-intl";

const ActivityLevelCard = ({
  isSelected,
  level,
  description,
  selectActivityLevelHandler,
}: {
  isSelected: boolean;
  level: string;
  description: string;
  selectActivityLevelHandler: () => void;
}) => {
  const t = useTranslations("calculators");
  const getActivityLevelIcon = () => {
    switch (level) {
      case t("low"):
        return <LowActivityIcon />;
      case t("moderate"):
        return <MediumActivityIcon />;
      case t("high"):
        return <HighActivityIcon />;
      case t("extreme"):
        return <VeryHighActivityIcon />;
    }
  };

  return (
    <button
      onClick={selectActivityLevelHandler}
      className={`grid min-h-24 w-full grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 rounded-2xl px-4 py-3 text-start ring transition-all duration-150 cursor-pointer sm:min-h-26 sm:px-5 ${isSelected ? "ring-2 ring-[#4D8E32] bg-[#E4EEE0]" : "ring-[#D5D5D5]"}`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
        {getActivityLevelIcon()}
      </span>
      <div className="flex min-w-0 flex-col items-start gap-0.5 text-start">
        <p
          className={`type-control font-semibold leading-tight ${isSelected ? "text-gray-800" : "text-[#666]"}`}
        >
          {level}
        </p>
        <p className="type-label leading-snug text-[#8E8E8E]">{description}</p>
      </div>
    </button>
  );
};

export default ActivityLevelCard;
