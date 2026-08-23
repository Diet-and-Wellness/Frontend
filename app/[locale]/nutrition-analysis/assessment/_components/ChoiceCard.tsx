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
    className={`flex w-full items-center justify-start gap-3 rounded-2xl border px-4 py-3 text-start transition-all duration-300 sm:px-6 ${isSelected ? "border-brand bg-brand-soft" : "border-line"} cursor-pointer`}
  >
    <div
      className={`size-5 shrink-0 ${isSelected ? "bg-brand" : "bg-surface-raised ring ring-line-strong"} rounded-full flex justify-center items-center`}
    >
      <div className="size-2 rounded-full bg-surface-raised" />
    </div>
    <p
      className={`type-control ${isSelected ? "text-content-strong" : "text-content-subtle"}`}
    >
      {choice.text}
    </p>
  </button>
);

export default ChoiceCard;
