import Image from "next/image";
import type { ReactNode } from "react";

type SkeletonProps = {
  className?: string;
};

const joinClasses = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={joinClasses("skeleton-shimmer rounded-lg", className)}
  />
);

export const TableSkeleton = ({
  columns = 6,
  rows = 6,
  className,
}: {
  columns?: number;
  rows?: number;
  className?: string;
}) => (
  <div
    aria-busy="true"
    className={joinClasses(
      "w-full overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white",
      className,
    )}
  >
    <div className="flex gap-6 border-b border-[#E1E7EF] bg-[#FCFCFC] px-6 py-4">
      {Array.from({ length: columns }, (_, index) => (
        <Skeleton
          key={index}
          className={joinClasses(
            "h-4 flex-1",
            index === 0 ? "max-w-35" : undefined,
          )}
        />
      ))}
    </div>

    {Array.from({ length: rows }, (_, rowIndex) => (
      <div
        key={rowIndex}
        className="flex min-h-18 items-center gap-6 border-b border-[#E1E7EF] px-6 py-4 last:border-b-0"
      >
        {Array.from({ length: columns }, (_, columnIndex) => (
          <Skeleton
            key={columnIndex}
            className={joinClasses(
              "h-4 flex-1",
              columnIndex === 0 ? "max-w-40" : undefined,
            )}
          />
        ))}
      </div>
    ))}
  </div>
);

export const CardGridSkeleton = ({
  cards = 3,
  className,
}: {
  cards?: number;
  className?: string;
}) => (
  <div
    aria-busy="true"
    className={joinClasses(
      "grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",
      className,
    )}
  >
    {Array.from({ length: cards }, (_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white"
      >
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="flex flex-col gap-4 p-5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="mt-2 h-10 w-2/5 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

export const FeedbackManagementSkeleton = () => (
  <section aria-busy="true" className="flex w-full flex-col gap-10">
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-6 w-80 max-w-full" />
      </div>

      <div className="w-full max-w-60 space-y-2.5">
        <Skeleton className="ms-auto h-6 w-24" />
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </div>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="relative h-110 overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white"
        >
          <Skeleton className="h-full w-full rounded-none" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 rounded-t-2xl bg-white p-3.5">
            <div className="flex gap-2.5">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-6 w-11 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const PricingPlansSkeleton = () => (
  <div
    aria-busy="true"
    className="flex w-full max-w-7xl flex-wrap items-stretch justify-center gap-6"
  >
    {Array.from({ length: 3 }, (_, index) => (
      <div
        key={index}
        className="flex min-h-130 w-full max-w-95 flex-col gap-6 rounded-3xl bg-white p-7 shadow-sm"
      >
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-12 w-2/3" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }, (_, itemIndex) => (
            <Skeleton key={itemIndex} className="h-4 w-full" />
          ))}
        </div>
        <Skeleton className="mt-auto h-12 w-full rounded-full" />
      </div>
    ))}
  </div>
);

export const BlogDetailsSkeleton = () => (
  <div aria-busy="true" className="min-h-screen min-w-full">
    <Skeleton className="mx-auto mt-20 min-h-80 w-[92.5%] rounded-4xl md:min-h-120 md:w-[75%]" />
    <div className="mx-auto flex w-[90%] flex-col gap-7.5 py-7.5 md:max-w-[70%] lg:py-10">
      <div className="flex justify-between gap-5">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/5" />
      </div>
      <Skeleton className="h-9 w-3/4" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <CardGridSkeleton cards={3} className="mt-10" />
    </div>
  </div>
);

const AssessmentPageSkeletonShell = ({ children }: { children: ReactNode }) => (
  <div aria-busy="true" className="mx-auto w-full max-w-230">
    <div className="mx-auto flex w-full max-w-260 items-center justify-between border-b border-[#E1E7EF] px-4 py-4 sm:px-5 sm:py-5">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-5 w-18" />
    </div>
    {children}
  </div>
);

export const PersonalDataFormSkeleton = () => (
  <AssessmentPageSkeletonShell>
    <div className="flex flex-col gap-6 px-4 py-5 sm:gap-7.5 sm:p-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      <div className="flex flex-col gap-6 sm:gap-7.5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7.5">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex flex-col gap-2.5">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>

        <div>
          <Skeleton className="mb-3.5 h-6 w-36" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-7.5">
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        </div>

        <div>
          <Skeleton className="mb-3.5 h-6 w-48" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-7.5">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-15 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      <Skeleton className="mt-2.5 h-13.5 w-full rounded-full" />
    </div>
  </AssessmentPageSkeletonShell>
);

export const AssessmentQuestionsSkeleton = () => (
  <AssessmentPageSkeletonShell>
    <div className="mx-auto flex w-full flex-col gap-5 px-4 sm:w-[95%] sm:px-0">
      <div className="sticky top-0 z-50 flex flex-col gap-2 bg-white py-5">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-3 w-full rounded-full" />
      </div>

      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-2/5" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="flex flex-col gap-5">
            <Skeleton className="h-5 w-3/5" />
            <div className="flex flex-col items-start gap-3.5">
              <Skeleton className="h-12 w-full rounded-2xl sm:w-3/4" />
              <Skeleton className="h-12 w-11/12 rounded-2xl sm:w-2/3" />
              <Skeleton className="h-12 w-4/5 rounded-2xl sm:w-1/2" />
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-[#F1F3F5] bg-white py-4 sm:gap-5 sm:border-transparent sm:py-7">
        <Skeleton className="h-12 flex-1 rounded-full sm:w-28 sm:flex-none" />
        <Skeleton className="h-12 flex-1 rounded-full sm:w-36 sm:flex-none" />
      </div>
    </div>
  </AssessmentPageSkeletonShell>
);

const ResultMetricCardSkeleton = () => (
  <div className="flex min-h-80 flex-col justify-between rounded-2xl border border-[#EDEDED] bg-white p-5">
    <Skeleton className="h-4 w-30" />
    <div className="flex items-baseline gap-2.5">
      <Skeleton className="h-11 w-24" />
      <Skeleton className="h-5 w-18" />
    </div>
    <Skeleton className="h-3 w-full rounded-full" />
    <div className="grid grid-cols-2 gap-2.5">
      <Skeleton className="h-19 w-full rounded-2xl" />
      <Skeleton className="h-19 w-full rounded-2xl" />
    </div>
    <Skeleton className="h-4 w-11/12" />
  </div>
);

const CalorieTargetCardSkeleton = () => (
  <div className="flex min-h-72 flex-col justify-between gap-3.5 rounded-4xl border border-[#EDEDED] bg-white p-5">
    <div className="flex items-center justify-between">
      <Skeleton className="size-12 rounded-full" />
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-4 w-22" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
    <div className="flex items-baseline justify-between">
      <Skeleton className="h-11 w-24" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-12 w-full rounded-2xl" />
  </div>
);

const InsightCardSkeleton = () => (
  <div className="flex min-h-62 flex-col justify-between gap-4 rounded-2xl border border-[#E1E7EF] bg-white p-5">
    <div className="flex items-center justify-between">
      <Skeleton className="size-12 rounded-full" />
      <Skeleton className="h-7 w-24 rounded-full" />
    </div>
    <Skeleton className="h-5 w-3/4" />
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="h-2.5 w-full rounded-full" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  </div>
);

export const AnalysisResultSkeleton = () => (
  <div aria-busy="true" className="w-full">
    <div className="mx-auto flex w-full max-w-260 items-center justify-between border-b border-[#E1E7EF] px-4 py-4 sm:px-5 sm:py-5">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-5 w-18" />
    </div>

    <div className="mx-auto mt-8 flex w-full max-w-260 flex-col gap-10 px-4 pb-16 sm:mt-12 sm:gap-15 sm:px-5 sm:pb-20">
      <section className="flex flex-col items-center gap-5 overflow-hidden rounded-3xl bg-[#F3F4F6] p-6 sm:rounded-4xl sm:p-8 md:p-12">
        <Skeleton className="h-12 w-72 max-w-full" />
        <Skeleton className="h-7 w-120 max-w-full" />
        <Skeleton className="mt-2.5 size-55 rounded-full" />
        <Skeleton className="h-9 w-32 rounded-full" />
        <div className="flex w-full max-w-150 flex-col items-center gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7.5 lg:gap-10">
        <ResultMetricCardSkeleton />
        <ResultMetricCardSkeleton />
      </div>

      <section className="flex flex-col gap-7.5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-10">
          {Array.from({ length: 3 }, (_, index) => (
            <CalorieTargetCardSkeleton key={index} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 rounded-2xl border border-[#E1E7EF] bg-white px-5 py-6 sm:px-7.5 sm:py-8 md:flex-row md:gap-10 md:px-15 md:py-10">
          <Skeleton className="size-45 shrink-0 rounded-full" />
          <div className="flex flex-1 flex-col gap-5">
            {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex items-center gap-4 sm:gap-7.5">
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-3 w-full rounded-full" />
                </div>
                <Skeleton className="h-9 w-18" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-7.5">
        <div className="flex max-w-160 flex-col gap-2">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-7.5">
          {Array.from({ length: 3 }, (_, index) => (
            <InsightCardSkeleton key={index} />
          ))}
        </div>
      </section>

      <section className="flex min-h-58 flex-col gap-5 rounded-3xl bg-[#E5E7EB] p-5 sm:rounded-[48px] sm:p-7.5">
        <div className="flex items-center gap-4">
          <Skeleton className="size-12 rounded-full bg-[#D1D5DB]" />
          <Skeleton className="h-6 w-52 bg-[#D1D5DB]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-full bg-[#D1D5DB]" />
          <Skeleton className="h-5 w-4/5 bg-[#D1D5DB]" />
        </div>
        <Skeleton className="mt-auto h-12 w-full rounded-full bg-[#F9FAFB] sm:w-48" />
      </section>
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div aria-busy="true" className="flex w-full flex-col gap-5">
    <Skeleton className="h-8 w-1/3" />
    {Array.from({ length: 4 }, (_, index) => (
      <div key={index} className="flex flex-col gap-2.5">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    ))}
    <Skeleton className="mt-2 h-13 w-full rounded-4xl" />
  </div>
);

export const DashboardLogoLoader = () => (
  <div
    aria-busy="true"
    className="flex min-h-screen items-center justify-center bg-[#F9F9F9]"
  >
    <Image
      src="/icons/logo.svg"
      alt=""
      width={61}
      height={58}
      priority
      className="dashboard-logo-loader size-32 md:size-40"
    />
  </div>
);
