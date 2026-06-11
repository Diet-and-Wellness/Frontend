"use client";

import { SpecialistDTO } from "../../api/types/profile.types";
import StateComp from "./StateComp";

const RecentSpecialist = ({ specialist }: { specialist: SpecialistDTO }) => {
  return (
    <div className="p-3 border border-[#E1E7EF] bg-[#FFFEFD] rounded-2xl flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4 items-start">
        <div className="size-10 rounded-full bg-[#FCEFE0] flex justify-center items-center">
          <span className="text-[#E99532] text-[16px] font-light">
            {`${specialist.firstName.at(0)}${specialist.lastName.at(0)}`}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-black text-[20px] font-medium">
            {`${specialist.firstName} ${specialist.lastName}`}
          </h3>

          <p className="text-[#4F4F4F] text-[16px] font-light">
            {specialist.specialistInfo?.specialization}
          </p>
          <p className="text-black text-[16px] font-light">
            Current Clients: {specialist.assignedCustomersCount}
          </p>
        </div>
      </div>

      <StateComp state={specialist.specialistInfo.status} />
    </div>
  );
};

export default RecentSpecialist;
