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
      className={`grid min-h-16 w-full grid-cols-[2rem_minmax(0,1fr)] items-center gap-2.5 rounded-2xl px-4 py-1.5 text-start ring transition-all duration-150 cursor-pointer sm:min-h-18 sm:px-5 ${isSelected ? "ring-2 ring-brand bg-[var(--color-palette-e4eee0)]" : "ring-line-strong"}`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center">
        {getActivityLevelIcon()}
      </span>
      <div className="flex min-w-0 flex-col items-start gap-0.5 text-start">
        <p
          className={`text-sm font-semibold leading-tight ${isSelected ? "text-content-strong" : "text-content-muted"}`}
        >
          {level}
        </p>
        <p className="whitespace-nowrap text-[0.8125rem] leading-tight text-content-subtle">
          {description}
        </p>
      </div>
    </button>
  );
};

export default ActivityLevelCard;
