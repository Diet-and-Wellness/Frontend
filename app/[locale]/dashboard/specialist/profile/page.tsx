"use client";

import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import Error from "@/app/[locale]/components/Public/Error";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  speciality: string;
};

const ProfilePage = () => {
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
      await profileApi.updateMyProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialistInfo: {
          specialization: formData.speciality,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      router.replace("/dashboard/specialist/");
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-[30px]">Profile</h3>
        <p className="text-[#65758B] text-[20px]">
          Detailed overview of professional background and clinical impact.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(saveChanges)}
        className="border border-[#E1E7EF] rounded-2xl bg-[#FFFEFD] max-w-160 my-10 p-7.5 flex flex-col gap-7.5"
      >
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
          <label htmlFor="phone" className="text-[16px] w-fit">
            Phone Number
          </label>
          <input
            id="phone"
            placeholder={"Phone Number"}
            defaultValue={me.phone}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <Error msg={errors.phone.message} />}
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
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <Error msg={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="speciality" className="text-[16px] w-fit">
            Speciality
          </label>
          <input
            readOnly
            id="speciality"
            placeholder={"Speciality"}
            defaultValue={me.specialistInfo.specialization}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("speciality", { required: "Speciality is required" })}
          />
          {errors.speciality && <Error msg={errors.speciality.message} />}
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
    </div>
  );
};

export default ProfilePage;
