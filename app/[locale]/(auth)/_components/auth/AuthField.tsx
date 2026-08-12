"use client";

import { motion } from "framer-motion";
import { useId, type InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import FieldError from "./FieldError";

type AuthFieldProps = {
  label: string;
  error?: string;
  registration: UseFormRegisterReturn;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export const authInputClassName =
  "peer h-12.5 w-full rounded-xl border-2 bg-surface-raised px-3.5 text-base text-content outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-content-placeholder hover:border-brand/45 focus:border-brand focus:ring-4 focus:ring-brand/10 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-content-subtle";

const AuthField = ({
  label,
  error,
  registration,
  required = false,
  className = "",
  ...inputProps
}: AuthFieldProps) => {
  const generatedId = useId();
  const inputId = inputProps.id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <motion.div layout className="flex min-w-0 flex-col gap-2">
      <label htmlFor={inputId} className="type-label font-medium text-content-strong">
        {label}
        {required && (
          <span aria-hidden="true" className="ms-1 text-danger">
            *
          </span>
        )}
      </label>
      <input
        {...registration}
        {...inputProps}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${authInputClassName} ${error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-line-strong"} ${className}`}
      />
      <FieldError id={errorId} message={error} />
    </motion.div>
  );
};

export default AuthField;
