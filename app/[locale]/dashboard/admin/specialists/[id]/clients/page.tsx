"use client";

import { useQuery } from "@tanstack/react-query";
import { Customer, LastNote } from "@/app/[locale]/api/types/profile.types";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import RightArrowIcon from "@/app/[locale]/components/icons/RightArrowIcon";
import NoteIcon from "@/app/[locale]/components/icons/NoteIcon";
import { AnimatePresence, motion } from "framer-motion";
import EmptyComp from "@/app/[locale]/components/Public/Empty";
import ViewLinkIcon from "@/app/[locale]/components/icons/ViewLinkIcon";
import ViewNoteModal from "./_components/ViewNoteModal";
import { useState } from "react";
import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";

const TABLE_HEADERS = [
  "Name",
  "Email",
  "Phone",
  "Weight Progress (kg)",
  "Height (cm)",
  "Link To Answers",
  "Note",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
} as const;

const tableContainer = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
} as const;

const SpecialistClientsPage = () => {
  const params = useParams();

  const router = useRouter();

  const [note, setNote] = useState<LastNote | null>(null);
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);

  const specialistId = params.id as string;

  const getSpecialistProfile = async () => {
    const { data } = await profileApi.getProfile(specialistId);
    return data ?? {};
  };

  const { data: specialist, isLoading: isSpecialistInfoLoading } = useQuery({
    queryKey: ["specialistData", specialistId],
    queryFn: getSpecialistProfile,
  });

  const getCustomers = async (): Promise<Customer[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "customer",
      page: 1,
      limit: 20,
      assignedSpecialistId: specialistId,
    });

    return data?.data ?? [];
  };

  const { data: customers, isLoading: isSpecialistClientsLoading } = useQuery({
    queryKey: ["customers", specialistId],
    queryFn: getCustomers,
  });

  const backToSpecialistHandler = () => {
    router.replace("/dashboard/admin/specialists");
  };

  const openNoteModalHandler = (note: LastNote) => {
    setNote(note);
    setIsNoteModalVisible(true);
  };

  const closeNoteModalHandler = () => {
    setIsNoteModalVisible(false);
    setNote(null);
  };

  return (
    <>
      {isSpecialistInfoLoading || isSpecialistClientsLoading ? (
        <div className="place-self-center mx-auto my-auto">
          <Spinner spinnerSize={60} borderColor="#4D8E32" />
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <AnimatePresence mode="wait">
            {isNoteModalVisible && (
              <ViewNoteModal note={note} onClose={closeNoteModalHandler} />
            )}
          </AnimatePresence>

          <motion.div
            variants={item}
            className="flex justify-between items-start"
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 items-center">
                <p className="text-[#A4A4A4] text-[20px]">Specialists</p>
                <RightArrowIcon />
                <p className="text-[20px]">
                  Dr. {`${specialist?.firstName} ${specialist?.lastName}`}
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <h3 className="font-bold text-[30px]">
                  Dr. {`${specialist?.firstName} ${specialist?.lastName}`}
                </h3>
                <div className="px-4 py-2 rounded-2xl bg-[#FCEFE0]">
                  <p className="text-[#E99532] text-[16px] font-semibold">
                    {`${specialist?.assignedCustomersCount}`} Total Clients
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={backToSpecialistHandler}
              className="flex items-center gap-3 px-5 py-2 border border-[#E1E7EF] cursor-pointer rounded-full bg-[#FFFEFD]"
            >
              <ArrowIcon />
              <p className="text-[16px] font-semibold">Back to Specialists</p>
            </button>
          </motion.div>

          {(customers?.length ?? 0) > 0 ? (
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

                <motion.tbody
                  variants={tableContainer}
                  className="divide-y divide-[#E1E7EF] bg-[#FFFEFD]"
                >
                  {customers?.map((customer) => (
                    <CustomerRow
                      key={customer.id}
                      customer={customer}
                      onViewNote={(note: LastNote) =>
                        openNoteModalHandler(note)
                      }
                    />
                  ))}
                </motion.tbody>
              </table>
            </div>
          ) : (
            <EmptyComp
              title="No Assigned Clients Yet"
              description="Assigned clients will appear here once they have been assigned."
            />
          )}
        </motion.div>
      )}
    </>
  );
};

export default SpecialistClientsPage;

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};

const CustomerRow = ({
  customer,
  onViewNote,
}: {
  customer: Customer;
  onViewNote: (note: LastNote) => void;
}) => {
  return (
    <motion.tr
      layout
      variants={item}
      className="text-base font-light text-[#4F4F4F] transition-colors"
    >
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
            ? `${customer.weight.start.weight} kg ${" "}${" — "}${" "} ${customer.profile.currentWeight} kg`
            : "—"}
        </p>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {customer?.profile?.height ? `${customer.profile.height} cm` : "—"}
        </p>
      </TableCell>

      <TableCell>
        <button className="flex cursor-pointer items-center gap-2 text-[#E99532] hover:underline">
          <div className="min-w-6">
            <ViewLinkIcon className="text-[#E99532]" />
          </div>
          <span>View Answers</span>
        </button>
      </TableCell>

      <TableCell>
        <button
          disabled={!!!customer.lastNote}
          onClick={() => onViewNote(customer.lastNote)}
          className={`${!!customer.lastNote ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          <NoteIcon
            className={`${!!customer.lastNote ? "text-[#4F4F4F]" : "text-gray-300"}`}
          />
        </button>
      </TableCell>
    </motion.tr>
  );
};
