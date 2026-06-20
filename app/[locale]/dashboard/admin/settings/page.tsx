"use client";

import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import CheckIcon from "@/app/[locale]/components/icons/CheckIcon";
import SecurityIcon from "@/app/[locale]/components/icons/SecurityIcon";
import Error from "@/app/[locale]/components/Public/Error";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <section className="w-full">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-[30px]">Settings</h3>
        <p className="text-[#4F4F4F] text-[20px]">
          Manage your admin profile and account security .
        </p>
      </div>

      <div className="flex gap-10 mt-7.5">
        <Tab
          label="Profile"
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <Tab
          label="Security"
          isActive={activeTab === "security"}
          onClick={() => setActiveTab("security")}
        />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "profile" ? (
          <ProfileComp key="profile" />
        ) : (
          <SecurityComp key="security" />
        )}
      </AnimatePresence>
    </section>
  );
};

const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 text-[20px] cursor-pointer ${isActive ? "text-[#E99532] shadow-[0_2px_0_0_#E99532]" : "text-[#4F4F4F]"} transition-all duration-300`}
    >
      {label}
    </button>
  );
};

export default SettingsPage;

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

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

const ProfileComp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: me } = useMe();

  const saveChanges = async (formData: FormData) => {
    updateProfileMutation.mutate(formData);
  };

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Specialist form data =====> ", formData);
      await profileApi.updateMyProfile(formData);
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
        className="border border-[#E1E7EF] rounded-2xl bg-[#FFFEFD] max-w-160 my-10 p-7.5 flex flex-col gap-7.5"
      >
        <p className="text-[20px] font-semibold">Profile information</p>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="firstname" className="text-[16px] w-fit">
            First Name
          </label>
          <input
            id="firstname"
            placeholder={"First Name"}
            defaultValue={me.firstName}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <Error msg={errors.firstName.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="lastname" className="text-[16px] w-fit">
            Last Name
          </label>
          <input
            id="lastname"
            placeholder={"Last Name"}
            defaultValue={me.lastName}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <Error msg={errors.lastName.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="text-[16px] w-fit">
            Email
          </label>
          <input
            id="email"
            readOnly
            placeholder={"Email"}
            value={me.email}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] bg-gray-100"
          />
        </div>

        <button
          disabled={updateProfileMutation.isPending}
          className="mt-5 px-7.5 min-h-12.5 bg-[#E99532] rounded-2xl text-white font-semibold text-lg cursor-pointer flex justify-center items-center"
        >
          {updateProfileMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">Save Changes</p>
          )}
        </button>
      </form>
    </motion.div>
  );
};

type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const passwordRequirements = [
  "At least 8 characters long",
  "Contains uppercase and lowercase letters",
  "Contains a number",
  "Contains a special character (e.g.! @ # $ %)",
];

const SecurityComp = () => {
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
      console.log("Specialist form data =====> ", formData);
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
        className="border border-[#E1E7EF] rounded-2xl bg-[#FFFEFD] max-w-160 my-10 p-7.5 flex flex-col gap-7.5"
      >
        <p className="text-[20px] font-semibold">Security & Password</p>

        <div className="flex gap-5 items-center border-b border-[#E1E7EF] py-5">
          <div className="size-16 rounded-full flex justify-center items-center bg-[#E4EEE0]">
            <SecurityIcon />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-[16px] font-bold">Keep Your account secure</h4>
            <p className="text-[13px] text-[#4F4F4F]">
              Use strong password and enable 2FA to protect your account.
            </p>
          </div>
        </div>

        <p className="text-[20px] font-semibold">Change Password</p>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="Current Password" className="text-[16px] w-fit">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            placeholder={"Current Password"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />
          {errors.currentPassword && (
            <Error msg={errors.currentPassword.message} />
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="New Password" className="text-[16px] w-fit">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder={"New Password"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("newPassword", {
              required: "New Password is required",
            })}
          />
          {errors.newPassword && <Error msg={errors.newPassword.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="text-[16px] w-fit">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            placeholder={"Confirm New Password"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
          />
        </div>

        <div className="flex flex-col gap-2.5 bg-[#FDF4EB] p-5 rounded-2xl">
          <p className="text-[16px] font-medium mb-2.5">
            Password requirements:
          </p>
          {passwordRequirements.map((passwordReq, idx) => (
            <PasswordRequirement key={idx} passwordRequirement={passwordReq} />
          ))}
        </div>

        <button
          disabled={changePasswordMutation.isPending}
          className="mt-5 px-7.5 min-h-12.5 bg-[#E99532] rounded-2xl text-white font-semibold text-lg cursor-pointer flex justify-center items-center"
        >
          {changePasswordMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">Update Password</p>
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
      <p className="text-[14px] text-[#4F4F4F]">{passwordRequirement}</p>
    </div>
  );
};
