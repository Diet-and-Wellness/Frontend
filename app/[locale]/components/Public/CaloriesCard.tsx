import GainIcon from "../icons/GainIcon";
import LossIcon from "../icons/LossIcon";
import MaintenanceIcon from "../icons/MaintenanceIcon";

type CaloriesCardType = "maintenance" | "loss" | "gain";

const CaloriesCard = ({
  type,
  calories,
}: {
  type: CaloriesCardType;
  calories: number;
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
      target: "−0.5 kg/week",
      note: "500 kcal surplus for healthy weight gain",
      caloriesColor: "#E99532",
      cardBackground: "#FDF4EB",
      icon: <GainIcon />,
    },
  } as const;

  const { cardName, target, note, caloriesColor, cardBackground, icon } =
    caloriesCardData[type];

  return (
    <div className="max-w-60 p-5 rounded-2xl border border-[#EDEDED] flex flex-col gap-3.5">
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
        <p className="text-[38px] font-bold" style={{ color: caloriesColor }}>
          {calories}
        </p>
        <p className="text-[16px] text-[#4F4F4F]">kcal/day</p>
      </div>

      <p
        className="rounded-2xl w-full px-5 py-3.5 text-[#4F4F4F] text-[14px]"
        style={{ backgroundColor: cardBackground }}
      >
        {note}
      </p>
    </div>
  );
};

export default CaloriesCard;
