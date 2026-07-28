import GainIcon from "../icons/GainIcon";
import LossIcon from "../icons/LossIcon";
import MaintenanceIcon from "../icons/MaintenanceIcon";
import { motion } from "framer-motion";

type CaloriesCardType = "maintenance" | "loss" | "gain";

const CaloriesCard = ({
  type,
  calories,
  isActive,
  clickable,
  onClick,
}: {
  type: CaloriesCardType;
  calories: number;
  isActive?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}) => {
  const caloriesCardData = {
    maintenance: {
      cardName: "Maintenance",
      target: "Calories",
      note: "Calories to maintain your current weight",
      caloriesColor: "#475569",
      cardBackground: "#F8F8F8",
      icon: <MaintenanceIcon />,
    },
    loss: {
      cardName: "Fat Loss",
      target: "−0.5 kg/week",
      note: "500 kcal deficit for healthy weight loss",
      caloriesColor: "#4D8E32",
      cardBackground: "#F1F9EF",
      icon: <LossIcon />,
    },
    gain: {
      cardName: "Muscle Gain",
      target: "+0.5 kg/week",
      note: "500 kcal surplus for healthy weight gain",
      caloriesColor: "#E99532",
      cardBackground: "#FDF4EB",
      icon: <GainIcon />,
    },
  } as const;

  const { cardName, target, note, caloriesColor, cardBackground, icon } =
    caloriesCardData[type];

  return (
    <button
      disabled={!clickable}
      onClick={onClick}
      className={`w-full h-full p-5 rounded-4xl ring ${isActive ? "ring-2 ring-[#4D8E32]" : "ring-[#EDEDED]"} flex flex-col justify-between gap-3.5 ${clickable ? "cursor-pointer" : ""} transition-all duration-150`}
    >
      <div className="flex justify-between items-center">
        <div
          className={`size-12 rounded-full flex justify-center items-center`}
          style={{ backgroundColor: cardBackground }}
        >
          {icon}
        </div>

        <div className="flex flex-col items-end">
          <p className="text-[16px] font-medium">{cardName}</p>
          <p className="text-[13px] text-[#4F4F4F]">{target}</p>
        </div>
      </div>

      <div className="flex justify-between items-baseline">
        <motion.p
          key={calories}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className="text-[38px] font-bold"
          style={{ color: caloriesColor }}
        >
          {calories}
        </motion.p>
        <p className="text-[16px] text-[#4F4F4F]">kcal/day</p>
      </div>

      <p
        className="text-left rounded-2xl w-full px-6 py-3.5 text-[#4F4F4F] text-[15px]"
        style={{ backgroundColor: cardBackground }}
      >
        {note}
      </p>
    </button>
  );
};

export default CaloriesCard;
