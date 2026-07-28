"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { MacroResult } from "../../api/types/assessment.types";
import { assessmentApi } from "../../api/endpoints/assessment.api";
import AssessmentHeader from "../_components/AssessmentHeader";
import Spinner from "../../components/Public/LoadingSpinner";
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

const assessmentCategoryContent = {
  "Needs Attention": {
    title: "Priority Areas",
    description:
      "These areas require your immediate attention. Addressing them first can have the greatest impact on improving your overall nutrition and wellness.",
  },
  "Needs Improvement": {
    title: "Areas for Improvement",
    description:
      "These categories have room for improvement. Small, consistent changes can help you build healthier habits over time.",
  },
  Average: {
    title: "Opportunities to Improve",
    description:
      "You're making steady progress in these areas. A few targeted adjustments can help you achieve even better results.",
  },
  Good: {
    title: "Your Strengths",
    description:
      "These are healthy habits you're already doing well. Keep maintaining them while continuing to build on your progress.",
  },
  Excellent: {
    title: "Outstanding Habits",
    description:
      "Excellent work! These areas reflect strong, consistent habits that support your long-term health and well-being.",
  },
} as const;

const visibleCategories = [
  "Excellent",
  "Good",
  "Average",
  "Needs Attention",
] as const;

export default function ResultPage() {
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
        label: "Excellent",
        color: "#22C55E",
        bgColor: "#F0FDF4",
        description:
          "Outstanding! Your nutrition habits are well balanced and support a healthy lifestyle. Keep maintaining your current routine.",
      };
    } else if (percentage >= 75) {
      status = {
        label: "Good",
        color: "#65A30D",
        bgColor: "#F7FEE7",
        description:
          "You're doing well overall. A few small improvements can make your nutrition habits even stronger.",
      };
    } else if (percentage >= 60) {
      status = {
        label: "Average",
        color: "#F59E0B",
        bgColor: "#FFFBEB",
        description:
          "Your nutrition is fairly balanced, but there are several areas that could benefit from healthier daily habits.",
      };
    } else if (percentage >= 40) {
      status = {
        label: "Needs Improvement",
        color: "#F97316",
        bgColor: "#FFF7ED",
        description:
          "Some of your eating habits may be limiting your progress. Focus on making consistent, healthier choices over time.",
      };
    } else {
      status = {
        label: "Needs Attention",
        color: "#EF4444",
        bgColor: "#FEF2F2",
        description:
          "Your results suggest several nutrition habits that may require immediate attention. Consider reviewing your eating patterns and seeking guidance from a qualified nutrition professional if needed.",
      };
    }

    return { percentage, circumference, offset, status };
  }, [assessmentResult?.totalScore]);

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

  return (
    <>
      <AssessmentHeader title="Nutrition Analysis Results" onClose={() => {}} />
      {loading ? (
        <div className="h-160 flex justify-center items-center">
          <Spinner spinnerSize={75} borderColor="#4D8E32" />
        </div>
      ) : (
        <div className="flex flex-col gap-15 mt-15">
          <AssessmentSummary {...summary} />

          <div className="relative">
            {false && (
              <div className="absolute inset-0 bg-linear-to-b from-white/50 to-black/20 backdrop-blur-sm z-50">
                <PayToAccessCard />
              </div>
            )}

            <div className="max-w-260 mx-auto flex flex-col gap-15 pb-20">
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
                    title={assessmentCategoryContent[category].title}
                    description={
                      assessmentCategoryContent[category].description
                    }
                    sections={sections}
                  />
                );
              })}

              <PersonalizedInsightCard />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
