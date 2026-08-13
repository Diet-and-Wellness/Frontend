"use client";

import { useForm } from "react-hook-form";
import CheckIcon from "@/app/[locale]/components/icons/CheckIcon";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SecurityIcon from "@/app/[locale]/components/icons//SecurityIcon";
import Error from "@/app/[locale]/components/Public/Error";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useTranslations } from "next-intl";
import { authApi } from "@/app/[locale]/api/endpoints/auth.api";
import { useState } from "react";
import axios from "axios";

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
} as const;

type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const passwordRequirements = [
  "passwordMinLength",
  "passwordUpperLower",
  "passwordNumber",
  "passwordSpecial",
];

const SecurityTab = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const t = useTranslations("dashboard");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<ChangePasswordType>({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const router = useRouter();

  const queryClient = useQueryClient();

  const saveChanges = async (formData: ChangePasswordType) => {
    changePasswordMutation.mutate(formData);
  };

  const changePasswordMutation = useMutation({
    mutationFn: async (formData: ChangePasswordType) => {
      void formData;
      return await authApi.updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
    },
    onSuccess: async () => {
      setUpdateError(null);
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      router.replace("/dashboard/admin");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          setUpdateError(
            "Too many password change attempts. Please try again later.",
          );
          return;
        }
        setUpdateError(
          error.response?.data?.message ||
            "Something went wrong while updating your password.",
        );
        return;
      }
      setUpdateError("Something went wrong. Please try again.");
    },
  });

  console.log(updateError);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <form
        onSubmit={handleSubmit(saveChanges)}
        className="my-6 flex w-full max-w-160 flex-col gap-6 rounded-2xl border border-line bg-surface p-5 sm:my-10 sm:gap-7.5 sm:p-7.5"
      >
        <p className="type-card-title font-semibold">
          {t("securityAndPassword")}
        </p>

        <div className="flex gap-5 items-center border-b border-line py-5">
          <div className="size-16 rounded-full flex justify-center items-center bg-(--color-palette-e4eee0) shrink-0">
            <SecurityIcon />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="type-label font-bold">{t("keepAccountSecure")}</h4>
            <p className="type-meta text-content-muted">
              {t("securityDescription")}
            </p>
          </div>
        </div>

        <p className="type-card-title font-semibold">{t("changePassword")}</p>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="Current Password" className="type-label w-fit">
            {t("currentPassword")}
          </label>
          <input
            type="text"
            id="currentPassword"
            placeholder={t("currentPassword")}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-brand focus:ring-2 transition-all duration-150"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />
          {errors.currentPassword && (
            <Error msg={errors.currentPassword.message} />
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="New Password" className="type-label w-fit">
            {t("newPassword")}
          </label>
          <input
            type="text"
            id="newPassword"
            placeholder={t("newPassword")}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-brand focus:ring-2 transition-all duration-150"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                message:
                  "Password must contain uppercase, lowercase, number and special character",
              },
            })}
          />
          {errors.newPassword && <Error msg={errors.newPassword.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="type-label w-fit">
            {t("confirmNewPassword")}
          </label>
          <input
            type="text"
            id="confirmNewPassword"
            placeholder={t("confirmNewPassword")}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-brand focus:ring-2 transition-all duration-150"
            {...register("confirmNewPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
        </div>

        {errors.confirmNewPassword && (
          <Error msg={errors.confirmNewPassword.message} />
        )}

        {updateError && <Error msg={updateError} />}

        <div className="flex flex-col gap-2.5 bg-accent-softer p-5 rounded-2xl">
          <p className="type-label mb-2.5 font-medium">
            {t("passwordRequirements")}
          </p>
          {passwordRequirements.map((passwordReq, idx) => (
            <PasswordRequirement
              key={idx}
              passwordRequirement={t(passwordReq)}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isValid || changePasswordMutation.isPending}
          className="
          type-control mt-5 flex min-h-12.5 items-center justify-center
          rounded-full bg-accent px-7.5 font-semibold text-white
          cursor-pointer
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        >
          {changePasswordMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p>{t("updatePassword")}</p>
          )}
        </button>
      </form>
    </motion.div>
  );
};

const PasswordRequirement = ({
  passwordRequirement,
}: {
  passwordRequirement: string;
}) => {
  return (
    <div className="flex gap-3 items-center">
      <CheckIcon />
      <p className="type-meta text-content-muted">{passwordRequirement}</p>
    </div>
  );
};

export default SecurityTab;
