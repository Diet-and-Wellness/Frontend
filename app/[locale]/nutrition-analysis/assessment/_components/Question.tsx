"use client";

import type { AssessmentQuestion } from "@/app/[locale]/api/types/assessment.types";
import ChoiceCard from "./ChoiceCard";

const Question = ({
  question,
  questionAnswer,
  onChoiceSelection,
}: {
  question: AssessmentQuestion;
  questionAnswer?: string | null;
  onChoiceSelection: (questionId: string, choiceId: string) => void;
}) => (
  <div className="flex flex-col gap-4 sm:gap-5">
    <p className="type-body-lg px-1 font-medium text-content-strong sm:px-1.5">
      {question.order}. {question.text}
    </p>
    <div className="flex w-full flex-col items-stretch gap-3.5">
      {question.choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          choice={choice}
          isSelected={questionAnswer === choice.id}
          onSelect={() => onChoiceSelection(question.id, choice.id)}
        />
      ))}
    </div>
  </div>
);

export default Question;
