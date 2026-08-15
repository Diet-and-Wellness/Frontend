"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authApi } from "../../api/endpoints/auth.api";
import type {
  GoogleAuthResponse,
  LoginRequest,
} from "../../api/types/auth.types";
import AuthField from "./auth/AuthField";
import AuthSubmitButton from "./auth/AuthSubmitButton";
import FormAlert from "./auth/FormAlert";
import GoogleAuthButton from "./auth/GoogleAuthButton";
import PasswordField from "./auth/PasswordField";
import {
  getApiErrorCode,
  getApiErrorMessage,
  getApiFieldErrors,
} from "./auth/authErrors";
import { getGoogleAuthDestination } from "./auth/authFlow";
import ForgotPasswordFlow from "./ForgotPasswordFlow";

type FormData = LoginRequest;

const SigninForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: { email: "", password: "" },
  });

  const clearServerError = () => setServerError(null);

  const loginMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await authApi.login(formData);
      return data?.data ?? {};
    },
    onSuccess: (me) => {
      queryClient.setQueryData(["me"], me);
    },
    onError: (error) => {
      const fieldErrors = getApiFieldErrors(error);
      if (fieldErrors.email) {
        setError("email", { type: "server", message: fieldErrors.email });
      }
      if (fieldErrors.password) {
        setError("password", {
          type: "server",
          message: fieldErrors.password,
        });
      }

      setServerError(getApiErrorMessage(error, t("auth.loginFailed")));
    },
  });

  const googleMutation = useMutation({
    mutationFn: async (credential: string) => {
      const { data } = await authApi.google({ credential });
      return data;
    },
    onSuccess: (result: GoogleAuthResponse) => {
      queryClient.removeQueries({ queryKey: ["me"] });
      router.replace(getGoogleAuthDestination(result.data, result.meta));
      router.refresh();
    },
    onError: (error) => {
      const message =
        getApiErrorCode(error) === "GOOGLE_ACCOUNT_LINK_REQUIRED"
          ? t("auth.googleLinkRequired")
          : getApiErrorMessage(error, t("auth.googleSignInFailed"));

      setServerError(message);
    },
  });

  const isSubmitting = loginMutation.isPending || googleMutation.isPending;

  const onSubmit = (formData: FormData) => {
    clearServerError();
    loginMutation.mutate(formData);
  };

  if (showForgotPassword) {
    return <ForgotPasswordFlow onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <motion.form
      noValidate
      initial={{ y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-xl flex-col gap-5 p-3 md:p-6 lg:p-10"
    >
      <div>
        <h1 className="type-display font-extrabold text-content-strong">
          {t("auth.signIn")}
        </h1>
        <p className="type-body mt-2 text-content-muted">
          {t("auth.loginSubtitle")}
        </p>
      </div>

      <FormAlert message={serverError} />

      <GoogleAuthButton
        label={t("auth.signInWithGoogle")}
        loadingLabel={t("auth.loadingGoogle")}
        dividerLabel={t("auth.continueWithEmail")}
        mode="signin"
        disabled={isSubmitting}
        onCredential={(credential) => {
          clearServerError();
          googleMutation.mutate(credential);
        }}
        onError={() => setServerError(t("auth.googleLoadFailed"))}
      />

      <AuthField
        type="email"
        label={t("placeholders.email")}
        required
        autoComplete="email"
        inputMode="email"
        autoCapitalize="none"
        spellCheck={false}
        placeholder={t("placeholders.enterYourEmail")}
        disabled={isSubmitting}
        error={errors.email?.message}
        registration={register("email", {
          required: t("auth.emailRequired"),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            message: t("auth.invalidEmail"),
          },
          setValueAs: (value: string) => value.trim().toLowerCase(),
          onChange: clearServerError,
        })}
      />

      <PasswordField
        label={t("placeholders.password")}
        placeholder={t("auth.passwordPlaceholder")}
        showLabel={t("auth.showPassword")}
        hideLabel={t("auth.hidePassword")}
        autoComplete="current-password"
        disabled={isSubmitting}
        error={errors.password?.message}
        registration={register("password", {
          required: t("auth.passwordRequired"),
          onChange: clearServerError,
        })}
      />

      <AuthSubmitButton
        label={t("auth.signIn")}
        pending={loginMutation.isPending}
        disabled={!isValid || isSubmitting}
      />

      <button
        type="button"
        onClick={() => {
          clearServerError();
          setShowForgotPassword(true);
        }}
        disabled={isSubmitting}
        className="type-label -mt-1 cursor-pointer self-center rounded font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
      >
        {t("auth.forgotPassword")}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2 text-center">
        <p className="type-label font-medium text-content-muted">
          {t("auth.noAccount")}
        </p>
        <Link
          href="/signup"
          className="type-label rounded font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {t("auth.signUp")}
        </Link>
      </div>
    </motion.form>
  );
};

export default SigninForm;
