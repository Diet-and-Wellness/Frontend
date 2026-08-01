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
    <div className="bg-surface-raised p-4 md:p-5 rounded-2xl border border-line hover:border-brand transition-colors flex flex-col justify-between gap-7.5">
      <div className="flex flex-row justify-between items-start">
        <div className="bg-accent-soft p-3 rounded-2xl">{statIcon}</div>
        <div className="flex flex-row items-center">
          <p className="type-meta font-light text-brand">{progress}</p>
          <Image src={arrowIcon} width={20} height={20} alt="indicator" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-medium text-content sm:text-3xl lg:text-[30px]">
          {statNumber}
        </p>
        <p className="type-label font-light text-content-muted">{statType}</p>
      </div>
    </div>
  );
};

export default StatCard;
