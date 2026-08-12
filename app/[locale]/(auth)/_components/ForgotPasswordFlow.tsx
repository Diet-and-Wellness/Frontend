"use client";

import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authApi } from "../../api/endpoints/auth.api";
import AuthField from "./auth/AuthField";
import AuthSubmitButton from "./auth/AuthSubmitButton";
import FormAlert from "./auth/FormAlert";
import PasswordField from "./auth/PasswordField";
import { getApiErrorMessage, getApiFieldErrors } from "./auth/authErrors";

type ResetStep = "email" | "otp" | "password" | "success";
type EmailForm = { email: string };
type OtpForm = { otp: string };
type PasswordForm = { newPassword: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ForgotPasswordFlow = ({ onBack }: { onBack: () => void }) => {
  const t = useTranslations();
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const emailForm = useForm<EmailForm>({
    mode: "onChange",
    defaultValues: { email: "" },
  });
  const otpForm = useForm<OtpForm>({
    mode: "onChange",
    defaultValues: { otp: "" },
  });
  const passwordForm = useForm<PasswordForm>({
    mode: "onChange",
    defaultValues: { newPassword: "" },
  });

  const clearMessages = () => {
    setServerError(null);
    setNotice(null);
  };

  const requestOtpMutation = useMutation({
    mutationFn: (formData: EmailForm) => authApi.forgetPassword(formData),
    onSuccess: (_, variables) => {
      setEmail(variables.email);
      otpForm.reset();
      setStep("otp");
      setServerError(null);
      setNotice(t("auth.resetOtpSent"));
    },
    onError: (error) => {
      const fieldError = getApiFieldErrors(error).email;
      if (fieldError) {
        emailForm.setError("email", { type: "server", message: fieldError });
      }
      setServerError(getApiErrorMessage(error, t("auth.resetOtpRequestFailed")));
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (formData: OtpForm) => {
      const { data } = await authApi.verifyResetOtp({ email, otp: formData.otp });
      if (!data?.data?.resetToken) throw new Error(t("auth.resetOtpVerifyFailed"));
      return data.data.resetToken;
    },
    onSuccess: (token) => {
      setResetToken(token);
      passwordForm.reset();
      setStep("password");
      clearMessages();
    },
    onError: (error) => {
      const fieldError = getApiFieldErrors(error).otp;
      if (fieldError) {
        otpForm.setError("otp", { type: "server", message: fieldError });
      }
      setServerError(getApiErrorMessage(error, t("auth.resetOtpVerifyFailed")));
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (formData: PasswordForm) => {
      if (!resetToken) throw new Error(t("auth.resetSessionExpired"));
      await authApi.resetPassword({
        resetToken,
        newPassword: formData.newPassword,
      });
    },
    onSuccess: () => {
      setResetToken(null);
      passwordForm.reset();
      setStep("success");
      clearMessages();
    },
    onError: (error) => {
      const fieldErrors = getApiFieldErrors(error);
      const passwordError = fieldErrors.newPassword ?? fieldErrors.password;
      if (passwordError) {
        passwordForm.setError("newPassword", {
          type: "server",
          message: passwordError,
        });
      }
      setServerError(getApiErrorMessage(error, t("auth.resetPasswordFailed")));
    },
  });

  const resendOtp = () => {
    clearMessages();
    requestOtpMutation.mutate({ email });
  };

  const changeEmail = () => {
    clearMessages();
    setResetToken(null);
    otpForm.reset();
    setStep("email");
  };

  const isPending =
    requestOtpMutation.isPending ||
    verifyOtpMutation.isPending ||
    resetPasswordMutation.isPending;

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-xl flex-col gap-5 p-3 md:p-6 lg:p-10"
      >
        <div
          role="status"
          className="rounded-2xl border border-success/25 bg-success-soft p-5 text-success"
        >
          <h1 className="type-title font-bold">{t("auth.resetPasswordSuccessTitle")}</h1>
          <p className="type-body mt-2">{t("auth.resetPasswordSuccessDescription")}</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="type-control flex h-12.5 cursor-pointer items-center justify-center rounded-full bg-accent font-semibold text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t("auth.backToSignIn")}
        </button>
      </motion.div>
    );
  }

  const title =
    step === "email"
      ? t("auth.forgotPasswordTitle")
      : step === "otp"
        ? t("auth.verifyResetOtpTitle")
        : t("auth.newPasswordTitle");
  const description =
    step === "email"
      ? t("auth.forgotPasswordDescription")
      : step === "otp"
        ? t("auth.verifyResetOtpDescription", { email })
        : t("auth.newPasswordDescription");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full max-w-xl flex-col gap-5 p-3 md:p-6 lg:p-10"
    >
      <div>
        <p className="type-label mb-2 font-semibold text-brand">
          {t("auth.passwordReset")}
        </p>
        <h1 className="type-display font-extrabold text-content-strong">{title}</h1>
        <p className="type-body mt-2 text-content-muted">{description}</p>
      </div>

      <FormAlert message={serverError} />
      <AnimatePresence initial={false}>
        {notice && (
          <motion.p
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-success/25 bg-success-soft px-4 py-3 type-label font-medium text-success"
          >
            {notice}
          </motion.p>
        )}
      </AnimatePresence>

      {step === "email" && (
        <form
          noValidate
          onSubmit={emailForm.handleSubmit((formData) => {
            clearMessages();
            requestOtpMutation.mutate(formData);
          })}
          className="flex flex-col gap-5"
        >
          <AuthField
            type="email"
            label={t("placeholders.email")}
            required
            autoFocus
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={t("placeholders.enterYourEmail")}
            disabled={isPending}
            error={emailForm.formState.errors.email?.message}
            registration={emailForm.register("email", {
              required: t("auth.emailRequired"),
              pattern: { value: emailPattern, message: t("auth.invalidEmail") },
              setValueAs: (value: string) => value.trim().toLowerCase(),
              onChange: clearMessages,
            })}
          />
          <AuthSubmitButton
            label={t("auth.sendResetOtp")}
            pending={requestOtpMutation.isPending}
            disabled={!emailForm.formState.isValid || isPending}
          />
        </form>
      )}

      {step === "otp" && (
        <form
          noValidate
          onSubmit={otpForm.handleSubmit((formData) => {
            clearMessages();
            verifyOtpMutation.mutate(formData);
          })}
          className="flex flex-col gap-5"
        >
          <AuthField
            type="text"
            label={t("auth.resetOtp")}
            required
            autoFocus
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            placeholder={t("auth.resetOtpPlaceholder")}
            disabled={isPending}
            error={otpForm.formState.errors.otp?.message}
            registration={otpForm.register("otp", {
              required: t("auth.resetOtpRequired"),
              pattern: { value: /^\d{6}$/, message: t("auth.resetOtpInvalid") },
              setValueAs: (value: string) => value.trim(),
              onChange: clearMessages,
            })}
          />
          <AuthSubmitButton
            label={t("auth.verifyResetOtp")}
            pending={verifyOtpMutation.isPending}
            disabled={!otpForm.formState.isValid || isPending}
          />
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
            <button
              type="button"
              onClick={resendOtp}
              disabled={isPending}
              className="type-label cursor-pointer rounded font-semibold text-brand underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("auth.resendResetOtp")}
            </button>
            <button
              type="button"
              onClick={changeEmail}
              disabled={isPending}
              className="type-label cursor-pointer rounded font-semibold text-content-muted underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("auth.changeEmail")}
            </button>
          </div>
        </form>
      )}

      {step === "password" && (
        <form
          noValidate
          onSubmit={passwordForm.handleSubmit((formData) => {
            clearMessages();
            resetPasswordMutation.mutate(formData);
          })}
          className="flex flex-col gap-5"
        >
          <PasswordField
            label={t("auth.newPassword")}
            placeholder={t("auth.newPasswordPlaceholder")}
            showLabel={t("auth.showPassword")}
            hideLabel={t("auth.hidePassword")}
            autoComplete="new-password"
            disabled={isPending}
            error={passwordForm.formState.errors.newPassword?.message}
            registration={passwordForm.register("newPassword", {
              required: t("auth.passwordRequired"),
              validate: {
                length: (value) => value.length >= 8 || t("auth.passwordMinLength"),
                upperLower: (value) =>
                  (/[a-z]/.test(value) && /[A-Z]/.test(value)) ||
                  t("auth.passwordUpperLower"),
                number: (value) => /\d/.test(value) || t("auth.passwordNumber"),
                special: (value) =>
                  /[^A-Za-z0-9]/.test(value) || t("auth.passwordSpecial"),
              },
              onChange: clearMessages,
            })}
          />
          <p className="type-caption -mt-2 text-content-muted">
            {t("auth.passwordHint")}
          </p>
          <AuthSubmitButton
            label={t("auth.resetPassword")}
            pending={resetPasswordMutation.isPending}
            disabled={!passwordForm.formState.isValid || isPending}
          />
        </form>
      )}

      <button
        type="button"
        onClick={step === "email" ? onBack : changeEmail}
        disabled={isPending}
        className="type-label mx-auto cursor-pointer rounded font-semibold text-content-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        {step === "email" ? t("auth.backToSignIn") : t("auth.startOver")}
      </button>
    </motion.div>
  );
};

export default ForgotPasswordFlow;
