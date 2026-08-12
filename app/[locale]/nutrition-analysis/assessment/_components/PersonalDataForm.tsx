"use client";

import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import type {
  ActivityLevel,
  Gender,
} from "@/app/[locale]/api/types/assessment.types";
import ActivityLevelCard from "@/app/[locale]/components/Public/ActivityLevelCard";
import GenderCard from "@/app/[locale]/components/Public/GenderCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, useState } from "react";

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.25, ease: "easeIn" },
  },
} as const;

const PersonalDataForm = ({
  onSavingChange,
}: {
  onSavingChange: (isSaving: boolean) => void;
}) => {
  const t = useTranslations();
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [location, setLocation] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("low");
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      await profileApi.updateMyProfile({
        profile: {
          age,
          gender,
          height: heightCm,
          currentWeight: weightKg,
          location,
          activityLevel,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onMutate: () => {
      onSavingChange(true);
    },
    onSettled: () => {
      onSavingChange(false);
    },
  });

  const showResultBtnActive =
    Boolean(heightCm) &&
    Boolean(weightKg) &&
    Boolean(age) &&
    Boolean(location) &&
    !updateProfileMutation.isPending;

  const preventInvalidNumberInput = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-6 px-4 py-5 sm:gap-7.5 sm:p-5"
    >
      <div className="flex flex-col gap-2">
        <h3 className="type-page-title font-semibold">
          {t("analysis.personalData")}
        </h3>
        <p className="type-body text-content-muted">
          {t("analysis.personalDataDescription")}
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:gap-7.5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7.5">
          <div className="flex flex-col gap-2.5">
            <label className="type-label font-medium">
              {t("calculators.age")}
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-line-strong focus-within:ring-brand focus-within:ring-2 rounded-xl">
              <input
                type="number"
                min={1}
                max={120}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (value >= 0 && value <= 150) setAge(value);
                }}
                onKeyDown={preventInvalidNumberInput}
                className="w-full outline-none"
                placeholder={t("calculators.enterAge")}
              />
              <p className="type-label text-content-muted">
                {t("calculators.year")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="type-label font-medium">
              {t("calculators.height")}
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-line-strong focus-within:ring-brand focus-within:ring-2 rounded-xl">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={250}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (value >= 0 && value <= 300) setHeightCm(value);
                }}
                onKeyDown={preventInvalidNumberInput}
                className="w-full outline-none"
                placeholder={t("calculators.enterHeight")}
              />
              <p className="type-label text-content-muted">
                {t("calculators.cm")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="type-label font-medium">
              {t("calculators.weight")}
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-line-strong focus-within:ring-brand focus-within:ring-2 rounded-xl">
              <input
                type="number"
                inputMode="decimal"
                min={0}
                max={250}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (value >= 0 && value <= 300) setWeightKg(value);
                }}
                onKeyDown={preventInvalidNumberInput}
                className="w-full outline-none"
                placeholder={t("calculators.enterWeight")}
              />
              <p className="type-label text-content-muted">
                {t("calculators.kg")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="type-label font-medium">
              {t("analysis.location")}
            </label>
            <div className="px-3.5 py-3 flex items-center gap-2.5 ring ring-line-strong focus-within:ring-brand focus-within:ring-2 rounded-xl">
              <input
                type="text"
                onChange={(event) => setLocation(event.target.value)}
                className="w-full outline-none"
                placeholder={t("analysis.enterYourLocation")}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="type-body-lg mb-3.5 font-medium">
            {t("analysis.genderQuestion")}
          </p>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-7.5">
            <GenderCard
              selectGenderHandler={() => setGender("male")}
              gender={t("calculators.male")}
              isSelected={gender === "male"}
            />
            <GenderCard
              selectGenderHandler={() => setGender("female")}
              gender={t("calculators.female")}
              isSelected={gender === "female"}
            />
          </div>
        </div>

        <div>
          <p className="type-body-lg mb-3.5 font-medium">
            {t("analysis.activityLevelQuestion")}
          </p>
          <div className="mt-2.5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-7.5">
            <ActivityLevelCard
              level={t("calculators.low")}
              description={t("calculators.littleExercise")}
              isSelected={activityLevel === "low"}
              selectActivityLevelHandler={() => setActivityLevel("low")}
            />
            <ActivityLevelCard
              level={t("calculators.moderate")}
              description={t("calculators.exerciseModerate")}
              isSelected={activityLevel === "moderate"}
              selectActivityLevelHandler={() => setActivityLevel("moderate")}
            />
            <ActivityLevelCard
              level={t("calculators.high")}
              description={t("calculators.exerciseHigh")}
              isSelected={activityLevel === "high"}
              selectActivityLevelHandler={() => setActivityLevel("high")}
            />
            <ActivityLevelCard
              level={t("calculators.extreme")}
              description={t("calculators.intenseActivity")}
              isSelected={activityLevel === "extreme"}
              selectActivityLevelHandler={() => setActivityLevel("extreme")}
            />
          </div>
        </div>
      </div>

      <button
        disabled={!showResultBtnActive}
        onClick={() => updateProfileMutation.mutate()}
        className={`type-control mt-2.5 flex h-12.5 w-full items-center justify-center rounded-full px-6 font-semibold transition-colors sm:px-10 ${showResultBtnActive ? "bg-brand text-white hover:bg-brand-hover cursor-pointer" : "bg-line-strong text-white cursor-not-allowed"}`}
      >
        {t("analysis.startAssessment")}
      </button>
    </motion.div>
  );
};

export default PersonalDataForm;
