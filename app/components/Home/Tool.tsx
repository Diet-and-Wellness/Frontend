"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type toolPropsType = {
  isFree: boolean;
  toolIconSrc: string;
  toolName: string;
  toolDesc: string;
  href: string;
};

const Tool = ({
  isFree,
  toolIconSrc,
  toolName,
  toolDesc,
  href,
}: toolPropsType) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`
      group
      w-full h-full
      flex flex-col justify-between
      gap-6
      p-4 sm:p-5
      border-2
      ${isFree ? "bg-[#EDF4EB]" : "bg-[#FCEFE0]"}
      ${isFree ? "border-[#C8DCBF]" : "border-[#F8DEBF]"}
      rounded-4xl
      ${isFree ? "hover:bg-[#4D8E32]" : "hover:bg-[#E99532]"}
      hover:scale-103
      transition-all duration-300
      `}
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <div
          className={`p-2.5 sm:p-3 rounded-2xl ${isFree ? "bg-[#C8DCBF]" : "bg-[#F8DEBF]"} flex items-center justify-center group-hover:bg-[#EDF4EB] transition-colors duration-300`}
        >
          <Image
            src={toolIconSrc}
            alt={toolName}
            width={36}
            height={36}
            className="sm:w-10 sm:h-10 group-hover:rotate-15 transition-transform duration-300"
          />
        </div>

        <div
          className={`
          flex flex-row justify-center items-center gap-1 px-4 py-1 rounded-full text-xs sm:text-sm font-bold
          ${isFree ? "bg-[#4D8E32]" : "bg-[#E99532]"}
          group-hover:border group-hover:border-white
        `}
        >
          <Image
            src={isFree ? "/icons/leaf.svg" : "/icons/diamond.svg"}
            alt="tag"
            width={0}
            height={0}
            className="w-3 h-3"
          />
          <p className={`leading-4 text-[12px] font-bold text-white`}>
            {isFree ? "FREE" : "Premium"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h4 className="text-lg sm:text-xl font-bold text-[#111827] leading-snug line-clamp-2 group-hover:text-white transition-colors duration-300">
          {toolName}
        </h4>

        <p
          className={`font-medium text-sm sm:text-[16px] text-[#4F4F4F] line-clamp-3 group-hover:text-white transition-colors duration-300`}
        >
          {toolDesc}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={() => console.log("nav to tool: ", href)}
        className={`
            py-2
            border-2 ${isFree ? "border-[#4D8E32]" : "border-[#E99532]"}
            rounded-full
            ${isFree ? "text-[#4D8E32]" : "text-[#E99532]"}
            font-bold
            text-sm sm:text-base
            transition-all duration-300
            group-hover:bg-[#FDFDFD]
            active:scale-98
            cursor-pointer
        `}
      >
        Try Now
      </button>
    </motion.li>
  );
};

export default Tool;
