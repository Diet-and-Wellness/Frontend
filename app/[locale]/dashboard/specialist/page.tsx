"use client";

import { useQuery } from "@tanstack/react-query";
import { Customer } from "../../api/types/profile.types";
import AddNoteIcon from "../../components/icons/AddNoteIcon";
import { useMe } from "../../hooks/useMe";
import { profileApi } from "../../api/endpoints/profile.api";
import Spinner from "../../components/Public/LoadingSpinner";

const TABLE_HEADERS = [
  "Name",
  "Email",
  "Phone",
  "Weight Progress",
  "Height (cm)",
  "Note",
];

const SpecialistDashboardIndex = () => {
  const { data: me } = useMe();

  const getCustomers = async (): Promise<Customer[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "customer",
      page: 1,
      limit: 20,
    });

    return data?.data ?? [];
  };

  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers", me.id],
    queryFn: getCustomers,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex gap-5 items-center">
          <h3 className="font-bold text-[30px]">
            Dr. {`${me.firstName} ${me.lastName}`}
          </h3>
          <div className="px-4 py-2 rounded-2xl bg-[#FCEFE0]">
            <p className="text-[#E99532] text-[16px] font-semibold">
              {`${me.assignedCustomersCount}`} Total Clients
            </p>
          </div>
        </div>
        <p className="text-[#65758B] text-[20px]">
          Welcome back, Dr. {me.firstName}. Here&apos;s an overview of Diet and
          Wellness.
        </p>
      </div>

      {isLoading ? (
        <div className="place-self-center my-50">
          <Spinner spinnerSize={60} borderColor="#4D8E32" />
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-[#E1E7EF] bg-white mt-10">
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
    </div>
  );
};

export default SpecialistDashboardIndex;

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};

const AddNoteBtn = () => {
  return (
    <button className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl cursor-pointer border border-[#E1E7EF]">
      <AddNoteIcon className="text-black" />
      <p className="text-[16px] text-black">Add Note</p>
    </button>
  );
};

const CustomerRow = ({ customer }: { customer: Customer }) => {
  return (
    <tr className="text-base font-light text-[#4F4F4F] transition-colors">
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
          {customer?.profile?.currentWeight
            ? `${customer.profile.weightHistory[0].weight} ${" "}${" — "}${" "} ${customer.profile.currentWeight}`
            : "—"}
        </p>
      </TableCell>

      <TableCell>
        <p className="text-center">{customer?.profile?.height ?? "—"}</p>
      </TableCell>

      <TableCell>
        <AddNoteBtn />
      </TableCell>
    </tr>
  );
};
