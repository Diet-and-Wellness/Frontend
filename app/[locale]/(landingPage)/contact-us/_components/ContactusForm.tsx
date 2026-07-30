"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import Label from "@/app/[locale]/components/Public/Label";
import Error from "@/app/[locale]/components/Public/Error";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { contactusApi } from "@/app/[locale]/api/endpoints/contactus.api";
import { redirect } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const inputClassName =
  "text-base outline-none border-2 border-line-strong placeholder:text-content-placeholder rounded-xl p-3 focus:border-brand-hover transition";

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
      <motion.h3 className="type-display font-extrabold">
        {t("contactUs.contactUs")}
      </motion.h3>

      {/* Description */}
      <motion.p className="type-body mb-5 font-medium text-content-muted">
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
          className="text-base outline-none border-2 border-line-strong placeholder:text-content-placeholder rounded-xl p-3 resize-none overflow-hidden focus:border-brand-hover transition"
        />

        {errors.message && <Error msg={errors.message.message} />}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="type-control mt-4 flex h-13 items-center justify-center rounded-4xl bg-accent font-medium text-white cursor-pointer"
      >
        {isSubmitting ? <Spinner /> : t("placeholders.sendMessage")}
      </button>
    </motion.form>
  );
};

export default ContactusForm;
