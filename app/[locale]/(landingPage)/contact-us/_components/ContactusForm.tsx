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

export const inputClassName =
  "peer h-12.5 w-full rounded-xl border-2 border-line-strong bg-surface-raised px-3.5 text-base text-content outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-content-placeholder hover:border-brand/45 focus:border-brand focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-content-subtle";

const ContactusForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
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
      <motion.h3 className="type-display font-extrabold">
        {t("contactUs.contactUs")}
      </motion.h3>

      <motion.p className="type-body mb-5 font-medium text-content-muted">
        {t("contactUs.contactDescription")}
      </motion.p>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.fullName")} isRequired />

        <input
          {...register("name", {
            required: "Full name is required",
            validate: (value) =>
              value.trim().length > 0 || "Full name is required",
          })}
          type="text"
          placeholder={t("placeholders.fullName")}
          className={inputClassName}
        />

        {errors.name && <Error msg={errors.name.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.email")} isRequired />

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          placeholder="you@company.com"
          className={inputClassName}
        />

        {errors.email && <Error msg={errors.email.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.phoneNumber")} isRequired />

        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            validate: (value) => {
              const digits = value.replace(/\D/g, "");

              if (digits.length < 7 || digits.length > 15) {
                return "Please enter a valid phone number";
              }

              if (!/^\+?[\d\s()-]+$/.test(value.trim())) {
                return "Please enter a valid phone number";
              }

              return true;
            },
          })}
          placeholder="+20 10 1234 5678"
          autoComplete="tel"
          inputMode="tel"
          className={inputClassName}
        />

        {errors.phone && <Error msg={errors.phone.message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Label text={t("placeholders.message")} isRequired />

        <textarea
          {...register("message", {
            required: "Message must be 10-2000 characters long",
            validate: (value) =>
              (value.trim().length >= 10 && value.trim().length <= 2000) ||
              "Message is required",
          })}
          ref={(element) => {
            register("message").ref(element);
            textareaRef.current = element;
          }}
          maxLength={2000}
          minLength={10}
          rows={4}
          onInput={handleAutoGrow}
          placeholder={t("placeholders.leaveUsAMessage")}
          className={`${inputClassName} min-h-40 max-h-50 pt-3`}
        />

        {errors.message && <Error msg={errors.message.message} />}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="type-control mt-4 flex h-12.5 items-center justify-center rounded-4xl bg-accent font-semibold text-white cursor-pointer"
      >
        {isSubmitting ? (
          <Spinner spinnerSize={26} />
        ) : (
          t("placeholders.sendMessage")
        )}
      </button>
    </motion.form>
  );
};

export default ContactusForm;
