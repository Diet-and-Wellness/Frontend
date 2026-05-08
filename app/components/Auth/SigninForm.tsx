"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const itemButton = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const,
    },
  },
};

const SigninForm = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={container}
      className="w-full p-3 md:p-6 lg:p-10 flex flex-col gap-6"
    >
      {/* Title */}
      <motion.h3
        variants={item}
        className="font-extrabold text-4xl lg:text-5xl"
      >
        Log in
      </motion.h3>

      {/* Email */}
      <motion.div variants={item} className="flex flex-col gap-2">
        <label className="font-medium text-[16px]">
          Email <span className="text-red-500">*</span>
        </label>

        <input
          type="email"
          placeholder="you@company.com"
          className="outline-none border-2 border-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 focus:border-[#3A6B26] transition"
        />
      </motion.div>

      {/* Password */}
      <motion.div variants={item} className="flex flex-col gap-2">
        <label className="font-medium text-[16px]">
          Password <span className="text-red-500">*</span>
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="outline-none border-2 border-[#D5D5D5] placeholder:text-[#A4A4A4] rounded-xl p-3 focus:border-[#3A6B26] transition"
        />
      </motion.div>

      {/* Button */}
      <motion.button
        variants={itemButton}
        className="mt-4 bg-[#E99532] text-white text-[18px] rounded-4xl py-3 font-medium hover:opacity-90 transition cursor-pointer"
      >
        Log in
      </motion.button>

      {/* Footer */}
      <motion.div
        variants={item}
        className="flex flex-row gap-3 justify-center items-center"
      >
        <p className="font-medium text-[16px]">Don’t Have an Account ?</p>
        <Link href={"/signup"}>
          <span className="text-[#4D8E32] text-[16px] font-semibold underline transition">
            Sign Up
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default SigninForm;
