"use client";

import Image from "next/image";
import StatArrow from "../icons/StatArrow";

const StatCard = () => {
  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#E1E7EF] flex flex-col justify-between gap-10">
      <div className="flex flex-row justify-between items-start">
        <div className="bg-[#FCEFE0] p-3 rounded-2xl">
          <StatArrow className="text-[#E99532]" />
        </div>
        <div className="flex flex-row items-center gap-1">
          <p className="text-[#4D8E32] text-[14px] font-light">On Track</p>
          <Image
            src="/icons/green-up-arrow.svg"
            width={20}
            height={20}
            alt="indicator"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black text-[30px] font-medium">3</p>
        <p className="text-[#4F4F4F] text-[16px] font-light">
          Published Articles
        </p>
      </div>
    </div>
  );
};

export default StatCard;
