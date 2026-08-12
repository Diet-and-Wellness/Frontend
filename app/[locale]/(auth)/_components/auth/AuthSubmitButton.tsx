"use client";

import { motion } from "framer-motion";
import Spinner from "../../../components/Public/LoadingSpinner";

const AuthSubmitButton = ({
  label,
  pending,
  disabled,
}: {
  label: string;
  pending: boolean;
  disabled?: boolean;
}) => {
  const isDisabled = pending || disabled;

  return (
    <motion.button
      type="submit"
      disabled={isDisabled}
      whileHover={isDisabled ? undefined : { y: -2 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.16 }}
      className="type-control mt-2 flex h-12.5 cursor-pointer items-center justify-center rounded-full bg-accent font-semibold text-accent-contrast shadow-[0_10px_24px_rgba(233,149,50,0.2)] transition-[background-color,box-shadow,opacity] hover:bg-accent-hover hover:shadow-[0_13px_30px_rgba(233,149,50,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:bg-accent/55 disabled:opacity-70 disabled:shadow-none"
    >
      {pending ? <Spinner spinnerSize={28} /> : label}
    </motion.button>
  );
};

export default AuthSubmitButton;
