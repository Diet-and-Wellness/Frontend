import FemaleIcon from "../icons/FemaleIcon";
import MaleIcon from "../icons/MaleIcon";
import { useTranslations } from "next-intl";

const GenderCard = ({
  isSelected,
  gender,
  selectGenderHandler,
}: {
  isSelected: boolean;
  gender: string;
  selectGenderHandler: () => void;
}) => {
  const t = useTranslations("calculators");
  return (
    <button
      onClick={selectGenderHandler}
      className={`cursor-pointer w-full flex justify-center items-center gap-3.5 ring ${isSelected ? "ring-2 ring-brand bg-[var(--color-palette-e4eee0)]" : "ring-line-strong"} px-5 py-2 rounded-2xl transition-all duration-150`}
    >
      {gender === t("male") ? <MaleIcon /> : <FemaleIcon />}
      <p className="type-control text-content">{gender}</p>
    </button>
  );
};

export default GenderCard;
