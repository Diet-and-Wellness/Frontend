"use client";

import { Customer } from "@/app/[locale]/api/types/profile.types";

const RecentCustomer = ({ customer }: { customer: Customer }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-3">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft">
          <span className="text-sm font-light text-accent">
            {`${customer.firstName.at(0)}${customer.lastName.at(0)}`}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate text-base leading-tight font-medium text-content sm:text-lg">
            {`${customer.firstName} ${customer.lastName}`}
          </h3>

          <p className="truncate text-sm font-light text-content-muted">
            {customer.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentCustomer;
