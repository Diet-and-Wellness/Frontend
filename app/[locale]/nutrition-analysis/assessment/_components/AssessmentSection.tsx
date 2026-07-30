"use client";

import type { AssessmentSection as AssessmentSectionData } from "@/app/[locale]/api/types/assessment.types";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Question from "./Question";

type SectionAnswers = Record<
  string,
  {
    choiceId?: string;
    text?: string;
  }
>;

const AssessmentSection = ({
  section,
  sectionId,
  answers,
  isLastQuestion,
  onChoiceSelection,
  onTextAnswer,
}: {
  section?: AssessmentSectionData;
  sectionId?: string;
  answers?: SectionAnswers;
  isLastQuestion: boolean;
  onChoiceSelection: (questionId: string, choiceId: string) => void;
  onTextAnswer: (questionId: string, text: string) => void;
}) => {
  const t = useTranslations();
  const textQuestionId = section?.questions.at(-1)?.id;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sectionId}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        exit={{ opacity: 0, y: 20 }}
        className="flex flex-col gap-6 sm:gap-7.5"
      >
        <div className="flex flex-col gap-2">
          <h3 className="type-card-title font-semibold">{section?.title}</h3>
          <p className="type-body text-content-muted">{section?.description}</p>
        </div>

        {isLastQuestion ? (
          <textarea
            placeholder={t("analysis.specialNotes")}
            value={answers?.[textQuestionId ?? ""]?.text}
            onChange={(event) => {
              if (textQuestionId) {
                onTextAnswer(textQuestionId, event.target.value);
              }
            }}
            className="h-48 w-full resize-none rounded-2xl border-none p-4 outline-none ring ring-line-strong transition-all duration-100 placeholder:text-content-placeholder focus:ring-2 focus:ring-brand sm:h-60 sm:p-5"
          />
        ) : (
          section?.questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              questionAnswer={answers?.[question.id]?.choiceId}
              onChoiceSelection={onChoiceSelection}
            />
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AssessmentSection;
