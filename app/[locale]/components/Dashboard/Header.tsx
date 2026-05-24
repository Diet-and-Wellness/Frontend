"use client";

import ArrowDownIcon from "../icons/ArrowDownIcon";
import NotificationIcon from "../icons/NotificationIcon";
import SearchIcon from "../icons/SearchIcon";
import Logo from "../LandingHeader/Logo";

const DashboardHeader = () => {
  return (
    <header className="px-7.5 py-1 max-h-17 bg-[#FFFEFD] border-b border-[#e1e7ef88] w-full fixed z-50 top-0 left-0 right-0 flex flex-row justify-between items-center">
      <Logo href={"/dashboard"} />
      <div className="flex flex-row gap-10 items-center">
        <div className="w-95 px-4 py-2.5 bg-[#F9F9F9] rounded-xl flex flex-row items-center gap-3">
          <SearchIcon className="text-[#4F4F4F]" />
          <input
            type="text"
            placeholder="Search clients..."
            className="outline-none w-full"
          />
        </div>
        <div className="flex flex-row gap-5 items-center">
          <button className="relative cursor-pointer p-2.5">
            <NotificationIcon className="text-black" />
            <div className="bg-[#E99532] rounded-full size-5 flex justify-center items-center absolute -top-0.5 -right-1 text-[#FFFEFD] text-[12px] font-bold">
              2
            </div>
          </button>
          <button className="bg-[#EDEDED] rounded-xl px-3 py-1.5 flex flex-row gap-3 items-center cursor-pointer">
            <div className="size-8 bg-[#4D8E32] rounded-full flex justify-center items-center">
              <span className="text-[#FFFEFD] text-[13px] font-bold">AD</span>
            </div>
            <span className="text-black text-[16px] font-medium">Admin</span>
            <ArrowDownIcon className="text-[#4F4F4F]" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
