"use client";

import { Suspense, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { assessmentApi } from "../api/endpoints/assessment.api";
import { LogoLoader } from "../components/Public/Skeletons";
import { useMe } from "../hooks/useMe";

const NutritionAnalysisGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const { data: me, isLoading: isLoadingMe } = useMe();

  const { data: completedAssessment, isLoading: isLoadingAssessment } =
    useQuery({
      queryKey: ["completedAssessment"],
      queryFn: async () => {
        const { data } = await assessmentApi.getAssessmentsResult();

        return Boolean(data?.data);
      },
      enabled: !!me,
    });

  useEffect(() => {
    if (isLoadingMe || isLoadingAssessment) return;

    if (!me) {
      router.replace(`/${locale}/signin`);
      return;
    }

    if (me.role !== "customer") {
      router.replace(`/${locale}`);
      return;
    }

    const resultPath = `/${locale}/nutrition-analysis/result`;
    const assessmentPath = `/${locale}/nutrition-analysis/assessment`;
    const isRetest = searchParams.get("retest") === "true";

    if (completedAssessment) {
      const canTakeRetest = pathname === assessmentPath && isRetest;

      if (pathname !== resultPath && !canTakeRetest) {
        router.replace(resultPath);
      }
      return;
    }

    if (pathname !== assessmentPath) {
      router.replace(assessmentPath);
    }
  }, [
    me,
    completedAssessment,
    isLoadingMe,
    isLoadingAssessment,
    pathname,
    searchParams,
    router,
    locale,
  ]);

  if (isLoadingMe || isLoadingAssessment) {
    return <LogoLoader />;
  }

  return <div className="w-full">{children}</div>;
};

const NutritionAnalysisLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Suspense fallback={<LogoLoader />}>
    <NutritionAnalysisGuard>{children}</NutritionAnalysisGuard>
  </Suspense>
);

export default NutritionAnalysisLayout;
