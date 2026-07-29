"use client";

import { Customer } from "@/app/[locale]/api/types/profile.types";

const RecentCustomer = ({ customer }: { customer: Customer }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E1E7EF] bg-[#FFFEFD] p-3">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FCEFE0]">
          <span className="type-label font-light text-[#E99532]">
            {`${customer.firstName.at(0)}${customer.lastName.at(0)}`}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="type-card-title truncate font-medium text-black">
            {`${customer.firstName} ${customer.lastName}`}
          </h3>

          <p className="type-label truncate font-light text-[#4F4F4F]">
            {customer.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentCustomer;
