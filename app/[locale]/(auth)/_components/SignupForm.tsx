"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { authApi } from "../../api/endpoints/auth.api";
import Error from "../../components/Public/Error";
import Label from "../../components/Public/Label";
import Spinner from "../../components/Public/LoadingSpinner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const SignupForm = () => {
  const t = useTranslations();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    signupMutation.mutate(formData);
  };

  const signupMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      await authApi.signup(formData);
    },
    onSuccess: () => {
      router.replace("/signin");
    },
  });

  const inputClassName =
    "text-base outline-none border-2 border-line-strong placeholder:text-content-placeholder rounded-xl p-3 focus:border-brand-hover transition";

  return (
    <motion.form
      initial={{
        y: 40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-3 md:p-6 lg:p-10 flex flex-col gap-6"
    >
     <h3 className="type-display font-extrabold">{t("auth.createAccount")}</h3>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.firstName")} isRequired={true} />

        <input
          {...register("firstName", { required: t("auth.firstNameRequired") })}
          placeholder={t("placeholders.firstName")}
          className={inputClassName}
        />

        {errors.firstName && <Error msg={errors.firstName.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.lastName")} isRequired={true} />

        <input
          {...register("lastName", { required: t("auth.lastNameRequired") })}
          placeholder={t("placeholders.lastName")}
          className={inputClassName}
        />

        {errors.lastName && <Error msg={errors.lastName.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.email")} isRequired={true} />

        <input
          type="email"
          {...register("email", {
            required: t("auth.emailRequired"),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t("auth.invalidEmail"),
            },
          })}
          placeholder={t("placeholders.enterYourEmail")}
          className={inputClassName}
        />

        {errors.email && <Error msg={errors.email.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.phoneNumber")} isRequired={true} />

        <input
          {...register("phone", {
            required: t("auth.phoneRequired"),
          })}
          placeholder="+1 (555) 000-0000"
          className={inputClassName}
        />

        {errors.phone && <Error msg={errors.phone.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.password")} isRequired={true} />

        <input
          type="password"
          {...register("password", {
            required: t("auth.passwordRequired"),
            minLength: {
              value: 6,
              message: t("auth.minimumPassword"),
            },
          })}
          placeholder={t("auth.passwordPlaceholder")}
          className={inputClassName}
        />

        {errors.password && <Error msg={errors.password.message} />}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="type-control mt-4 flex h-13 items-center justify-center rounded-4xl bg-accent font-medium text-white cursor-pointer"
      >
        {isSubmitting ? <Spinner spinnerSize={30} /> : t("auth.signUp")}
      </button>

      <div className="flex gap-3 justify-center items-center">
        <p className="type-label font-medium">{t("auth.noAccount")}</p>
        <Link href={"/signin"}>
          <span className="type-label text-brand font-semibold underline transition">
            {t("auth.signIn")}
          </span>
        </Link>
      </div>
    </motion.form>
  );
};

export default SignupForm;
