"use client";

import type { Choice } from "@/app/[locale]/api/types/assessment.types";

const ChoiceCard = ({
  choice,
  isSelected,
  onSelect,
}: {
  choice: Choice;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`flex w-full items-center justify-start gap-3 rounded-2xl border px-4 py-3 text-start transition-all duration-300 sm:px-6 ${isSelected ? "border-[#4D8E32] bg-[#EDF4EB]" : "border-[#EBEBEB]"} cursor-pointer`}
  >
    <div
      className={`size-5.5 ${isSelected ? "bg-[#4D8E32]" : "bg-white ring ring-[#ADB5BD]"} rounded-full flex justify-center items-center`}
    >
      <div className="size-2 rounded-full bg-white" />
    </div>
    <p
      className={`type-control ${isSelected ? "text-[#262B3C]" : "text-gray-500"}`}
    >
      {choice.text}
    </p>
  </button>
);

export default ChoiceCard;
