import GainIcon from "../icons/GainIcon";
import LossIcon from "../icons/LossIcon";
import MaintenanceIcon from "../icons/MaintenanceIcon";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("calculators");
  const caloriesCardData = {
    maintenance: {
      cardName: t("maintenance"),
      target: t("maintenanceTarget"),
      note: t("maintenanceNote"),
      caloriesColor: "#475569",
      cardBackground: "#F8F8F8",
      icon: <MaintenanceIcon />,
    },
    loss: {
      cardName: t("fatLoss"),
      target: t("fatLossTarget"),
      note: t("lossNote"),
      caloriesColor: "#4D8E32",
      cardBackground: "#F1F9EF",
      icon: <LossIcon />,
    },
    gain: {
      cardName: t("muscleGain"),
      target: t("muscleGainTarget"),
      note: t("gainNote"),
      caloriesColor: "#E99532",
      cardBackground: "#FDF4EB",
      icon: <GainIcon />,
    },
  } as const;

  const { cardName, target, note, caloriesColor, cardBackground, icon } =
    caloriesCardData[type];

  const cardClassName = `flex h-full w-full flex-col justify-between gap-3.5 rounded-4xl p-5 ring transition-all duration-150 ${isActive ? "ring-2 ring-[#4D8E32]" : "ring-[#EDEDED]"} ${clickable ? "cursor-pointer" : ""}`;

  const cardContent = (
    <>
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: cardBackground }}
        >
          {icon}
        </div>

        <div className="flex min-w-0 flex-col items-end gap-1 text-end">
          <p className="type-label font-medium leading-tight">{cardName}</p>
          <p className="type-meta leading-5 text-[#4F4F4F]">{target}</p>
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
          className="text-3xl font-bold sm:text-[34px] lg:text-[38px]"
          style={{ color: caloriesColor }}
        >
          {calories}
        </motion.p>
        <p className="type-label text-[#4F4F4F]">{t("kcalDay")}</p>
      </div>

      <p
        className="type-label w-full rounded-2xl px-6 py-3.5 text-start text-[#4F4F4F]"
        style={{ backgroundColor: cardBackground }}
      >
        {note}
      </p>
    </>
  );

  if (!clickable) {
    return <div className={cardClassName}>{cardContent}</div>;
  }

  return (
    <button type="button" onClick={onClick} className={cardClassName}>
      {cardContent}
    </button>
  );
};

export default CaloriesCard;
