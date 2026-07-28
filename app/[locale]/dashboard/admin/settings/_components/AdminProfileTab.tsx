import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { motion } from "framer-motion";
import Error from "@/app/[locale]/components/Public/Error";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";

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
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32] focus:ring-2"
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
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32] focus:ring-2"
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
          className="mt-5 px-7.5 min-h-12.5 bg-[#E99532] rounded-full text-white font-semibold text-lg cursor-pointer flex justify-center items-center"
        >
          {updateProfileMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">Save Changes</p>
          )}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AdminProfileTab;
