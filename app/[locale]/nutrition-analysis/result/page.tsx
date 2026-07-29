"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { MacroResult } from "../../api/types/assessment.types";
import { assessmentApi } from "../../api/endpoints/assessment.api";
import AssessmentHeader from "../_components/AssessmentHeader";
import { AnalysisResultSkeleton } from "../../components/Public/Skeletons";
import { useMe } from "../../hooks/useMe";
import { healthMetrics } from "../../utils/healthMetrics";
import { groupAssessmentSectionsByStatus } from "../../utils/groupAssessmentSectionsByStatus";
import AssessmentCategoryResults from "./_components/AssessmentCategoryResults";
import AssessmentSummary, {
  type AssessmentStatus,
} from "./_components/AssessmentSummary";
import BodyMetricsCards from "./_components/BodyMetricsCards";
import CalorieTargets, { type MacroGoal } from "./_components/CalorieTargets";
import {
  PayToAccessCard,
  PersonalizedInsightCard,
} from "./_components/ResultPaywall";
import { useTranslations } from "next-intl";

const visibleCategories = [
  "Excellent",
  "Good",
  "Average",
  "Needs Attention",
] as const;

export default function ResultPage() {
  const t = useTranslations("analysis");
  const router = useRouter();
  const [activeMacroGoal, setActiveMacroGoal] = useState<MacroGoal>("fatloss");
  const { data: me, isLoading: isLoadingMe } = useMe();

  const { data: assessmentResult, isLoading: isLoadingAssessmentResult } =
    useQuery({
      queryKey: ["assessment-result", me?.id],
      queryFn: async () => {
        const { data } = await assessmentApi.getAssessmentsResult();
        return data?.data;
      },
      enabled: !!me?.id,
    });

  const summary = useMemo(() => {
    const radius = 90;
    const percentage = Math.max(
      0,
      Math.min(100, Math.ceil((assessmentResult?.totalScore ?? 0) * 100)),
    );
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    let status: AssessmentStatus;

    if (percentage >= 90) {
      status = {
        label: t("excellent"),
        color: "#22C55E",
        bgColor: "#F0FDF4",
        description: t("excellentDescription"),
      };
    } else if (percentage >= 75) {
      status = {
        label: t("good"),
        color: "#65A30D",
        bgColor: "#F7FEE7",
        description: t("goodDescription"),
      };
    } else if (percentage >= 60) {
      status = {
        label: t("average"),
        color: "#F59E0B",
        bgColor: "#FFFBEB",
        description: t("averageDescription"),
      };
    } else if (percentage >= 40) {
      status = {
        label: t("needsImprovement"),
        color: "#F97316",
        bgColor: "#FFF7ED",
        description: t("needsImprovementDescription"),
      };
    } else {
      status = {
        label: t("needsAttention"),
        color: "#EF4444",
        bgColor: "#FEF2F2",
        description: t("needsAttentionDescription"),
      };
    }

    return { percentage, circumference, offset, status };
  }, [assessmentResult?.totalScore, t]);

  const bmi = useMemo(
    () =>
      healthMetrics.calculateBMI({
        heightCm: me?.profile?.height ?? 1,
        weightKg: me?.profile?.currentWeight ?? 1,
      }),
    [me],
  );

  const idealWeight = useMemo(
    () =>
      healthMetrics.calculateIdealWeightResult({
        heightCm: me?.profile?.height,
        weightKg: me?.profile?.currentWeight,
        gender: me?.profile?.gender,
      }),
    [me],
  );

  const calories = useMemo(() => {
    if (
      !me?.profile?.height ||
      !me?.profile?.currentWeight ||
      !me?.profile?.age ||
      !me?.profile?.activityLevel ||
      !me?.profile?.gender
    ) {
      return null;
    }

    return healthMetrics.calculateCalorieResult({
      heightCm: me.profile.height,
      weightKg: me.profile.currentWeight,
      gender: me.profile.gender,
      age: me.profile.age,
      activityLevel: me.profile.activityLevel,
    });
  }, [me]);

  const macros = useMemo<MacroResult | null>(() => {
    if (!calories) return null;

    switch (activeMacroGoal) {
      case "fatloss":
        return calories.macros.fatLoss;
      case "musclegain":
        return calories.macros.muscleGain;
      case "maintenance":
        return calories.macros.maintenance;
    }
  }, [activeMacroGoal, calories]);

  const sectionsByCategory = groupAssessmentSectionsByStatus(
    assessmentResult?.sectionResults,
  );
  const loading = isLoadingMe || isLoadingAssessmentResult;

  if (loading) {
    return <AnalysisResultSkeleton />;
  }

  return (
    <>
      <AssessmentHeader
        title={t("title")}
        closeLabel={t("backToHome")}
        onClose={() => router.replace("/")}
      />
      <div className="mt-8 flex flex-col gap-10 sm:mt-12 sm:gap-15">
        <AssessmentSummary {...summary} />

        <div className="relative">
          {false && (
            <div className="absolute inset-0 bg-linear-to-b from-white/50 to-black/20 backdrop-blur-sm z-50">
              <PayToAccessCard />
            </div>
          )}

          <div className="mx-auto flex w-full max-w-260 flex-col gap-10 px-4 pb-16 sm:gap-15 sm:px-5 sm:pb-20">
            <BodyMetricsCards bmi={bmi} idealWeight={idealWeight} />

            <CalorieTargets
              calories={calories}
              macros={macros}
              activeGoal={activeMacroGoal}
              onGoalChange={setActiveMacroGoal}
            />

            {visibleCategories.map((category) => {
              const sections = sectionsByCategory?.[category] ?? [];
              if (sections.length === 0) return null;

              return (
                <AssessmentCategoryResults
                  key={category}
                  title={t(
                    {
                      "Needs Attention": "priorityAreas",
                      "Needs Improvement": "areasForImprovement",
                      Average: "opportunitiesToImprove",
                      Good: "yourStrengths",
                      Excellent: "outstandingHabits",
                    }[category],
                  )}
                  description={t(
                    {
                      "Needs Attention": "priorityAreasDescription",
                      "Needs Improvement": "areasForImprovementDescription",
                      Average: "opportunitiesToImproveDescription",
                      Good: "yourStrengthsDescription",
                      Excellent: "outstandingHabitsDescription",
                    }[category],
                  )}
                  sections={sections}
                />
              );
            })}

            <PersonalizedInsightCard />
          </div>
        </div>
      </div>
    </>
  );
}
