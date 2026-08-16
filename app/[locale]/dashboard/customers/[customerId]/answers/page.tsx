"use client";

import { assessmentApi } from "@/app/[locale]/api/endpoints/assessment.api";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import type {
  AssessmentAnswerResponse,
  AssessmentSectionResult,
  AssessmentSubmission,
} from "@/app/[locale]/api/types/assessment.types";
import type { Customer } from "@/app/[locale]/api/types/profile.types";
import { Skeleton } from "@/app/[locale]/components/Public/Skeletons";
import DateIcon from "@/app/[locale]/components/icons/Date";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { formatDate } from "@/app/[locale]/utils/formateDate";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { BackButton } from "../../../admin/_components/BackToBtn";

type SubmissionPayload = AssessmentSubmission & {
  result?: AssessmentSubmission;
  assessment?: AssessmentSubmission;
  submission?: AssessmentSubmission;
};

const getSubmissionSections = (submission?: SubmissionPayload) =>
  submission?.sectionResults ??
  submission?.result?.sectionResults ??
  submission?.assessment?.sectionResults ??
  submission?.submission?.sectionResults ??
  [];

const getSubmissionDate = (submission?: SubmissionPayload) =>
  submission?.submittedAt ??
  submission?.completedAt ??
  submission?.createdAt ??
  submission?.updatedAt ??
  submission?.result?.submittedAt ??
  submission?.result?.completedAt ??
  submission?.result?.createdAt;

const getLocalizedValue = (value: unknown, locale: string) => {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    const localizedValue = value as Record<string, unknown>;
    const preferredValue = localizedValue[locale];

    if (typeof preferredValue === "string") return preferredValue;
    if (typeof localizedValue.en === "string") return localizedValue.en;
    if (typeof localizedValue.ar === "string") return localizedValue.ar;
  }

  return "—";
};

const AssessmentAnswersPage = () => {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const router = useRouter();
  const { customerId } = useParams<{ customerId: string }>();
  const { data: me, isLoading: isMeLoading } = useMe();
  const canViewAnswers = me?.role === "admin" || me?.role === "specialist";

  useEffect(() => {
    if (!isMeLoading && !canViewAnswers) {
      router.replace("/");
    }
  }, [canViewAnswers, isMeLoading, router]);

  const { data: customer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: async () => {
      const { data } = await profileApi.getProfile(customerId);
      return (data?.data ?? data) as Customer;
    },
    enabled: Boolean(customerId && canViewAnswers),
  });

  const { data: submission, isLoading: isSubmissionLoading } = useQuery({
    queryKey: ["assessment-submission", customerId],
    queryFn: async () => {
      const { data } = await assessmentApi.getUserSubmission(customerId);
      const payload = (data?.data ?? data) as SubmissionPayload;

      return payload.submission ?? payload;
    },
    enabled: Boolean(customerId && canViewAnswers),
  });

  const sections = getSubmissionSections(submission);
  const submittedAt = getSubmissionDate(submission);
  const dateLocale = locale === "ar" ? "ar-EG" : "en-US";
  const customerName =
    `${customer?.firstName ?? ""} ${customer?.lastName ?? ""}`.trim();

  if (isMeLoading || isCustomerLoading || isSubmissionLoading) {
    return <AssessmentAnswersSkeleton />;
  }

  if (!canViewAnswers) return null;

  return (
    <main className="flex w-full flex-col gap-10 pb-10">
      <header className="flex flex-col gap-5 lg:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="type-meta flex items-center gap-2 text-content-subtle">
            <span>{t("customers")}</span>
            <span aria-hidden="true">/</span>
            <span>{t("assessmentAnswers")}</span>
          </div>
          <div>
            <h1 className="type-page-title font-bold text-content">
              {t("assessmentAnswers")}
            </h1>
            <p className="type-body mt-1 text-content-muted">
              {t("assessmentAnswersDescription")}
            </p>
          </div>
        </div>
        <BackButton
          text={t("backToClients")}
          clickHandler={() => router.back()}
        />
      </header>

      <section className="overflow-hidden rounded-3xl border border-(--color-palette-d9e9d2) bg-surface-raised">
        <div className="flex flex-col gap-5 bg-linear-to-br from-brand-soft to-(--color-palette-fffaf4) p-4 sm:p-6 md:flex-row md:items-center md:justify-between md:p-7.5">
          <div className="flex items-center gap-4">
            <div className="type-card-title flex size-16 shrink-0 items-center justify-center rounded-full bg-brand font-bold ring-4 ring-brand-contrast text-brand-contrast">
              {getInitials(customer?.firstName, customer?.lastName)}
            </div>
            <div>
              <h2 className="type-card-title font-bold text-content-strong">
                {customerName || t("customer")}
              </h2>
              <p className="type-body mt-1 text-content-muted">
                {customer?.email}
              </p>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 rounded-2xl bg-surface-raised/85 px-4 py-3 text-brand md:w-fit">
            <DateIcon className="text-current" />
            <div className="flex flex-col gap-0.5">
              <span className="type-meta font-medium text-content-subtle">
                {t("assessmentSubmittedAt")}
              </span>
              <span className="type-label font-semibold text-content-strong">
                {submittedAt ? formatDate(submittedAt, dateLocale) : "—"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-line-muted sm:grid-cols-3">
          <ProfileDetail
            label={t("currentWeight")}
            value={
              customer?.profile?.currentWeight
                ? `${customer.profile.currentWeight} ${t("kilogram")}`
                : "—"
            }
          />
          <ProfileDetail
            label={t("height")}
            value={
              customer?.profile?.height
                ? `${customer.profile.height} ${t("centimeter")}`
                : "—"
            }
          />
          <ProfileDetail
            label={t("customerSince")}
            value={
              customer?.createdAt
                ? formatDate(customer.createdAt, dateLocale)
                : "—"
            }
          />
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <div>
          <h2 className="type-page-title font-bold text-content">
            {t("assessmentResponses")}
          </h2>
          <p className="type-body mt-1 text-content-muted">
            {t("assessmentResponsesDescription")}
          </p>
        </div>

        {sections.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2 xl:gap-6">
            {sections.map((section, sectionIndex) => (
              <AssessmentSectionAnswers
                key={section.section}
                section={section}
                sectionIndex={sectionIndex}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-line-subtle bg-surface-raised px-6 py-16 text-center">
            <h3 className="type-card-title font-semibold text-content-strong">
              {t("noAssessmentAnswers")}
            </h3>
            <p className="type-body mt-2 text-content-subtle">
              {t("noAssessmentAnswersDescription")}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

const AssessmentSectionAnswers = ({
  section,
  sectionIndex,
}: {
  section: AssessmentSectionResult;
  sectionIndex: number;
}) => {
  const locale = useLocale();
  const sectionTitle = getLocalizedValue(section.sectionTitle, locale);

  return (
    <article className="overflow-hidden rounded-3xl border border-(--color-palette-e4eae1) bg-surface-raised">
      <header className="flex items-center gap-3 border-b border-(--color-palette-e4eae1) bg-linear-to-r from-(--color-palette-f6fbf4) to-surface-raised px-5 py-4 sm:px-6">
        <span className="type-label flex size-9 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-brand-contrast">
          {sectionIndex + 1}
        </span>
        <h3 className="type-card-title font-semibold text-content-strong">
          {sectionTitle}
        </h3>
      </header>

      <div className="divide-y divide-(--color-palette-eef0f2) bg-surface">
        {section.answers.map((answer, answerIndex) => (
          <QuestionAnswer
            key={answer.questionId}
            answer={answer}
            answerIndex={answerIndex}
          />
        ))}
      </div>
    </article>
  );
};

const QuestionAnswer = ({
  answer,
  answerIndex,
}: {
  answer: AssessmentAnswerResponse;
  answerIndex: number;
}) => {
  const locale = useLocale();
  const questionText = getLocalizedValue(answer.questionText, locale);
  const answerValue = getLocalizedValue(
    answer.answerText || answer.choiceText,
    locale,
  );
  const isWrittenResponse = Boolean(answer.answerText) && answerValue !== "—";

  return (
    <div className="flex flex-col gap-3.5 px-5 py-5 sm:px-6">
      <div className="flex gap-3">
        <span className="type-meta flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-neutral font-bold text-content-subtle">
          {answerIndex + 1}
        </span>
        <p className="type-body pt-0.5 font-medium text-content-strong">
          {questionText}
        </p>
      </div>
      {isWrittenResponse ? (
        <div className="ms-10 overflow-hidden rounded-2xl border border-line-muted bg-surface-muted px-4 py-4 sm:px-5">
          <p className="type-body max-w-none whitespace-pre-wrap wrap-break-word text-content-muted">
            {answerValue}
          </p>
        </div>
      ) : (
        <div className="ms-10 flex items-center gap-2.5 rounded-2xl border border-(--color-palette-dcecd6) bg-(--color-palette-f7fbf5) px-3.5 py-3">
          <div
            className={`size-5 bg-brand rounded-full flex justify-center items-center`}
          >
            <div className="size-2 rounded-full bg-surface-raised" />
          </div>
          <p className="type-label pt-0.5 font-semibold text-brand">
            {answerValue}
          </p>
        </div>
      )}
    </div>
  );
};

const ProfileDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex min-w-0 flex-col gap-1.5 bg-surface-raised px-3 py-4 text-center sm:px-6 sm:py-5">
    <span className="type-meta truncate text-content-subtle">{label}</span>
    <span className="type-label truncate font-semibold text-content-strong">
      {value}
    </span>
  </div>
);

const AssessmentAnswersSkeleton = () => (
  <main
    aria-busy="true"
    aria-label="Loading assessment answers"
    className="flex w-full min-w-0 flex-col gap-10 pb-10"
  >
    <header className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="size-2 rounded-full!" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <Skeleton className="h-7 w-full max-w-64" />
          <Skeleton className="h-5 w-full max-w-100" />
        </div>
      </div>
      <Skeleton className="h-12.5 w-full rounded-full md:w-36" />
    </header>

    <section className="min-w-0 overflow-hidden rounded-3xl border border-(--color-palette-d9e9d2) bg-surface-raised">
      <div className="flex flex-col gap-5 bg-linear-to-br from-brand-soft to-(--color-palette-fffaf4) p-4 sm:p-6 md:flex-row md:items-center md:justify-between md:p-7.5">
        <div className="flex min-w-0 items-center gap-4">
          <Skeleton className="size-16 shrink-0 rounded-full!" />
          <div className="flex min-w-0 flex-1 flex-col gap-2.5">
            <Skeleton className="h-7 w-full max-w-48" />
            <Skeleton className="h-4 w-full max-w-60" />
          </div>
        </div>
        <div className="flex min-h-15 w-full items-center gap-3 rounded-2xl border border-line-muted bg-surface-raised px-4 py-3 md:w-44">
          <Skeleton className="size-5 shrink-0 rounded-full!" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-full max-w-20" />
            <Skeleton className="h-4 w-full max-w-26" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-px bg-line-muted sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 bg-surface-raised px-3 py-4 sm:px-6 sm:py-5"
          >
            <Skeleton className="h-4 w-24 max-w-full" />
            <Skeleton className="h-5 w-18 max-w-full" />
          </div>
        ))}
      </div>
    </section>

    <section className="flex min-w-0 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-full max-w-64" />
        <Skeleton className="h-5 w-full max-w-100" />
      </div>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2 xl:gap-6">
        {Array.from({ length: 4 }, (_, sectionIndex) => (
          <article
            key={sectionIndex}
            className="min-w-0 overflow-hidden rounded-3xl border border-(--color-palette-e4eae1) bg-surface-raised"
          >
            <div className="flex min-w-0 items-center gap-3 border-b border-(--color-palette-e4eae1) bg-linear-to-r from-(--color-palette-f6fbf4) to-surface-raised px-5 py-4 sm:px-6">
              <Skeleton className="size-9 shrink-0 rounded-xl" />
              <Skeleton className="h-6 w-full max-w-52" />
            </div>
            <div className="divide-y divide-(--color-palette-eef0f2) bg-surface">
              {Array.from({ length: 2 }, (_, answerIndex) => (
                <AssessmentAnswerRowSkeleton
                  key={answerIndex}
                  written={sectionIndex === 3 && answerIndex === 1}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

const AssessmentAnswerRowSkeleton = ({ written }: { written: boolean }) => (
  <div className="flex min-w-0 flex-col gap-3.5 px-5 py-5 sm:px-6">
    <div className="flex min-w-0 gap-3">
      <Skeleton className="size-7 shrink-0 rounded-lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
        <Skeleton className="h-5 w-4/5 max-w-full" />
        <Skeleton className="h-4 w-3/5 max-w-full" />
      </div>
    </div>
    {written ? (
      <div className="ms-0 flex min-w-0 flex-col gap-2 rounded-2xl border border-line-muted bg-surface-muted px-4 py-4 min-[360px]:ms-10 sm:px-5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    ) : (
      <div className="ms-0 flex min-w-0 items-center gap-2.5 rounded-2xl border border-(--color-palette-dcecd6) bg-(--color-palette-f7fbf5) px-3.5 py-3 min-[360px]:ms-10">
        <Skeleton className="size-6 shrink-0 rounded-full" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-2/3 max-w-full" />
          <Skeleton className="h-3 w-2/5 max-w-full" />
        </div>
      </div>
    )}
  </div>
);

const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.at(0) ?? ""}${lastName?.at(0) ?? ""}`.toUpperCase() || "—";

export default AssessmentAnswersPage;
