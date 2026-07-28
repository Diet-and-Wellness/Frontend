"use client";

import { useQuery } from "@tanstack/react-query";
import StateComp from "@/app/[locale]/dashboard/_components/StateComp";
import SearchIcon from "@/app/[locale]/components/icons/SearchIcon";
import ViewLinkIcon from "@/app/[locale]/components/icons/ViewLinkIcon";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { Customer } from "@/app/[locale]/api/types/profile.types";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import ChevronDownIcon from "@/app/[locale]/components/icons/ChevronDownIcon";

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
        <h2 className="mb-4 text-3xl font-bold">Customers</h2>
        <p className="text-xl font-light text-[#4F4F4F]">
          Manage and view all client profiles.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-5">
        <SearchInput />
        <FilterButton label="All Statuses" />
        <FilterButton label="All Plans" />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="place-self-center my-50">
          <Spinner spinnerSize={60} borderColor="#4D8E32" />
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-[#E1E7EF] bg-white">
          <table className="min-w-full divide-y divide-[#E1E7EF]">
            <thead className="bg-[#FCFCFC]">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap px-6 py-4 text-left text-base font-light text-[#4F4F4F]"
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
    <div className="flex w-95 items-center gap-3 rounded-xl bg-[#FFFEFD] px-4 py-2.5 border border-[#E1E7EF]">
      <SearchIcon className="text-[#4F4F4F]" />
      <input
        type="text"
        placeholder="Search clients..."
        className="w-full outline-none placeholder:text-[#A4A4A4]"
      />
    </div>
  );
};

const FilterButton = ({ label }: { label: string }) => {
  return (
    <button className="border border-[#E1E7EF] flex items-center gap-3 rounded-xl bg-[#FFFEFD] px-6 py-2.5 cursor-pointer">
      <p className="text-base font-light">{label}</p>
      <ChevronDownIcon />
    </button>
  );
};

const CustomerRow = ({ customer }: { customer: Customer }) => {
  return (
    <tr className="text-base font-light text-[#4F4F4F] transition-colors">
      {/* Name */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#FCEFE0]">
            <span className="text-[13px] font-medium text-[#E99532]">
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
        <button className="flex cursor-pointer items-center gap-2 text-[#E99532] hover:underline">
          <div className="min-w-6">
            <ViewLinkIcon className="text-[#E99532]" />
          </div>
          <span>View Answers</span>
        </button>
      </TableCell>

      {/* Specialist */}
      <TableCell>
        <button className="flex min-w-50 items-center justify-center gap-5 rounded-xl border border-[#E1E7EF] bg-[#FFFEFD] px-5 py-2.5 cursor-pointer">
          <span className="whitespace-nowrap text-sm text-[#A4A4A4]">
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
