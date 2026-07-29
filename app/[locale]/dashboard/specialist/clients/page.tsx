"use client";

import { useQuery } from "@tanstack/react-query";
import StateComp from "@/app/[locale]/dashboard/_components/StateComp";
import SearchIcon from "@/app/[locale]/components/icons/SearchIcon";
import ViewLinkIcon from "@/app/[locale]/components/icons/ViewLinkIcon";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { Customer } from "@/app/[locale]/api/types/profile.types";
import { TableSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import ChevronDownIcon from "@/app/[locale]/components/icons/ChevronDownIcon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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
  const getCustomers = async (): Promise<Customer[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "customer",
      page: 1,
      limit: 20,
    });

    return data?.data ?? [];
  };

  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return (
    <section className="flex w-full flex-col gap-5">
      {/* Header */}
      <div>
        <h2 className="type-page-title mb-3 font-bold sm:mb-4">Customers</h2>
        <p className="type-body-lg font-light text-[#4F4F4F]">
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
        <div className="w-full overflow-x-auto rounded-2xl border border-[#E1E7EF] bg-white">
          <table className="min-w-full divide-y divide-[#E1E7EF]">
            <thead className="bg-[#FCFCFC]">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="type-table whitespace-nowrap px-6 py-4 text-left font-light text-[#4F4F4F]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E1E7EF] bg-[#FFFEFD]">
              {customers?.map((customer) => (
                <CustomerRow key={customer.id} customer={customer} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const SearchInput = () => {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-[#E1E7EF] bg-[#FFFEFD] px-4 py-2.5 sm:w-95">
      <SearchIcon className="text-[#4F4F4F]" />
      <input
        type="text"
        placeholder="Search clients..."
        className="w-full text-base outline-none placeholder:text-[#A4A4A4]"
      />
    </div>
  );
};

const FilterButton = ({ label }: { label: string }) => {
  return (
    <button className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#E1E7EF] bg-[#FFFEFD] px-6 py-2.5 cursor-pointer sm:w-auto sm:justify-start">
      <p className="type-control font-light">{label}</p>
      <ChevronDownIcon />
    </button>
  );
};

const CustomerRow = ({ customer }: { customer: Customer }) => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  return (
    <tr className="type-table font-light text-[#4F4F4F] transition-colors">
      {/* Name */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#FCEFE0]">
            <span className="type-meta font-medium text-[#E99532]">
              {`${customer.firstName.at(0)}${customer.lastName.at(0)}`}
            </span>
          </div>
          <span className="text-black">{`${customer.firstName} ${customer.lastName}`}</span>
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
        <button
          onClick={() => router.push(`/dashboard/customers/${customer.id}/answers`)}
          className="flex cursor-pointer items-center gap-2 text-[#E99532] hover:underline"
        >
          <div className="min-w-6">
            <ViewLinkIcon className="text-[#E99532]" />
          </div>
          <span>{t("viewAnswers")}</span>
        </button>
      </TableCell>

      {/* Specialist */}
      <TableCell>
        <button className="flex min-w-50 items-center justify-center gap-5 rounded-xl border border-[#E1E7EF] bg-[#FFFEFD] px-5 py-2.5 cursor-pointer">
          <span className="type-label whitespace-nowrap text-[#A4A4A4]">
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
