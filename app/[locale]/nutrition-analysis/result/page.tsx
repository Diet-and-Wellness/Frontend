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
import { useLocale, useTranslations } from "next-intl";
import { subscriptionApi } from "../../api/endpoints/subscription.api";

const visibleCategories = [
  "Excellent",
  "Good",
  "Average",
  "Needs Attention",
] as const;

const assessmentPreviewSections_En = [
  {
    sectionTitle: "Your Goal and Current State",
    section: "preview-goal-current-state",
    sectionScore: 1,
    result: {
      label: "Excellent",
      description:
        "A general preview of how this section may appear after completing your analysis.",
      recommendations: [
        "Your personalized result will explain how clearly defined goals, previous weight changes, and current expectations may affect your progress. Unlock the full analysis to receive recommendations based on your actual assessment answers.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Your Physical Activity and Daily Routine",
    section: "preview-physical-activity",
    sectionScore: 0.58,
    result: {
      label: "Average",
      description:
        "This is sample content provided only to demonstrate the analysis layout.",
      recommendations: [
        "Your real report will assess your exercise frequency, daily movement, sitting time, and activity patterns. The displayed score is not calculated from your answers.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Your Sleep, Hydration and Daily Energy",
    section: "preview-sleep-hydration-energy",
    sectionScore: 0.46,
    result: {
      label: "Average",
      description:
        "Your actual sleep, hydration, and energy assessment is currently locked.",
      recommendations: [
        "The full report will examine how your sleep quality, water intake, and daily energy may influence appetite, recovery, and adherence. Unlock your results to view your personal evaluation.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Appetite and Meal Timing",
    section: "preview-appetite-meal-timing",
    sectionScore: 0.64,
    result: {
      label: "Good",
      description:
        "Preview data only. This result is not based on your assessment.",
      recommendations: [
        "Your personalized analysis will evaluate hunger patterns, meal spacing, evening appetite, and eating triggers to provide recommendations tailored to your routine.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Your Relationship with Food and Adherence",
    section: "preview-food-relationship-adherence",
    sectionScore: 0.41,
    result: {
      label: "Needs Improvement",
      description:
        "This section is shown as a visual preview and does not reflect your real result.",
      recommendations: [
        "The unlocked report will identify patterns that may affect consistency, including restriction, loss of motivation, emotional triggers, and difficulty maintaining dietary changes.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Your Daily Eating Habits",
    section: "preview-daily-eating-habits",
    sectionScore: 0.69,
    result: {
      label: "Good",
      description:
        "Sample section content used to preview the full assessment experience.",
      recommendations: [
        "Your real analysis will review meal quality, protein intake, vegetables, food preparation habits, and reliance on meals outside the home.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Digestion and Food Response",
    section: "preview-digestion-food-response",
    sectionScore: 0.53,
    result: {
      label: "Average",
      description: "The score and recommendation below are examples only.",
      recommendations: [
        "The full result will evaluate digestive comfort, bloating, bowel regularity, and possible food-related symptoms based on the answers you submitted.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Psychological State and Emotional Eating",
    section: "preview-psychological-emotional-eating",
    sectionScore: 0.37,
    result: {
      label: "Needs Attention",
      description:
        "This preview does not represent your psychological or emotional eating result.",
      recommendations: [
        "Your personalized report will explore the relationship between emotions, stress, appetite, self-judgment, and eating behavior without using this sample score.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Meal Organization and Fullness",
    section: "preview-meal-organization-fullness",
    sectionScore: 0.61,
    result: {
      label: "Good",
      description:
        "A visual example of the section format shown in the complete report.",
      recommendations: [
        "Your actual evaluation will examine meal regularity, breakfast habits, number of meals, fullness, protein, and fiber to identify areas that may support appetite control.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Cravings for Sweets and Snacks",
    section: "preview-cravings-sweets-snacks",
    sectionScore: 0.44,
    result: {
      label: "Needs Improvement",
      description: "This score is randomly assigned for preview purposes.",
      recommendations: [
        "The unlocked report will analyze the frequency, timing, intensity, and triggers of cravings and provide practical recommendations based on your actual responses.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Readiness for Change and Continuity",
    section: "preview-readiness-continuity",
    sectionScore: 0.76,
    result: {
      label: "Good",
      description:
        "Preview content only. Your true readiness score remains protected.",
      recommendations: [
        "Your personalized result will assess motivation, obstacles, support needs, and the conditions that may help you maintain progress over time.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Female Only Section",
    section: "preview-female-only",
    sectionScore: 0.57,
    result: {
      label: "Average",
      description:
        "This section is displayed only as a sample and is not based on personal data.",
      recommendations: [
        "Where applicable, the complete report will assess appetite, cravings, fluid retention, and weight fluctuations related to the menstrual cycle.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "Motivation and Body Image",
    section: "preview-motivation-body-image",
    sectionScore: 0.67,
    result: {
      label: "Good",
      description:
        "This is a generic demonstration of the final report format.",
      recommendations: [
        "Your actual report will explore motivation, body image, expectations, and the questions that matter most to you when building a sustainable wellness plan.",
      ],
    },
    answers: [],
  },
];

const assessmentPreviewSections_Ar = [
  {
    sectionTitle: "هدفك الحالي ووضعك الصحي",
    section: "preview-goal-current-state",
    sectionScore: 1,
    result: {
      label: "ممتاز",
      description:
        "هذه معاينة توضيحية لكيفية ظهور هذا القسم بعد الحصول على التحليل الكامل.",
      recommendations: [
        "سيقدم لك التقرير الكامل تحليلاً شخصيًا يعتمد على أهدافك الحالية، وتجاربك السابقة مع الوزن، وحالتك الصحية الفعلية. النتائج الظاهرة هنا ليست مبنية على إجاباتك الحقيقية.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "نشاطك البدني وروتينك اليومي",
    section: "preview-physical-activity",
    sectionScore: 0.58,
    result: {
      label: "متوسط",
      description: "هذا مثال توضيحي فقط لإظهار شكل التقرير النهائي.",
      recommendations: [
        "سيقيّم تقريرك الحقيقي مستوى نشاطك اليومي، وعدد مرات ممارسة الرياضة، والحركة خلال اليوم، ويقدم توصيات مخصصة بناءً على إجاباتك.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "النوم والترطيب والطاقة اليومية",
    section: "preview-sleep-hydration-energy",
    sectionScore: 0.46,
    result: {
      label: "متوسط",
      description:
        "التحليل الحقيقي لهذا القسم غير متاح قبل فتح التقرير الكامل.",
      recommendations: [
        "سيحلل التقرير الشخصي جودة نومك، وكمية المياه التي تشربها، ومستوى نشاطك اليومي، وتأثير ذلك على صحتك والتزامك بالخطة الغذائية.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "الشهية وتنظيم مواعيد الوجبات",
    section: "preview-appetite-meal-timing",
    sectionScore: 0.64,
    result: {
      label: "جيد",
      description:
        "البيانات المعروضة هنا لأغراض المعاينة فقط وليست ناتجة عن تقييمك.",
      recommendations: [
        "سيعرض التقرير الحقيقي تحليلاً لأنماط الجوع، والفترات بين الوجبات، والشهية المسائية، مع توصيات تناسب أسلوب حياتك.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "علاقتك بالطعام ومدى الالتزام",
    section: "preview-food-relationship-adherence",
    sectionScore: 0.41,
    result: {
      label: "يحتاج إلى تحسين",
      description: "هذا القسم عبارة عن نموذج توضيحي ولا يعكس نتيجتك الحقيقية.",
      recommendations: [
        "سيكشف التقرير الشخصي العوامل التي تؤثر على التزامك، مثل الدافع، والضغوط النفسية، والعادات الغذائية، مع اقتراحات مناسبة لحالتك.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "عاداتك الغذائية اليومية",
    section: "preview-daily-eating-habits",
    sectionScore: 0.69,
    result: {
      label: "جيد",
      description: "هذا مجرد مثال لإظهار شكل التقرير النهائي.",
      recommendations: [
        "سيقيّم التقرير الحقيقي جودة وجباتك، وتناول البروتين والخضروات، واعتمادك على الطعام المنزلي أو الوجبات الخارجية.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "الهضم واستجابة الجسم للطعام",
    section: "preview-digestion-food-response",
    sectionScore: 0.53,
    result: {
      label: "متوسط",
      description: "النتيجة والتوصية المعروضتان هنا مجرد أمثلة توضيحية.",
      recommendations: [
        "سيقوم التقرير الكامل بتحليل الراحة الهضمية، والانتفاخ، وانتظام الهضم، وأي أعراض مرتبطة بأنواع معينة من الطعام.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "الحالة النفسية والأكل العاطفي",
    section: "preview-psychological-emotional-eating",
    sectionScore: 0.37,
    result: {
      label: "يحتاج إلى اهتمام",
      description: "هذه المعاينة لا تمثل تقييمك النفسي أو علاقتك بالأكل.",
      recommendations: [
        "سيحلل التقرير الشخصي تأثير التوتر والمشاعر على الشهية، وعلاقة الأكل بالحالة النفسية، مع توصيات تناسب نمطك الشخصي.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "تنظيم الوجبات والشعور بالشبع",
    section: "preview-meal-organization-fullness",
    sectionScore: 0.61,
    result: {
      label: "جيد",
      description: "مثال توضيحي لشكل هذا القسم في التقرير الكامل.",
      recommendations: [
        "سيقيّم التقرير انتظام وجباتك، والإفطار، وعدد الوجبات اليومية، والشعور بالشبع، ودور البروتين والألياف في تحسين التحكم بالشهية.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "الرغبة في الحلويات والوجبات الخفيفة",
    section: "preview-cravings-sweets-snacks",
    sectionScore: 0.44,
    result: {
      label: "يحتاج إلى تحسين",
      description: "تم إنشاء هذه النتيجة لأغراض العرض فقط.",
      recommendations: [
        "سيحلل التقرير الحقيقي مدى تكرار الرغبة في الحلويات، وأوقاتها، وأسبابها، مع تقديم حلول عملية تناسب حالتك.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "الاستعداد للتغيير والاستمرارية",
    section: "preview-readiness-continuity",
    sectionScore: 0.76,
    result: {
      label: "جيد",
      description:
        "هذا المحتوى توضيحي فقط، بينما تبقى نتيجتك الحقيقية محفوظة حتى فتح التقرير.",
      recommendations: [
        "سيقيّم التقرير مستوى استعدادك للتغيير، والعوائق التي قد تواجهك، والعوامل التي تساعدك على الاستمرار وتحقيق أهدافك.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "قسم خاص بالإناث",
    section: "preview-female-only",
    sectionScore: 0.57,
    result: {
      label: "متوسط",
      description:
        "هذا القسم معروض كنموذج توضيحي فقط ولا يعتمد على بيانات شخصية.",
      recommendations: [
        "عند الحاجة، سيحلل التقرير تأثير الدورة الشهرية على الشهية، والرغبة في الحلويات، واحتباس السوائل، والتغيرات المؤقتة في الوزن.",
      ],
    },
    answers: [],
  },
  {
    sectionTitle: "الدافع والصورة الذاتية",
    section: "preview-motivation-body-image",
    sectionScore: 0.67,
    result: {
      label: "جيد",
      description: "هذا مجرد نموذج يوضح شكل التقرير النهائي.",
      recommendations: [
        "سيستعرض التقرير الحقيقي مستوى الدافع لديك، ونظرتك لصورة جسمك، وتوقعاتك، والعوامل التي تساعدك على بناء نمط حياة صحي ومستدام.",
      ],
    },
    answers: [],
  },
];

export default function ResultPage() {
  const [preparing, setPreparing] = useState(false);

  const t = useTranslations("analysis");

  const isArabic = useLocale() === "ar";

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

  const { isLoading: checkingAccessabilityStatus, data: accessabilityStatus } =
    useQuery({
      queryKey: ["result-accessability", me?.id],
      queryFn: async () => {
        const { data } =
          await subscriptionApi.getAssessmentResultAccessability();
        return data.data;
      },
      enabled: !!me?.id,
    });

  const redirectToCheckout = async () => {
    try {
      setPreparing(true);
      const { data: subscriptionsResponse } =
        await subscriptionApi.getSubscriptionsOfType("one_time_offer");

      const planId = subscriptionsResponse?.data?.[0]?.id;

      if (!planId) {
        throw new Error("No one-time assessment plan was found.");
      }

      const { data: purchaseResponse } =
        await subscriptionApi.purchaseSubscription(planId);

      const checkoutUrl = purchaseResponse?.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Checkout URL was not returned.");
      }

      window.location.assign(checkoutUrl);
    } catch {
    } finally {
      setPreparing(false);
    }
  };

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
        color: "var(--color-palette-22c55e)",
        bgColor: "var(--color-palette-f0fdf4)",
        description: t("excellentDescription"),
      };
    } else if (percentage >= 75) {
      status = {
        label: t("good"),
        color: "var(--color-palette-65a30d)",
        bgColor: "var(--color-palette-f7fee7)",
        description: t("goodDescription"),
      };
    } else if (percentage >= 60) {
      status = {
        label: t("average"),
        color: "var(--color-palette-f59e0b)",
        bgColor: "var(--color-palette-fffbeb)",
        description: t("averageDescription"),
      };
    } else if (percentage >= 40) {
      status = {
        label: t("needsImprovement"),
        color: "var(--color-palette-f97316)",
        bgColor: "var(--color-palette-fff7ed)",
        description: t("needsImprovementDescription"),
      };
    } else {
      status = {
        label: t("needsAttention"),
        color: "var(--color-palette-ef4444)",
        bgColor: "var(--color-palette-fef2f2)",
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

  const healthyWeight = useMemo(
    () =>
      healthMetrics.calculateHealthyWeightResult({
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
    assessmentResult?.sectionResults?.length > 0
      ? assessmentResult.sectionResults
      : isArabic
        ? assessmentPreviewSections_Ar
        : assessmentPreviewSections_En,
  );

  const loading =
    isLoadingMe || isLoadingAssessmentResult || checkingAccessabilityStatus;

  if (loading) {
    return <AnalysisResultSkeleton />;
  }

  const goHomeHandler = () => {
    router.replace("/");
  };

  return (
    <>
      <AssessmentHeader
        title={t("title")}
        closeLabel={t("backToHome")}
        onClose={goHomeHandler}
      />

      <div className="mt-8 flex flex-col gap-10 sm:mt-12 sm:gap-15">
        <AssessmentSummary {...summary} />

        <div className="relative">
          {accessabilityStatus.hasAccess || (
            <div className="absolute inset-0 bg-linear-to-b from-surface-raised/50 to-black/20 backdrop-blur-sm z-50">
              <PayToAccessCard
                onClickPay={redirectToCheckout}
                onClose={goHomeHandler}
                loading={preparing}
              />
            </div>
          )}

          <div className="mx-auto flex w-full max-w-260 flex-col gap-10 px-4 pb-16 sm:gap-15 sm:px-5 sm:pb-20">
            <BodyMetricsCards bmi={bmi} healthyWeight={healthyWeight} />

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
