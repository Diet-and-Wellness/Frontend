"use client";

import { useForm } from "react-hook-form";
import Error from "../Public/Error";
import Spinner from "../Public/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../../api/endpoints/profile.api";
import CloseIcon from "../icons/CloseIcon";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  speciality: string;
  password: string;
  experienceYears: number;
};

const CreateSpecialistForm = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const queryClient = useQueryClient();

  const createSpecialist = (formData: FormData) =>
    createSpecialistMutation.mutate(formData);

  const createSpecialistMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await profileApi.createSpecialist({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialization: formData.speciality,
        password: formData.password,
        experienceYears: formData.experienceYears,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["specialists"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboardStat"] }),
        queryClient.invalidateQueries({ queryKey: ["recentSpecialists"] }),
      ]);
      closeModal();
    },
  });

  return (
    <div className="rounded-2xl p-7.5 bg-[#fffdfd] min-w-130">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-[24px] font-semibold text-center">
          Add Specialist
        </h4>
        <button
          onClick={closeModal}
          className="hover:bg-gray-100 transition-colors duration-150 p-3 rounded-full cursor-pointer place-self-end"
        >
          <CloseIcon className="text-gray-600" height="18" width="18" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(createSpecialist)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2.5">
          <label htmlFor="firstname" className="text-[16px] w-fit">
            First Name
          </label>
          <input
            id="firstname"
            placeholder={"First Name"}
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
            placeholder={"Email"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <Error msg={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="phone" className="text-[16px] w-fit">
            Phone Number
          </label>
          <input
            id="phone"
            placeholder={"Phone Number"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <Error msg={errors.phone.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="speciality" className="text-[16px] w-fit">
            Speciality
          </label>
          <input
            id="speciality"
            placeholder={"Speciality"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("speciality", { required: "Speciality is required" })}
          />
          {errors.speciality && <Error msg={errors.speciality.message} />}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="experienceYears" className="text-[16px] w-fit">
            Experience Years
          </label>
          <input
            type="number"
            min={0}
            id="experienceYears"
            placeholder={"Experience Years"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("experienceYears", {
              required: "Experience years is required",
            })}
          />
          {errors.experienceYears && (
            <Error msg={errors.experienceYears.message} />
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="password" className="text-[16px] w-fit">
            Password
          </label>
          <input
            id="password"
            placeholder={"Password"}
            className="px-3 py-2 rounded-lg border-none outline-none ring-[1.5px] ring-[#D5D5D5] focus:outline-none focus:ring-[#4D8E32]"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && <Error msg={errors.password.message} />}
        </div>

        <button
          disabled={createSpecialistMutation.isPending}
          className="mt-5 px-7.5 min-h-12.5 bg-[#E99532] rounded-2xl text-white font-semibold text-lg cursor-pointer flex justify-center items-center"
        >
          {createSpecialistMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">Add Specialist</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSpecialistForm;
