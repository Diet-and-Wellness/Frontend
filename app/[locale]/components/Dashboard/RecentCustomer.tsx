"use client";

import { UserDTO } from "../../api/types/profile.types";

const RecentCustomer = ({ customer }: { customer: UserDTO }) => {
  return (
    <div className="p-3 border border-[#E1E7EF] bg-[#FFFEFD] rounded-2xl flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4 items-start">
        <div className="size-10 rounded-full bg-[#FCEFE0] flex justify-center items-center">
          <span className="text-[#E99532] text-[16px] font-light">
            {`${customer.firstName.at(0)}${customer.lastName.at(0)}`}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-black text-[20px] font-medium">
            {`${customer.firstName} ${customer.lastName}`}
          </h3>

          <p className="text-[#4F4F4F] text-[16px] font-light">
            {customer.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentCustomer;
