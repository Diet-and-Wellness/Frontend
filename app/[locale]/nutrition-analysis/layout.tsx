"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { assessmentApi } from "../api/endpoints/assessment.api";
import { LogoLoader } from "../components/Public/Skeletons";
import { useMe } from "../hooks/useMe";

const NutritionAnalysisLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
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

    const targetPath = completedAssessment
      ? `/${locale}/nutrition-analysis/result`
      : `/${locale}/nutrition-analysis/assessment`;

    if (pathname !== targetPath) {
      router.replace(targetPath);
    }
  }, [
    me,
    completedAssessment,
    isLoadingMe,
    isLoadingAssessment,
    pathname,
    router,
    locale,
  ]);

  if (isLoadingMe || isLoadingAssessment) {
    return <LogoLoader />;
  }

  return <div className="w-full">{children}</div>;
};

export default NutritionAnalysisLayout;
