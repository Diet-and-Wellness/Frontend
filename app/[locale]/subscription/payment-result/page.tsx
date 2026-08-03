"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PaymentSuccessIcon } from "../../components/icons/SuccessIcon";
import { PaymentPendingIcon } from "../../components/icons/PendingIcon";
import { PaymentFailedIcon } from "../../components/icons/FailIcon";
import { useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "../../api/endpoints/subscription.api";
import Spinner from "../../components/Public/LoadingSpinner";
import React from "react";

const PaymentResultPage = () => {
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
    <main className="flex min-h-screen items-center justify-center bg-surface-subtle px-4">
      {isLoading ? (
        <div className="">
          <Spinner spinnerSize={60} />
        </div>
      ) : (
        <section className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 text-center">
          {success && (
            <StatusBodyCard
              color="text-success"
              icon={<PaymentSuccessIcon />}
              title="Payment successful"
              message={subscription.message}
            />
          )}

          {pending && (
            <StatusBodyCard
              color="text-warning"
              icon={<PaymentPendingIcon />}
              title="Payment pending"
              message={subscription.message}
            />
          )}

          {failed && (
            <StatusBodyCard
              color="text-danger"
              icon={<PaymentFailedIcon />}
              title="Payment failed"
              message={subscription.message}
            />
          )}

          <div className="mt-6 space-y-2 rounded-2xl bg-surface-muted p-4 text-start">
            <p className="text-content-muted">
              Order ID:{" "}
              <span className="font-medium text-content">{orderId ?? "-"}</span>
            </p>

            <p className="text-content-muted">
              Amount:{" "}
              <span className="font-medium text-content">{amount} EGP</span>
            </p>
          </div>

          <div className="flex gap-2.5 mt-7.5">
            <button
              onClick={() => router.replace("/")}
              className="h-11 w-full bg-accent text- rounded-full font-semibold cursor-pointer"
            >
              Go to Home
            </button>
            {success || pending || (
              <button
                onClick={() => router.replace("/pricing")}
                className="h-11 w-full bg-brand rounded-full font-semibold cursor-pointer"
              >
                Try Again
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
