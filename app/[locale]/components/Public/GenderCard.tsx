import FemaleIcon from "../icons/FemaleIcon";
import MaleIcon from "../icons/MaleIcon";

const GenderCard = ({
  isSelected,
  gender,
  selectGenderHandler,
}: {
  isSelected: boolean;
  gender: string;
  selectGenderHandler: () => void;
}) => {
  return (
    <button
      onClick={selectGenderHandler}
      className={`cursor-pointer w-full flex justify-center items-center gap-3.5 ring ${isSelected ? "ring-2 ring-[#4D8E32] bg-[#E4EEE0]" : "ring-[#D5D5D5]"} px-5 py-2 rounded-2xl transition-all duration-150`}
    >
      {gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
      <p className="">{gender}</p>
    </button>
  );
};

export default GenderCard;
