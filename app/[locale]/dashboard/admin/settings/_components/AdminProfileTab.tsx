import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { motion } from "framer-motion";
import Error from "@/app/[locale]/components/Public/Error";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useTranslations } from "next-intl";

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

const AdminProfileTab = () => {
  const t = useTranslations();
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
      <motion.form
        onSubmit={handleSubmit(saveChanges)}
        className="my-6 flex w-full max-w-160 flex-col gap-6 rounded-2xl border border-[#E1E7EF] bg-[#FFFEFD] p-5 sm:my-10 sm:gap-7.5 sm:p-7.5"
      >
        <p className="type-card-title font-semibold">{t("dashboard.profileInformation")}</p>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="firstname" className="type-label w-fit">
            {t("dashboard.firstName")}
          </label>
          <input
            id="firstname"
            placeholder={t("dashboard.firstName")}
            defaultValue={me.firstName}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-[#D5D5D5] focus:ring-[#4D8E32] focus:ring-2 transition-all duration-150"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <Error msg={errors.firstName.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="lastname" className="type-label w-fit">
            {t("dashboard.lastName")}
          </label>
          <input
            id="lastname"
            placeholder={t("dashboard.lastName")}
            defaultValue={me.lastName}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-[#D5D5D5] focus:ring-[#4D8E32] focus:ring-2 transition-all duration-150"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <Error msg={errors.lastName.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="email" className="type-label w-fit">
            {t("dashboard.email")}
          </label>
          <input
            id="email"
            readOnly
            placeholder={t("dashboard.email")}
            value={me.email}
            className="px-3 py-2 rounded-xl border-none outline-none ring ring-[#D5D5D5] bg-gray-100"
          />
        </div>

        <button
          disabled={updateProfileMutation.isPending}
          className="type-control mt-5 flex min-h-12.5 items-center justify-center rounded-full bg-[#E99532] px-7.5 font-semibold text-white cursor-pointer"
        >
          {updateProfileMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">{t("dashboard.saveChanges")}</p>
          )}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AdminProfileTab;
