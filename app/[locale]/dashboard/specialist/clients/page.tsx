"use client";

import { useQuery } from "@tanstack/react-query";
import StateComp from "@/app/[locale]/dashboard/_components/StateComp";
import SearchIcon from "@/app/[locale]/components/icons/SearchIcon";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { Customer } from "@/app/[locale]/api/types/profile.types";
import { TableSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import ChevronDownIcon from "@/app/[locale]/components/icons/ChevronDownIcon";
import { useState } from "react";
import Pagination from "../../_components/Pagination";
import { parsePaginatedResponse } from "@/app/[locale]/utils/pagination";
import { ViewAnswersLink } from "../../_components/ViewAnswersLink";

const TABLE_HEADERS = [
  "Name",
  "Email",
  "Phone",
  "Weight Before",
  "Height (cm)",
  "Subscription",
  "Link To Answers",
  "Assign To Specialist",
];

const ClientsPage = () => {
  const [page, setPage] = useState(1);

  const getCustomers = async () => {
    const { data } = await profileApi.searchProfiles({
      role: "customer",
      page,
      limit: 20,
    });

    return parsePaginatedResponse<Customer>(data, page, 5);
  };

  const {
    data: customersPage,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customers", page],
    queryFn: getCustomers,
    placeholderData: (previousData) => previousData,
  });
  const customers = customersPage?.items ?? [];

  return (
    <section className="flex w-full flex-col gap-5">
      {/* Header */}
      <div>
        <h2 className="type-page-title mb-3 font-bold sm:mb-4">Customers</h2>
        <p className="type-body-lg font-light text-content-muted">
          Manage and view all client profiles.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
        <SearchInput />
        <FilterButton label="All Statuses" />
        <FilterButton label="All Plans" />
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton columns={8} />
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-line bg-surface-raised">
          <table className="min-w-full divide-y divide-line">
            <thead className="bg-surface-subtle">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="type-table whitespace-nowrap px-6 py-4 text-left font-light text-content-muted"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-line bg-surface">
              {customers?.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {customers.length > 0 && customersPage && (
        <Pagination
          currentPage={page}
          totalPages={customersPage.totalPages}
          hasNextPage={customersPage.hasNextPage}
          isFetching={isFetching}
          onPageChange={setPage}
        />
      )}
    </section>
  );
};

const SearchInput = () => {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-2.5 sm:w-95">
      <SearchIcon className="text-content-muted" />
      <input
        type="text"
        placeholder="Search clients..."
        className="w-full text-base outline-none placeholder:text-content-placeholder"
      />
    </div>
  );
};

const FilterButton = ({ label }: { label: string }) => {
  return (
    <button className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-6 py-2.5 cursor-pointer sm:w-auto sm:justify-start">
      <p className="type-control font-light">{label}</p>
      <ChevronDownIcon />
    </button>
  );
};

const CustomerRow = ({ customer }: { customer: Customer }) => {
  const hasAssessmentAnswers = !!customer?.assessment;

  return (
    <tr className="type-table font-light text-content-muted transition-colors">
      {/* Name */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-accent-soft">
            <span className="type-meta font-medium text-accent">
              {`${customer.firstName.at(0)}${customer.lastName.at(0)}`}
            </span>
          </div>
          <span className="text-content">{`${customer.firstName} ${customer.lastName}`}</span>
        </div>
      </TableCell>

      <TableCell>{customer.email}</TableCell>

      <TableCell>
        <p className="text-center">{customer.phone}</p>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {customer.weight.start?.weight
            ? `${customer.weight.start.weight} ${" "}${" — "}${" "} ${customer.weight.current.weight}`
            : "—"}
        </p>
      </TableCell>

      <TableCell>
        <p className="text-center">{customer?.profile?.height ?? "—"}</p>
      </TableCell>

      {/* Subscription */}
      <TableCell>
        <StateComp
          state={customer?.subscription?.active ? "active" : "inactive"}
        />
      </TableCell>

      {/* Answers */}
      <TableCell>
        <ViewAnswersLink
          disabled={!hasAssessmentAnswers}
          customerId={customer.id}
        />
      </TableCell>

      {/* Specialist */}
      <TableCell>
        <button className="flex min-w-50 items-center justify-center gap-5 rounded-xl border border-line bg-surface px-5 py-2.5 cursor-pointer">
          <span className="type-label whitespace-nowrap text-content-placeholder">
            Select Specialist
          </span>
          <ChevronDownIcon />
        </button>
      </TableCell>
    </tr>
  );
};

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};

export default ClientsPage;
