"use client";

import ArrowDownIcon from "../icons/ArrowDownIcon";
// import NotificationIcon from "../icons/NotificationIcon";
import SearchIcon from "../icons/SearchIcon";
import { motion } from "framer-motion";
import { useMe } from "../../hooks/useMe";

const DashboardHeader = ({ collapsed }: { collapsed: boolean }) => {
  const data = useMe();

  const me = data?.data ?? {};

  console.log("me object ===> ", me);

  return (
    <motion.header
      initial={false}
      animate={{
        left: collapsed ? 100 : 256,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className="px-7.5 py-2.5 max-h-17 bg-[#FFFEFD] border-b border-[#e1e7ef88] fixed z-50 top-0 right-0 flex flex-row justify-between items-center"
    >
      <div className="w-95 px-4 py-2.5 bg-[#F9F9F9] rounded-xl flex flex-row items-center gap-3 border border-[#e1e7ef88]">
        <SearchIcon className="text-[#4F4F4F]" />
        <input
          type="text"
          placeholder="Search clients..."
          className="outline-none w-full"
        />
      </div>

      <div className="flex flex-row gap-5 items-center">
        {/* <button className="relative cursor-pointer p-2.5">
          <NotificationIcon className="text-black" />
          <div className="bg-[#E99532] rounded-full size-5 flex justify-center items-center absolute -top-0.5 -right-1 text-[#FFFEFD] text-[12px] font-bold">
            2
          </div>
        </button> */}
        <button className="bg-[#EDEDED] rounded-xl px-3 py-1.5 flex flex-row gap-3 items-center cursor-pointer border border-[#e1e7ef88]">
          <div className="size-8 bg-[#4D8E32] rounded-full flex justify-center items-center">
            <span className="text-[#FFFEFD] text-[13px] font-bold">
              {me?.firstName?.at(0)}
              {me?.lastName?.at(0)}
            </span>
          </div>
          <span className="text-black text-[16px] font-medium">
            {me?.firstName}
          </span>
          <ArrowDownIcon className="text-[#4F4F4F]" />
        </button>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
