"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authApi } from "../../api/endpoints/auth.api";
import Error from "../../components/Public/Error";
import Label from "../../components/Public/Label";
import Spinner from "../../components/Public/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const SigninForm = () => {
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
    "outline-none border-2 border-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 focus:border-[#3A6B26] transition";

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
      <h3 className="font-extrabold text-3xl md:text-4xl lg:text-5xl">
        Log in
      </h3>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label text={"Email"} isRequired={true} />

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email",
            },
          })}
          placeholder="you@company.com"
          className={inputClassName}
        />

        {errors.email && <Error msg={errors.email.message} />}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label text={"Password"} isRequired={true} />

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          })}
          placeholder="Enter your password"
          className={inputClassName}
        />

        {errors.password && <Error msg={errors.password.message} />}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="mt-4 bg-[#E99532] text-white text-[18px] font-medium rounded-4xl h-13 cursor-pointer flex justify-center items-center"
      >
        {loginMutation.isPending ? <Spinner spinnerSize={30} /> : "Log in"}
      </button>

      {/* Footer */}
      <div className="flex gap-3 justify-center">
        <p className="font-medium text-[16px]">Don’t Have an Account ?</p>
        <Link href="/signup">
          <span className="text-[#4D8E32] text-[16px] font-semibold underline transition">
            Sign Up
          </span>
        </Link>
      </div>
    </motion.form>
  );
};

export default SigninForm;
