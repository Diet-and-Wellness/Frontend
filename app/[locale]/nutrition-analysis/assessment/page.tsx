"use client";

import { assessmentApi } from "@/app/[locale]/api/endpoints/assessment.api";
import type { AssessmentQuestion } from "@/app/[locale]/api/types/assessment.types";
import {
  AssessmentQuestionsSkeleton,
  PersonalDataFormSkeleton,
} from "@/app/[locale]/components/Public/Skeletons";
import { useAssessment } from "@/app/[locale]/hooks/useAssessment";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { useSection } from "@/app/[locale]/hooks/useSection";
import {
  clearAssessmentDraft,
  saveAssessmentDraft,
  type AssessmentAnswers,
  readAssessmentDraft,
} from "@/app/[locale]/utils/assessmentDraft";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import AssessmentHeader from "../_components/AssessmentHeader";
import AssessmentActions from "./_components/AssessmentActions";
import AssessmentProgress from "./_components/AssessmentProgress";
import AssessmentSection from "./_components/AssessmentSection";
import LeaveAssessmentModal from "./_components/LeaveAssessmentModal";
import PersonalDataForm from "./_components/PersonalDataForm";

const AssessmentPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [lastAnsweredSectionIndex, setLastAnsweredSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [isDraftRestored, setIsDraftRestored] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const hasSubmittedAssessment = useRef(false);

  const queryClient = useQueryClient();

  const { data: assessment, isLoading: assessmentIsLoading } = useAssessment();
  const { data: me, isLoading: isLoadingUser } = useMe();

  const currentSectionId = assessment?.sections[currentSectionIndex]?.id;
  const nextSectionId =
    assessment?.sections[currentSectionIndex + 1]?.id ?? null;

  const { data: section, isLoading: sectionIsLoading } = useSection(
    currentSectionId,
    nextSectionId,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSectionIndex]);

  useEffect(() => {
    if (!assessment?.id || !me?.id) return;

    const frame = window.requestAnimationFrame(() => {
      const draft = readAssessmentDraft(me.id);

      if (draft && draft.formId === assessment.id) {
        const lastSectionIndex = Math.max(assessment.sections.length - 1, 0);

        setCurrentSectionIndex(
          Math.min(draft.currentSectionIndex, lastSectionIndex),
        );
        setLastAnsweredSectionIndex(
          Math.min(draft.lastAnsweredSectionIndex, lastSectionIndex),
        );
        setAnswers(draft.answers);
      } else if (draft) {
        clearAssessmentDraft(me.id);
      }

      setIsDraftRestored(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [assessment, me]);

  const persistDraft = useCallback(() => {
    if (
      hasSubmittedAssessment.current ||
      !isDraftRestored ||
      !assessment?.id ||
      !me?.id
    ) {
      return;
    }

    saveAssessmentDraft(me.id, {
      formId: assessment.id,
      currentSectionIndex,
      lastAnsweredSectionIndex,
      answers,
      updatedAt: Date.now(),
    });
  }, [
    answers,
    assessment,
    currentSectionIndex,
    isDraftRestored,
    lastAnsweredSectionIndex,
    me,
  ]);

  useEffect(() => {
    persistDraft();
  }, [persistDraft]);

  useEffect(() => {
    if (!isDraftRestored) return;

    const saveBeforeLeaving = () => persistDraft();
    const saveWhenHidden = () => {
      if (document.visibilityState === "hidden") {
        persistDraft();
      }
    };

    window.addEventListener("pagehide", saveBeforeLeaving);
    window.addEventListener("beforeunload", saveBeforeLeaving);
    document.addEventListener("visibilitychange", saveWhenHidden);

    return () => {
      persistDraft();
      window.removeEventListener("pagehide", saveBeforeLeaving);
      window.removeEventListener("beforeunload", saveBeforeLeaving);
      document.removeEventListener("visibilitychange", saveWhenHidden);
    };
  }, [isDraftRestored, persistDraft]);

  const submitFormMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        formId: assessment.id,
        sections: Object.entries(answers).map(([sectionId, questions]) => ({
          sectionId,
          answers: Object.entries(questions).map(([questionId, answer]) =>
            answer.choiceId
              ? { questionId, choiceId: answer.choiceId }
              : { questionId, answerText: answer.text! },
          ),
        })),
      };

      await assessmentApi.submitForm(payload);
    },
    onSuccess: () => {
      hasSubmittedAssessment.current = true;
      queryClient.invalidateQueries({ queryKey: ["completedAssessment"] });
      if (me?.id) clearAssessmentDraft(me.id);
      queryClient.removeQueries({ queryKey: ["section"] });
      queryClient.removeQueries({ queryKey: ["assessment"] });
    },
  });

  const choiceSelectionHandler = (questionId: string, choiceId: string) => {
    if (!currentSectionId) return;

    setAnswers((previous) => ({
      ...previous,
      [currentSectionId]: {
        ...previous[currentSectionId],
        [questionId]: { choiceId },
      },
    }));
  };

  const updateTextAnswer = (questionId: string, text: string) => {
    if (!currentSectionId) return;

    setAnswers((previous) => ({
      ...previous,
      [currentSectionId]: {
        ...previous[currentSectionId],
        [questionId]: { text },
      },
    }));
  };

  const isLastQuestion =
    currentSectionIndex === (assessment?.sections.length ?? 0) - 1;

  const nextBtnEnabled = Boolean(
    isLastQuestion ||
    (currentSectionId &&
      section?.questions.every((question: AssessmentQuestion) =>
        Boolean(answers[currentSectionId]?.[question.id]),
      )),
  );

  const nextHandler = () => {
    if (isLastQuestion) {
      submitFormMutation.mutate();
      return;
    }

    if (lastAnsweredSectionIndex === currentSectionIndex) {
      setLastAnsweredSectionIndex((previous) => previous + 1);
    }
    setCurrentSectionIndex((previous) => previous + 1);
  };

  const backHandler = () => {
    setCurrentSectionIndex((previous) => previous - 1);
  };

  const leaveAssessment = () => {
    persistDraft();
    setIsLeaveModalOpen(false);
    router.replace("/");
  };

  const leaveModal = (
    <AnimatePresence>
      {isLeaveModalOpen && (
        <LeaveAssessmentModal
          onClose={() => setIsLeaveModalOpen(false)}
          onConfirm={leaveAssessment}
        />
      )}
    </AnimatePresence>
  );

  if (isLoadingUser) {
    return <PersonalDataFormSkeleton />;
  }

  if (!me?.profile?.gender) {
    return (
      <div className="mx-auto w-full max-w-230">
        <AssessmentHeader
          title={t("tools.nutritionAnalysis.name")}
          closeLabel={t("analysis.exitAssessment")}
          onClose={() => setIsLeaveModalOpen(true)}
        />
        <PersonalDataForm />
        {leaveModal}
      </div>
    );
  }

  if (assessmentIsLoading || sectionIsLoading || !isDraftRestored) {
    return <AssessmentQuestionsSkeleton />;
  }

  return (
    <div className="mx-auto w-full max-w-230">
      <AssessmentHeader
        title={t("tools.nutritionAnalysis.name")}
        closeLabel={t("analysis.exitAssessment")}
        onClose={() => setIsLeaveModalOpen(true)}
      />
      <div className="mx-auto flex w-full flex-col gap-5 px-4 sm:w-[95%] sm:px-0">
        <AssessmentProgress
          lastAnsweredSectionIndex={lastAnsweredSectionIndex + 1}
          total={assessment?.sections.length ?? 13}
        />

        <AssessmentSection
          section={section}
          sectionId={currentSectionId}
          answers={currentSectionId ? answers[currentSectionId] : undefined}
          isLastQuestion={isLastQuestion}
          onChoiceSelection={choiceSelectionHandler}
          onTextAnswer={updateTextAnswer}
        />

        <AssessmentActions
          nextBtnDisabled={!nextBtnEnabled}
          backBtnDisabled={currentSectionIndex === 0}
          isLastQuestion={isLastQuestion}
          submitBtnLoading={submitFormMutation.isPending}
          onNext={nextHandler}
          onBack={backHandler}
        />
      </div>
      {leaveModal}
    </div>
  );
};

export default AssessmentPage;
