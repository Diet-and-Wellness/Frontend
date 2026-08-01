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
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={selectActivityLevelHandler}
      aria-pressed={isSelected}
      className={`
        flex min-h-16 w-full cursor-pointer items-center gap-2
        rounded-2xl px-3 py-1.5 text-start
        ring-1 transition-all duration-150
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand
        focus-visible:ring-offset-2
        focus-visible:ring-offset-surface
        sm:min-h-18
        ${
          isSelected
            ? "bg-brand-soft ring-2 ring-brand"
            : "bg-surface-raised ring-line-strong hover:bg-surface-muted hover:ring-brand"
        }
      `}
    >
      <span
        className={`
          flex size-8 shrink-0 items-center justify-center
          transition-colors
          ${isSelected ? "text-brand" : "text-content-muted"}
        `}
      >
        {getActivityLevelIcon()}
      </span>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 text-start">
        <p
          className={`
            text-sm font-semibold leading-tight
            ${isSelected ? "text-brand-ink" : "text-content-strong"}
          `}
        >
          {level}
        </p>

        <p
          className={`
            w-full truncate text-[0.8125rem] leading-tight line-clamp-1
            ${isSelected ? "text-content-muted" : "text-content-subtle"}
          `}
        >
          {description}
        </p>
      </div>
    </button>
  );
};

export default ActivityLevelCard;
