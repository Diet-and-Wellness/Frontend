"use client";

import { useQuery } from "@tanstack/react-query";
import { Customer } from "../../api/types/profile.types";
import AddNoteIcon from "../../components/icons/AddNoteIcon";
import { useMe } from "../../hooks/useMe";
import { profileApi } from "../../api/endpoints/profile.api";
import Spinner from "../../components/Public/LoadingSpinner";
import EmptyComp from "../../components/Public/Empty";
import NoteModal from "../../components/Modals/NoteModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import UpdateWeightModal from "../../components/Modals/UpdateWeightModal";
import PenIcon from "../../components/icons/Pen";
import NoteIcon from "../../components/icons/NoteIcon";

const TABLE_HEADERS = [
  "Name",
  "Email",
  "Phone",
  "Weight Progress",
  "Height (cm)",
  "Note",
];

const SpecialistDashboardIndex = () => {
  const [noteModal, setNoteModal] = useState({
    isVisible: false,
    customerId: "",
    note: "",
    noteId: "",
  });

  const [updateWeightModal, setUpdateWeightModal] = useState({
    isVisible: false,
    customerId: "",
    startWeight: 0,
    currentWeight: 0,
    firstName: "",
    lastName: "",
  });

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

  const openNoteModal = (customerId: string, note: string, noteId: string) => {
    setNoteModal({
      isVisible: true,
      customerId: customerId,
      note: note,
      noteId: noteId,
    });
  };

  const closeNoteModal = () => {
    setNoteModal({
      isVisible: false,
      customerId: "",
      note: "",
      noteId: "",
    });
  };

  const openUpdateWeightModal = ({
    customerId,
    startWeight,
    currentWeight,
    firstName,
    lastName,
  }: {
    customerId: string;
    startWeight: number;
    currentWeight: number;
    firstName: string;
    lastName: string;
  }) => {
    setUpdateWeightModal({
      isVisible: true,
      customerId: customerId,
      startWeight: startWeight,
      currentWeight: currentWeight,
      firstName: firstName,
      lastName: lastName,
    });
  };

  const closeUpdateWeightModal = () => {
    setUpdateWeightModal({
      isVisible: false,
      customerId: "",
      startWeight: 0,
      currentWeight: 0,
      firstName: "",
      lastName: "",
    });
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {noteModal.isVisible && (
          <NoteModal
            key={noteModal.customerId}
            customerId={noteModal.customerId}
            currentNote={noteModal.note}
            noteId={noteModal.noteId}
            onClose={closeNoteModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {updateWeightModal.isVisible && (
          <UpdateWeightModal
            key={updateWeightModal.customerId}
            customerId={updateWeightModal.customerId}
            startWeight={updateWeightModal.startWeight}
            currentWeight={updateWeightModal.currentWeight}
            name={`${updateWeightModal.firstName} ${updateWeightModal.lastName}`}
            onClose={closeUpdateWeightModal}
          />
        )}
      </AnimatePresence>

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
      ) : (customers?.length ?? 0) > 0 ? (
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
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  onClickAddNote={(
                    customerId: string,
                    note: string,
                    noteId: string,
                  ) => openNoteModal(customerId, note, noteId)}
                  onClickUpdateWeight={() => {
                    openUpdateWeightModal({
                      customerId: customer.id,
                      startWeight: customer.weight.start?.weight,
                      currentWeight: customer.weight.current?.weight,
                      firstName: customer.firstName,
                      lastName: customer.lastName,
                    });
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyComp
          title="No Clients Yet"
          description="Once clients have been assigned, they will appear here."
        />
      )}
    </div>
  );
};

export default SpecialistDashboardIndex;

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};

const CustomerRow = ({
  customer,
  onClickAddNote,
  onClickUpdateWeight,
}: {
  customer: Customer;
  onClickAddNote: (customerId: string, note: string, noteId: string) => void;
  onClickUpdateWeight: (customerId: string) => void;
}) => {
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
        <button
          onClick={() => onClickUpdateWeight(customer.id)}
          className="flex justify-center items-center gap-2.5 cursor-pointer w-full"
        >
          <p className="text-center">
            {customer.weight.start?.weight
              ? `${customer.weight.start.weight} kg ${" "}${" — "}${" "} ${customer.weight.current.weight} kg`
              : "—"}
          </p>
          <PenIcon className="text-[#A4A4A4]" />
        </button>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {customer?.profile?.height ? `${customer.profile.height} cm` : "—"}
        </p>
      </TableCell>

      <TableCell>
        <button
          onClick={() =>
            onClickAddNote(
              customer.id,
              customer.lastNote?.content,
              customer.lastNote?.id,
            )
          }
          className="flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer border border-[#E1E7EF]"
        >
          {!!customer.lastNote ? (
            <NoteIcon className="text-[#4F4F4F]" />
          ) : (
            <AddNoteIcon className="text-[#4F4F4F]" />
          )}
          <p className="text-[16px] text-[]">
            {customer.lastNote?.content ? "View" : "Add"} Note
          </p>
        </button>
      </TableCell>
    </tr>
  );
};
