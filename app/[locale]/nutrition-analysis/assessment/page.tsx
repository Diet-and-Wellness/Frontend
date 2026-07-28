"use client";

import ArrowIcon from "../../components/icons/ArrowIcon";
import ClockIcon from "../../components/icons/ClockIcon";
import { AssessmentQuestion, Choice } from "../../api/types/assessment.types";
import { useEffect, useState } from "react";
import Spinner from "../../components/Public/LoadingSpinner";
import { useAssessment } from "../../hooks/useAssessment";
import { useSection } from "../../hooks/useSection";
import { AnimatePresence, motion } from "framer-motion";
import { assessmentApi } from "../../api/endpoints/assessment.api";
import { useMe } from "../../hooks/useMe";
import ActivityLevelCard from "../../components/Public/ActivityLevelCard";
import GenderCard from "../../components/Public/GenderCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../../api/endpoints/profile.api";
import { useRouter } from "next/navigation";
import AssessmentHeader from "../_components/AssessmentHeader";

type Answers = Record<
  string,
  Record<
    string,
    {
      choiceId?: string;
      text?: string;
    }
  >
>;

const AssessmentPage = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [lastAnsweredSectionIndex, setLastAnsweredSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const router = useRouter();

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentSectionIndex]);

  const submitFormMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        formId: assessment.id,
        sections: Object.entries(answers).map(([sectionId, questions]) => ({
          sectionId,

          answers: Object.entries(questions).map(([questionId, answer]) =>
            answer.choiceId
              ? {
                  questionId,
                  choiceId: answer.choiceId,
                }
              : {
                  questionId,
                  answerText: answer.text!,
                },
          ),
        })),
      };
      await assessmentApi.submitForm(payload);
    },
    onSuccess: () => {
      router.replace("/nutrition-analysis/result");
    },
  });

  const choiceSelectionHandler = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentSectionId]: {
        ...prev[currentSectionId],
        [questionId]: {
          choiceId,
        },
      },
    }));
  };

  const updateTextAnswer = (questionId: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentSectionId]: {
        ...prev[currentSectionId],
        [questionId]: {
          text,
        },
      },
    }));
  };

  const isLastQuestion =
    currentSectionIndex === (assessment?.sections?.length ?? 0) - 1;

  const textQuestionId = section?.questions.at(-1)?.id;

  const nextBtnEnabled = isLastQuestion
    ? Boolean(
        currentSectionId &&
        answers[currentSectionId]?.[
          section?.questions?.[0]?.id
        ]?.text?.trim() &&
        !submitFormMutation.isPending,
      )
    : Boolean(
        currentSectionId &&
        section?.questions.every((q: AssessmentQuestion) =>
          Boolean(answers[currentSectionId]?.[q.id]),
        ),
      );

  const nextHandler = () => {
    if (isLastQuestion) {
      submitFormMutation.mutate();
    } else {
      if (lastAnsweredSectionIndex === currentSectionIndex)
        setLastAnsweredSectionIndex((prev) => prev + 1);
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const backHandler = () => setCurrentSectionIndex((prev) => prev - 1);

  return (
    <div className="mx-auto max-w-230">
      <AssessmentHeader title="Nutrition Analysis Results" onClose={() => {}} />

      {isLoadingUser ? (
        <div className="w-full h-140 flex justify-center items-center">
          <Spinner spinnerSize={55} borderColor="#4D8E32" />
        </div>
      ) : !!!me?.profile?.gender ? (
        <PersonalDataForm />
      ) : (
        <div>
          <div className="w-[95%] mx-auto flex flex-col gap-5">
            <AssessmentProgress
              lastAnsweredSectionIndex={lastAnsweredSectionIndex + 1}
              total={assessment?.sections?.length ?? 13}
            />

            {assessmentIsLoading || sectionIsLoading ? (
              <div className="min-h-100 w-full flex justify-center items-center">
                <Spinner spinnerSize={55} borderColor="#4D8E32" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSectionId}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                  }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col gap-7.5"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[22px] font-semibold">
                      {section?.title}
                    </h3>
                    <p className="text-[16px] text-[#4F4F4F]">
                      {section?.description}
                    </p>
                  </div>
                  {isLastQuestion ? (
                    <textarea
                      placeholder="Add any special notes"
                      value={answers[currentSectionId]?.[textQuestionId]?.text}
                      onChange={(e) =>
                        updateTextAnswer(textQuestionId, e.target.value)
                      }
                      className="resize-none w-full h-60 placeholder-gray-400 ring ring-gray-200 focus:ring-2 focus:ring-[#4D8E32] transition-all duration-100 rounded-2xl p-5 outline-none border-none"
                    />
                  ) : (
                    section?.questions.map((question: AssessmentQuestion) => (
                      <Question
                        key={question.id}
                        question={question}
                        questionAnswer={
                          answers[currentSectionId]?.[question.id]?.choiceId
                        }
                        choiceSelectionHandler={choiceSelectionHandler}
                      />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            <Actions
              nextBtnDisabled={!nextBtnEnabled}
              backBtnDisabled={currentSectionIndex === 0}
              isLastQuestion={isLastQuestion}
              loading={submitFormMutation.isPending}
              onNext={nextHandler}
              onBack={backHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
} as const;

type Gender = "male" | "female";

type ActivityLevel = "low" | "moderate" | "high" | "extreme";

const PersonalDataForm = () => {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [location, setLocation] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("low");

  const queryClient = useQueryClient();

  const ageChangeHandler = (value: number) => {
    if (value < 0 || value > 150) {
      return;
    }
    setAge(value);
  };

  const heightChangeHandler = (value: number) => {
    if (value < 0 || value > 300) {
      return;
    }
    setHeightCm(value);
  };

  const weightChangeHandler = (value: number) => {
    if (value < 0 || value > 300) {
      return;
    }
    setWeightKg(value);
  };

  const locationChangeHandler = (value: string) => {
    setLocation(value);
  };

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      await profileApi.updateMyProfile({
        profile: {
          age: age,
          gender: gender,
          height: heightCm,
          currentWeight: weightKg,
          location: location,
          activityLevel: activityLevel,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });

  const showResultBtnActive =
    !!heightCm &&
    !!weightKg &&
    !!age &&
    !!location &&
    !updateProfileMutation.isPending;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-7.5 p-5"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-[22px] font-semibold">Personal Data</h3>
        <p className="text-[16px] text-[#4F4F4F]">
          These date are used to connect with you and to prepare your profile to
          the specialist.
        </p>
      </div>
      <div className="flex flex-col gap-7.5">
        <div className="grid grid-cols-2 gap-7.5">
          <div className="flex flex-col gap-2.5">
            <label htmlFor="" className="text-[16px] font-medium">
              Age
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
              <input
                type="number"
                min={1}
                max={120}
                onChange={(event) =>
                  ageChangeHandler(Number(event.target.value))
                }
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full outline-none"
                placeholder="Enter your age"
              />
              <p className="text-[#4F4F4F] text-[16px]">year</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="" className="text-[16px] font-medium">
              Height
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={250}
                onChange={(event) =>
                  heightChangeHandler(Number(event.target.value))
                }
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full outline-none"
                placeholder="Enter your height"
              />
              <p className="text-[#4F4F4F] text-[16px]">cm</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="" className="text-[16px] font-medium">
              Weight
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={250}
                onChange={(event) =>
                  weightChangeHandler(Number(event.target.value))
                }
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                className="w-full outline-none"
                placeholder="Enter your weight"
              />
              <p className="text-[#4F4F4F] text-[16px]">kg</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="" className="text-[16px] font-medium">
              Location
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
              <input
                type="text"
                onChange={(event) => locationChangeHandler(event.target.value)}
                className="w-full outline-none"
                placeholder="Enter your location"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="text-[20px] font-medium mb-3.5">
            What is your gender?{" "}
          </p>
          <div className="w-full flex gap-7.5 justify-between items-center">
            <GenderCard
              selectGenderHandler={() => setGender("male")}
              gender="Male"
              isSelected={gender === "male"}
            />
            <GenderCard
              selectGenderHandler={() => setGender("female")}
              gender="Female"
              isSelected={gender === "female"}
            />
          </div>
        </div>

        <div className="">
          <p className="text-[20px] font-medium mb-3.5">
            What is your activity level?
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-7.5">
            <ActivityLevelCard
              level="Low"
              description="Little or no exercise"
              isSelected={activityLevel === "low"}
              selectActivityLevelHandler={() => setActivityLevel("low")}
            />

            <ActivityLevelCard
              level="Moderate"
              description="Exercise 1–3 days/week"
              isSelected={activityLevel === "moderate"}
              selectActivityLevelHandler={() => setActivityLevel("moderate")}
            />

            <ActivityLevelCard
              level="High"
              description="Exercise 4–6 days/week"
              isSelected={activityLevel === "high"}
              selectActivityLevelHandler={() => setActivityLevel("high")}
            />

            <ActivityLevelCard
              level="Extreme"
              description="Daily intense activity"
              isSelected={activityLevel === "extreme"}
              selectActivityLevelHandler={() => setActivityLevel("extreme")}
            />
          </div>
        </div>
      </div>

      <button
        disabled={!showResultBtnActive}
        onClick={() => updateProfileMutation.mutate()}
        className={`
            rounded-full
            h-13.5
            text-[18px]
            font-semibold
            mt-2.5
            px-10
            transition-colors 
            flex justify-center items-center
            ${showResultBtnActive ? "bg-[#4D8E32] text-white hover:bg-[#337516] cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}
            }
          `}
      >
        {updateProfileMutation.isPending ? (
          <Spinner spinnerSize={30} />
        ) : (
          "Start Assessment"
        )}
      </button>
    </motion.div>
  );
};

const AssessmentProgress = ({
  lastAnsweredSectionIndex,
  total,
}: {
  lastAnsweredSectionIndex: number;
  total: number;
}) => {
  const progress = Math.ceil((lastAnsweredSectionIndex / total) * 100);

  const completed = progress === 100;

  return (
    <div className="flex flex-col gap-2 sticky top-0 z-50 py-5 bg-white">
      <p className="text-[#4F4F4F] text-[16px] font-medium">Your progress</p>

      <div className="flex justify-between items-center">
        <p className="text-[#4D8E32] text-[36px] font-medium">{progress}%</p>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <p className="text-[#4F4F4F] text-[14px] font-medium">15 min</p>
        </div>
      </div>

      <div className="w-full rounded-full overflow-hidden bg-[#EDEDED]">
        <div className="absolute rounded-full w-full h-3 flex justify-evenly items-center">
          {Array.from({
            length: total - 1,
          }).map((_, index) => (
            <div key={index} className="size-1 bg-white rounded-full" />
          ))}
        </div>
        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className={`${completed ? "bg-[#4D8E32]" : "bg-[#E99532]"} p-1.5 rounded-full`}
          style={{
            width: `${progress}%`,
          }}
        ></motion.div>
      </div>
    </div>
  );
};

const Question = ({
  question,
  questionAnswer,
  choiceSelectionHandler,
}: {
  question: AssessmentQuestion;
  questionAnswer?: string | null;
  choiceSelectionHandler: (questionId: string, choiceId: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[#212529] text-[18px] font-medium px-1.5">
        {question.order}. {question.text}
      </p>
      <div className="flex flex-col items-start gap-3.5">
        {question.choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            choice={choice}
            isSelected={questionAnswer === choice.id}
            choiceSelectionHandler={() =>
              choiceSelectionHandler(question?.id, choice.id)
            }
          />
        ))}
      </div>
    </div>
  );
};

const ChoiceCard = ({
  choice,
  isSelected,
  choiceSelectionHandler,
}: {
  choice: Choice;
  isSelected: boolean;
  choiceSelectionHandler: () => void;
}) => {
  return (
    <button
      onClick={choiceSelectionHandler}
      className={`flex justify-start gap-3 items-center rounded-2xl border ${isSelected ? "border-[#4D8E32] bg-[#EDF4EB]" : "border-[#EBEBEB]"} px-6 py-3 cursor-pointer transition-all duration-300`}
    >
      <div
        className={`size-5.5 ${isSelected ? "bg-[#4D8E32]" : "bg-white ring ring-[#ADB5BD]"} rounded-full flex justify-center items-center`}
      >
        <div className="size-2 rounded-full bg-white" />
      </div>
      <p
        className={`${isSelected ? "text-[#262B3C]" : "text-gray-500"} text-[16px]`}
      >
        {choice.text}
      </p>
    </button>
  );
};

const Actions = ({
  nextBtnDisabled,
  backBtnDisabled,
  isLastQuestion,
  loading,
  onNext,
  onBack,
}: {
  nextBtnDisabled: boolean;
  backBtnDisabled: boolean;
  isLastQuestion: boolean;
  loading: boolean;
  onNext: () => void;
  onBack: () => void;
}) => {
  return (
    <div className="sticky bottom-0 bg-white w-full flex justify-between items-center py-7 ">
      <button
        disabled={backBtnDisabled}
        onClick={onBack}
        className={`px-7.5 h-12 ring-2 ${backBtnDisabled ? "ring-gray-300 cursor-not-allowed" : "ring-[#E99532] cursor-pointer"} rounded-full flex items-center gap-2.5`}
      >
        <ArrowIcon
          className={`${backBtnDisabled ? "text-gray-300" : "text-[#E99532]"}`}
        />
        <span
          className={`text-[20px] font-medium ${backBtnDisabled ? "text-gray-300" : "text-[#E99532]"}`}
        >
          Back
        </span>
      </button>
      <button
        disabled={nextBtnDisabled}
        onClick={onNext}
        className={`px-7.5 h-12 rounded-full ${nextBtnDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#4D8E32] cursor-pointer"} flex items-center gap-2.5`}
      >
        {loading ? (
          <Spinner spinnerSize={30} />
        ) : (
          <>
            <span className="text-[20px] font-medium text-[#FDFDFD]">
              {isLastQuestion ? "Submit" : "Next"}
            </span>
            <ArrowIcon className="text-[#FDFDFD] rotate-y-180" />
          </>
        )}
      </button>
    </div>
  );
};

export default AssessmentPage;
