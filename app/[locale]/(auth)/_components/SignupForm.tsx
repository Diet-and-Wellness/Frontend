"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { authApi } from "../../api/endpoints/auth.api";
import type {
  GoogleAuthResponse,
  SignupRequest,
} from "../../api/types/auth.types";
import AuthField from "./auth/AuthField";
import AuthSubmitButton from "./auth/AuthSubmitButton";
import CountrySelect from "./auth/CountrySelect";
import FormAlert from "./auth/FormAlert";
import GoogleAuthButton from "./auth/GoogleAuthButton";
import PasswordField from "./auth/PasswordField";
import {
  getApiErrorCode,
  getApiErrorMessage,
  getApiFieldErrors,
} from "./auth/authErrors";
import { getGoogleAuthDestination } from "./auth/authFlow";

type FormData = SignupRequest;

const formFieldNames: Array<keyof FormData> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "country",
  "password",
];

const SignupForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      password: "",
    },
  });

  const clearServerError = () => setServerError(null);

  const signupMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await authApi.signup(formData);
    },
    onSuccess: () => {
      router.replace("/signin");
    },
    onError: (error) => {
      const fieldErrors = getApiFieldErrors(error);

      formFieldNames.forEach((field) => {
        const message = fieldErrors[field];
        if (message) setError(field, { type: "server", message });
      });

      setServerError(getApiErrorMessage(error, t("auth.signupFailed")));
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

  const isSubmitting = signupMutation.isPending || googleMutation.isPending;

  const onSubmit = (formData: FormData) => {
    clearServerError();
    signupMutation.mutate(formData);
  };

  return (
    <motion.form
      noValidate
      initial={{ y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 p-3 md:p-6 lg:p-10"
    >
      <div>
        <h1 className="type-display font-extrabold text-content-strong">
          {t("auth.createAccount")}
        </h1>
        <p className="type-body mt-2 text-content-muted">
          {t("auth.signupSubtitle")}
        </p>
      </div>

      <FormAlert message={serverError} />

      <GoogleAuthButton
        label={t("auth.signUpWithGoogle")}
        loadingLabel={t("auth.loadingGoogle")}
        dividerLabel={t("auth.continueWithEmail")}
        mode="signup"
        disabled={isSubmitting}
        onCredential={(credential) => {
          clearServerError();
          googleMutation.mutate(credential);
        }}
        onError={() => setServerError(t("auth.googleLoadFailed"))}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          label={t("placeholders.firstName")}
          required
          autoComplete="given-name"
          placeholder={t("placeholders.firstName")}
          disabled={isSubmitting}
          error={errors.firstName?.message}
          registration={register("firstName", {
            required: t("auth.firstNameRequired"),
            minLength: { value: 2, message: t("auth.nameTooShort") },
            maxLength: { value: 50, message: t("auth.nameTooLong") },
            setValueAs: (value: string) => value.trim(),
            onChange: clearServerError,
          })}
        />

        <AuthField
          label={t("placeholders.lastName")}
          required
          autoComplete="family-name"
          placeholder={t("placeholders.lastName")}
          disabled={isSubmitting}
          error={errors.lastName?.message}
          registration={register("lastName", {
            required: t("auth.lastNameRequired"),
            minLength: { value: 2, message: t("auth.nameTooShort") },
            maxLength: { value: 50, message: t("auth.nameTooLong") },
            setValueAs: (value: string) => value.trim(),
            onChange: clearServerError,
          })}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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

        <AuthField
          type="tel"
          label={t("placeholders.phoneNumber")}
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+20 10 1234 5678"
          disabled={isSubmitting}
          error={errors.phone?.message}
          registration={register("phone", {
            required: t("auth.phoneRequired"),
            pattern: {
              value: /^\+?[0-9\s()-]{7,20}$/,
              message: t("auth.invalidPhone"),
            },
            setValueAs: (value: string) => value.trim(),
            onChange: clearServerError,
          })}
        />
      </div>

      <Controller
        name="country"
        control={control}
        rules={{ required: t("auth.countryRequired") }}
        render={({ field }) => (
          <CountrySelect
            label={t("auth.country")}
            value={field.value}
            onChange={(countryCode) => {
              field.onChange(countryCode);
              clearServerError();
            }}
            onBlur={field.onBlur}
            placeholder={t("auth.selectCountry")}
            searchPlaceholder={t("auth.searchCountries")}
            noResults={t("auth.noCountriesFound")}
            disabled={isSubmitting}
            error={errors.country?.message}
          />
        )}
      />

      <PasswordField
        label={t("placeholders.password")}
        placeholder={t("auth.passwordPlaceholder")}
        showLabel={t("auth.showPassword")}
        hideLabel={t("auth.hidePassword")}
        autoComplete="new-password"
        disabled={isSubmitting}
        error={errors.password?.message}
        registration={register("password", {
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
          onChange: clearServerError,
        })}
      />

      {!errors.password && (
        <p className="type-meta -mt-3 text-content-subtle">
          {t("auth.passwordHint")}
        </p>
      )}

      <AuthSubmitButton
        label={t("auth.signUp")}
        pending={signupMutation.isPending}
        disabled={!isValid || isSubmitting}
      />

      <div className="flex flex-wrap items-center justify-center gap-2 text-center">
        <p className="type-label font-medium text-content-muted">
          {t("auth.alreadyAccount")}
        </p>
        <Link
          href="/signin"
          className="type-label rounded font-semibold text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {t("auth.signIn")}
        </Link>
      </div>
    </motion.form>
  );
};

export default SignupForm;
