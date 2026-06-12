"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { authApi } from "../../api/endpoints/auth.api";
import Error from "../Public/Error";
import Label from "../Public/Label";
import Spinner from "../Public/LoadingSpinner";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await authApi.signup(data);
  };

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
        Create a New Account
      </h3>

      {/* First Name */}
      <div className="flex flex-col gap-2">
        <Label text={"First Name"} isRequired={true} />

        <input
          {...register("firstName", { required: "First name is required" })}
          placeholder="First Name"
          className={inputClassName}
        />

        {errors.firstName && <Error msg={errors.firstName.message} />}
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-2">
        <Label text={"Last Name"} isRequired={true} />

        <input
          {...register("lastName", { required: "Last name is required" })}
          placeholder="Last Name"
          className={inputClassName}
        />

        {errors.lastName && <Error msg={errors.lastName.message} />}
      </div>

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

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <Label text={"Phone Number"} isRequired={true} />

        <input
          {...register("phone", {
            required: "Phone is required",
          })}
          placeholder="+1 (555) 000-0000"
          className={inputClassName}
        />

        {errors.phone && <Error msg={errors.phone.message} />}
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
        disabled={isSubmitting}
        className="mt-4 bg-[#E99532] text-white text-[18px] font-medium rounded-4xl h-13 cursor-pointer flex justify-center items-center"
      >
        {isSubmitting ? <Spinner /> : "Sign Up"}
      </button>

      {/* Footer */}
      <div className="flex gap-3 justify-center">
        <p className="font-medium text-[16px]">Don’t Have an Account ?</p>
        <Link href={"/signin"}>
          <span className="text-[#4D8E32] text-[16px] font-semibold underline transition">
            Log in
          </span>
        </Link>
      </div>
    </motion.form>
  );
};

export default SignupForm;
