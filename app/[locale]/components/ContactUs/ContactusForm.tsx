"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import Label from "../Public/Label";
import Error from "../Public/Error";
import Spinner from "../Public/LoadingSpinner";
import { contactusApi } from "../../api/endpoints/contactus.api";
import { redirect } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const inputClassName =
  "outline-none border-2 border-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 focus:border-[#3A6B26] transition";

const ContactusForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleAutoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const onSubmit = async (data: FormData) => {
    const res = await contactusApi.sendMessage(data);
    if (res?.status === 200) redirect("/");
  };

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
      <motion.h3 className="font-extrabold text-3xl md:text-4xl lg:text-5xl">
        {t("contactUs.contactUs")}
      </motion.h3>

      {/* Description */}
      <motion.p className="text-[#4F4F4F] text-[16px] mb-5 font-medium">
        {t("contactUs.contactDescription")}
      </motion.p>

      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.fullName")} isRequired />

        <input
          {...register("name", {
            required: "Full name is required",
          })}
          type="text"
          placeholder={t("placeholders.fullName")}
          className={inputClassName}
        />

        {errors.name && <Error msg={errors.name.message} />}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.email")} isRequired />

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
        <Label text={t("placeholders.phoneNumber")} isRequired />

        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
          })}
          placeholder="+1 (555) 000-0000"
          className={inputClassName}
        />

        {errors.phone && <Error msg={errors.phone.message} />}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.message")} isRequired />

        <textarea
          {...register("message", {
            required: "Message is required",
          })}
          ref={(element) => {
            register("message").ref(element);
            textareaRef.current = element;
          }}
          rows={4}
          onInput={handleAutoGrow}
          placeholder={t("placeholders.leaveUsAMessage")}
          className="outline-none border-2 border-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 resize-none overflow-hidden focus:border-[#3A6B26] transition"
        />

        {errors.message && <Error msg={errors.message.message} />}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 bg-[#E99532] text-white text-[18px] font-medium rounded-4xl h-13 cursor-pointer flex justify-center items-center"
      >
        {isSubmitting ? <Spinner /> : t("placeholders.sendMessage")}
      </button>
    </motion.form>
  );
};

export default ContactusForm;
