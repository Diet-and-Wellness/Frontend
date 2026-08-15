"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { PaymentSuccessIcon } from "../../components/icons/SuccessIcon";
import { PaymentPendingIcon } from "../../components/icons/PendingIcon";
import { PaymentFailedIcon } from "../../components/icons/FailIcon";
import { subscriptionApi } from "../../api/endpoints/subscription.api";
import { LogoLoader } from "../../components/Public/Skeletons";

const PaymentResultPage = () => {
  const t = useTranslations("paymentResult");

  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");

  const amountCents = Number(searchParams.get("amount_cents") ?? 0);
  const amount = amountCents / 100;

  const { data: subscription, isLoading } = useQuery({
    queryKey: ["subscription", orderId],
    queryFn: async () => {
      const { data } = await subscriptionApi.getMyPurchaseStatus(orderId ?? "");
      return data;
    },
    enabled: !!orderId,
  });

  const success = subscription?.status === "success";
  const pending = subscription?.status === "pending";
  const failed = subscription?.status === "failed";

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-subtle">
      {isLoading ? (
        <div className="w-full">
          <LogoLoader />
        </div>
      ) : (
        <section className="w-[90%] max-w-lg rounded-3xl border border-line bg-surface p-6 text-center">
          {success && (
            <StatusBodyCard
              color="text-success"
              icon={<PaymentSuccessIcon />}
              title={t("status.success.title")}
              message={t("status.success.message")}
            />
          )}

          {pending && (
            <StatusBodyCard
              color="text-warning"
              icon={<PaymentPendingIcon />}
              title={t("status.pending.title")}
              message={t("status.pending.message")}
            />
          )}

          {failed && (
            <StatusBodyCard
              color="text-danger"
              icon={<PaymentFailedIcon />}
              title={t("status.failed.title")}
              message={t("status.failed.message")}
            />
          )}

          <div className="mt-6 space-y-2 rounded-2xl bg-surface-muted p-4 text-start">
            <p className="text-content-muted">
              {t("orderId")}:{" "}
              <span className="font-medium text-content">{orderId ?? "-"}</span>
            </p>

            <p className="text-content-muted">
              {t("amount")}:{" "}
              <span className="font-medium text-content">
                {amount} {t("currency")}
              </span>
            </p>
          </div>

          <div className="mt-7.5 flex gap-2.5">
            <button
              onClick={() => router.replace("/nutrition-analysis")}
              className="h-11 w-full cursor-pointer rounded-full bg-accent font-semibold"
            >
              {t("actions.continue")}
            </button>

            {!success && !pending && (
              <button
                onClick={() => router.replace("/pricing")}
                className="h-11 w-full cursor-pointer rounded-full bg-brand font-semibold"
              >
                {t("actions.tryAgain")}
              </button>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

const StatusBodyCard = ({
  color,
  title,
  message,
  icon,
}: {
  color: string;
  title: string;
  message: string;
  icon: React.ReactElement;
}) => {
  return (
    <div>
      {icon}
      <h1 className={`type-page-title font-semibold ${color}`}>{title}</h1>
      <p className="mt-3 text-content-muted">{message}</p>
    </div>
  );
};

export default PaymentResultPage;
