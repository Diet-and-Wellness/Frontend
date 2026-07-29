"use client";

import { motion } from "framer-motion";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { authApi } from "../../api/endpoints/auth.api";
import Error from "../../components/Public/Error";
import Label from "../../components/Public/Label";
import Spinner from "../../components/Public/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type FormData = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    loginMutation.mutate(formData);
  };

  const loginMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await authApi.login(formData);
      return data?.data ?? {};
    },

    onSuccess: (me) => {
      queryClient.setQueryData(["me"], me);
      if (me.role === "admin") {
        router.replace("/dashboard/admin");
      } else if (me.role === "specialist") {
        router.replace("/dashboard/specialist");
      } else {
        router.replace("/");
      }
    },
  });

  const inputClassName =
    "text-base outline-none ring ring-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 focus:ring-2 focus:ring-[#3A6B26] transition-all duration-150";

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
      {/* Title */}
      <h3 className="type-display font-extrabold">
        {t("auth.signIn")}
      </h3>

      {/* Email */}
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

      {/* Password */}
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

      {/* Button */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="type-control mt-4 flex h-13 items-center justify-center rounded-4xl bg-[#E99532] font-medium text-white cursor-pointer"
      >
        {loginMutation.isPending ? <Spinner spinnerSize={30} /> : t("auth.signIn")}
      </button>

      {/* Footer */}
      <div className="flex gap-3 justify-center">
        <p className="type-label font-medium">{t("auth.noAccount")}</p>
        <Link href="/signup">
          <span className="type-label text-[#4D8E32] font-semibold underline transition">
            {t("auth.signUp")}
          </span>
        </Link>
      </div>
    </motion.form>
  );
};

export default SigninForm;
