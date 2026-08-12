"use client";

import AuthField from "@/app/[locale]/(auth)/_components/auth/AuthField";
import AuthSubmitButton from "@/app/[locale]/(auth)/_components/auth/AuthSubmitButton";
import FormAlert from "@/app/[locale]/(auth)/_components/auth/FormAlert";
import { getApiErrorMessage } from "@/app/[locale]/(auth)/_components/auth/authErrors";
import { getRoleDestination } from "@/app/[locale]/(auth)/_components/auth/authFlow";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { LogoLoader } from "@/app/[locale]/components/Public/Skeletons";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { useRouter } from "@/i18n/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type CompleteProfileData = {
  phone: string;
};

const CompleteProfileForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useMe();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<CompleteProfileData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { phone: "" },
  });

  useEffect(() => {
    if (!isLoading && !me) {
      router.replace("/signin");
      return;
    }

    if (me?.phone) router.replace(getRoleDestination(me));
  }, [isLoading, me, router]);

  const completeProfileMutation = useMutation({
    mutationFn: (formData: CompleteProfileData) =>
      profileApi.updateMyProfile({ phone: formData.phone }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      if (me) router.replace(getRoleDestination(me));
      router.refresh();
    },
    onError: (error) => {
      const message = getApiErrorMessage(
        error,
        t("auth.profileCompletionFailed"),
      );

      setError("phone", { type: "server", message });
      setServerError(message);
    },
  });

  if (isLoading || !me || Boolean(me.phone)) return <LogoLoader />;

  return (
    <motion.form
      noValidate
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit((formData) => {
        setServerError(null);
        completeProfileMutation.mutate(formData);
      })}
      className="flex w-full max-w-xl flex-col gap-6 rounded-3xl border border-line bg-surface-raised p-6 shadow-[0_24px_70px_rgba(35,64,22,0.12)] sm:p-9"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-7"
          >
            <path
              d="M8 3.5h8a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M10 6h4M11 17.5h2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand">
          {t("auth.profileCompletionStep")}
        </span>
      </div>

      <div>
        <h1 className="type-page-title font-bold text-content-strong">
          {t("auth.completeProfileTitle")}
        </h1>
        <p className="type-body mt-2 text-content-muted">
          {t("auth.completeProfileDescription")}
        </p>
      </div>

      <FormAlert message={serverError} />

      <AuthField
        type="tel"
        label={t("placeholders.phoneNumber")}
        required
        autoComplete="tel"
        inputMode="tel"
        placeholder="+20 10 1234 5678"
        disabled={completeProfileMutation.isPending}
        error={errors.phone?.message}
        registration={register("phone", {
          required: t("auth.phoneRequired"),
          pattern: {
            value: /^\+?[0-9\s()-]{7,20}$/,
            message: t("auth.invalidPhone"),
          },
          setValueAs: (value: string) => value.trim(),
          onChange: () => setServerError(null),
        })}
      />

      <AuthSubmitButton
        label={t("auth.completeProfileSubmit")}
        pending={completeProfileMutation.isPending}
        disabled={!isValid}
      />
    </motion.form>
  );
};

export default CompleteProfileForm;
