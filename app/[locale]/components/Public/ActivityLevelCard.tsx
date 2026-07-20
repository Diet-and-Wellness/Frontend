import HighActivityIcon from "../icons/HighActivityIcon";
import LowActivityIcon from "../icons/LowActivityIcon";
import MediumActivityIcon from "../icons/MediumActivityIcon";
import VeryHighActivityIcon from "../icons/VeryHighActivityIcon";

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
  const getActivityLevelIcon = () => {
    switch (level) {
      case "light":
        return <LowActivityIcon />;
      case "moderate":
        return <MediumActivityIcon />;
      case "active":
        return <HighActivityIcon />;
      case "very active":
        return <VeryHighActivityIcon />;
    }
  };
  return (
    <button
      onClick={selectActivityLevelHandler}
      className={`cursor-pointer w-full flex justify-start items-center gap-3.5 ring ${isSelected ? "ring-2 ring-[#4D8E32] bg-[#E4EEE0]" : "ring-[#D5D5D5]"} px-5 py-2 rounded-2xl transition-all duration-150`}
    >
      {getActivityLevelIcon()}
      <div className="flex flex-col items-start">
        <p
          className={`${isSelected ? "text-gray-800" : "text-[#8E8E8E]"} text-[14px] font-medium`}
        >
          {level}
        </p>
        <p className="text-[#8E8E8E] text-[13px]">{description}</p>
      </div>
    </button>
  );
};

export default ActivityLevelCard;
