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
  const t = useTranslations("dashboard");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>();

  const router = useRouter();

  const queryClient = useQueryClient();

  const saveChanges = async (formData: ChangePasswordType) => {
    changePasswordMutation.mutate(formData);
  };

  const changePasswordMutation = useMutation({
    mutationFn: async (formData: ChangePasswordType) => {
      void formData;
      // await profileApi.updateMyProfile(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      router.replace("/dashboard/admin");
    },
  });

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
        className="my-6 flex w-full max-w-160 flex-col gap-6 rounded-2xl border border-[#E1E7EF] bg-[#FFFEFD] p-5 sm:my-10 sm:gap-7.5 sm:p-7.5"
      >
        <p className="type-card-title font-semibold">{t("securityAndPassword")}</p>

        <div className="flex gap-5 items-center border-b border-[#E1E7EF] py-5">
          <div className="size-16 rounded-full flex justify-center items-center bg-[#E4EEE0] shrink-0">
            <SecurityIcon />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="type-label font-bold">{t("keepAccountSecure")}</h4>
            <p className="type-meta text-[#4F4F4F]">
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
            type="password"
            id="currentPassword"
            placeholder={t("currentPassword")}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-[#D5D5D5] focus:ring-[#4D8E32] focus:ring-2 transition-all duration-150"
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
            type="password"
            id="newPassword"
            placeholder={t("newPassword")}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-[#D5D5D5] focus:ring-[#4D8E32] focus:ring-2 transition-all duration-150"
            {...register("newPassword", {
              required: "New Password is required",
            })}
          />
          {errors.newPassword && <Error msg={errors.newPassword.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="type-label w-fit">
            {t("confirmNewPassword")}
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            placeholder={t("confirmNewPassword")}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-[#D5D5D5] focus:ring-[#4D8E32] focus:ring-2 transition-all duration-150"
          />
        </div>

        <div className="flex flex-col gap-2.5 bg-[#FDF4EB] p-5 rounded-2xl">
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
          disabled={changePasswordMutation.isPending}
          className="type-control mt-5 flex min-h-12.5 items-center justify-center rounded-full bg-[#E99532] px-7.5 font-semibold text-white cursor-pointer"
        >
          {changePasswordMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">{t("updatePassword")}</p>
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
      <p className="type-meta text-[#4F4F4F]">{passwordRequirement}</p>
    </div>
  );
};

export default SecurityTab;
