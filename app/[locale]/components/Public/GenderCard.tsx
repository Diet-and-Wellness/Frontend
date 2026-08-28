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
      aria-pressed={isSelected}
      className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border px-5 py-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${isSelected ? "border-brand bg-brand-soft" : "border-line-strong bg-surface-raised hover:border-brand/60 hover:bg-surface-muted"}`}
    >
      {gender === t("male") ? <MaleIcon /> : <FemaleIcon />}
      <p className="type-control text-content">{gender}</p>
    </button>
  );
};

export default GenderCard;
