"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { authInputClassName } from "./AuthField";
import FieldError from "./FieldError";

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: string;
  showLabel: string;
  hideLabel: string;
  autoComplete: "current-password" | "new-password";
  disabled?: boolean;
};

const PasswordField = ({
  label,
  placeholder,
  registration,
  error,
  showLabel,
  hideLabel,
  autoComplete,
  disabled,
}: PasswordFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <motion.div layout className="flex flex-col gap-2">
      <label htmlFor={inputId} className="type-label font-medium text-content-strong">
        {label}
        <span aria-hidden="true" className="ms-1 text-danger">
          *
        </span>
      </label>

      <div className="relative">
        <input
          {...registration}
          id={inputId}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${authInputClassName} pe-12 ${error ? "border-danger focus:border-danger focus:ring-danger/10" : "border-line-strong"}`}
        />
        <motion.button
          type="button"
          aria-label={isVisible ? hideLabel : showLabel}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((current) => !current)}
          whileTap={{ scale: 0.88 }}
          disabled={disabled}
          className="absolute inset-y-0 end-1.5 my-auto flex size-10 cursor-pointer items-center justify-center rounded-lg text-content-muted transition-colors hover:bg-brand-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5.5">
            <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.7" stroke="currentColor" strokeWidth="1.8" />
            {!isVisible && <path d="m4 4 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </motion.button>
      </div>

      <FieldError id={errorId} message={error} />
    </motion.div>
  );
};

export default PasswordField;
