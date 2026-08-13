"use client";

import { useForm } from "react-hook-form";
import Error from "@/app/[locale]/components/Public/Error";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { useTranslations } from "next-intl";
import { CloseBtn } from "@/app/[locale]/components/Public/CloseBtn";

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
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

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

  const isSubmitDisabled = !isValid || createSpecialistMutation.isPending;

  return (
    <div className="flex max-h-[85dvh] w-[min(100%,32.5rem)] flex-col overflow-hidden rounded-2xl bg-surface-raised border border-line">
      <div className="flex shrink-0 items-center justify-between px-5 py-3 sm:px-7.5 sm:pt-5 border-b border-b-line">
        <h4 className="type-card-title text-center font-semibold">
          {t("dashboard.addSpecialist")}
        </h4>
        <CloseBtn onClose={closeModal} />
      </div>

      <form
        onSubmit={handleSubmit(createSpecialist)}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 py-5 sm:px-7.5">
          <div className="flex flex-col gap-2.5">
            <label htmlFor="firstname" className="type-label w-fit">
              {t("dashboard.firstName")}
            </label>
            <input
              id="firstname"
              placeholder={t("dashboard.firstName")}
              className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-2 focus:ring-brand transition-all duration-150"
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
              className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-2 focus:ring-brand transition-all duration-150"
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
              placeholder={t("dashboard.email")}
              className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-2 focus:ring-brand transition-all duration-150"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <Error msg={errors.email.message} />}
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="phone" className="type-label w-fit">
              {t("dashboard.phoneNumber")}
            </label>
            <input
              id="phone"
              placeholder={t("dashboard.phoneNumber")}
              className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-2 focus:ring-brand transition-all duration-150"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <Error msg={errors.phone.message} />}
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="speciality" className="type-label w-fit">
              {t("dashboard.specialty")}
            </label>
            <input
              id="speciality"
              placeholder={t("dashboard.specialty")}
              className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-2 focus:ring-brand transition-all duration-150"
              {...register("speciality", {
                required: "Speciality is required",
              })}
            />
            {errors.speciality && <Error msg={errors.speciality.message} />}
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="experienceYears" className="type-label w-fit">
              {t("dashboard.experienceYears")}
            </label>
            <input
              type="number"
              min={0}
              id="experienceYears"
              placeholder={t("dashboard.experienceYears")}
              className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-2 focus:ring-brand transition-all duration-150"
              {...register("experienceYears", {
                required: "Experience years is required",
              })}
            />
            {errors.experienceYears && (
              <Error msg={errors.experienceYears.message} />
            )}
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="password" className="type-label w-fit">
              {t("placeholders.password")}
            </label>
            <input
              id="password"
              placeholder={t("placeholders.password")}
              className="px-3 py-2 rounded-xl border-none outline-none ring ring-line-strong focus:ring-2 focus:ring-brand transition-all duration-150"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <Error msg={errors.password.message} />}
          </div>
        </div>

        <div className="shrink-0 border-t border-line bg-surface-raised p-5 sm:px-7.5 sm:py-5">
          <button
            disabled={isSubmitDisabled}
            className={`type-control flex min-h-12.5 w-full items-center justify-center rounded-full px-7.5 font-semibold transition-colors ${
              isSubmitDisabled
                ? "cursor-not-allowed bg-line-strong text-content-subtle"
                : "cursor-pointer bg-accent text-white hover:bg-accent-hover"
            }`}
          >
            {createSpecialistMutation.isPending ? (
              <Spinner spinnerSize={30} />
            ) : (
              <p className="">{t("dashboard.addSpecialist")}</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpecialistForm;
