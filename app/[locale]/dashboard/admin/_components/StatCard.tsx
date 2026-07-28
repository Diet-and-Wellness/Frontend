"use client";

import Image from "next/image";

const StatCard = ({
  arrowIcon,
  statIcon,
  progress,
  statNumber,
  statType,
}: {
  arrowIcon: string;
  statIcon: React.ReactNode;
  progress: string;
  statNumber: number;
  statType: string;
}) => {
  return (
    <div className="bg-white p-4 md:p-5 rounded-2xl border border-[#E1E7EF] flex flex-col justify-between gap-7.5">
      <div className="flex flex-row justify-between items-start">
        <div className="bg-[#FCEFE0] p-3 rounded-2xl">{statIcon}</div>
        <div className="flex flex-row items-center">
          <p className="text-[#4D8E32] text-[14px] font-light">{progress}</p>
          <Image src={arrowIcon} width={20} height={20} alt="indicator" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black text-[30px] font-medium">{statNumber}</p>
        <p className="text-[#4F4F4F] text-[16px] font-light">{statType}</p>
      </div>
    </div>
  );
};

export default StatCard;
