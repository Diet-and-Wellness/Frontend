"use client";

import { useQuery } from "@tanstack/react-query";
import { Customer } from "../../api/types/profile.types";
import AddNoteIcon from "../../components/icons/AddNoteIcon";
import { useMe } from "../../hooks/useMe";
import { profileApi } from "../../api/endpoints/profile.api";
import { TableSkeleton } from "../../components/Public/Skeletons";
import EmptyComp from "../../components/Public/Empty";
import NoteModal from "./_components/NoteModal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import UpdateWeightModal from "./_components/UpdateWeightModal";
import PenIcon from "../../components/icons/Pen";
import NoteIcon from "../../components/icons/NoteIcon";
import { useTranslations } from "next-intl";
import Pagination from "../_components/Pagination";
import { parsePaginatedResponse } from "../../utils/pagination";
import { motion } from "framer-motion";
import { ViewAnswersLink } from "../_components/ViewAnswersLink";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
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

const tableContainer = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const SpecialistDashboardIndex = () => {
  const t = useTranslations("dashboard");
  const [page, setPage] = useState(1);
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
    queryKey: ["customers", me.id, page],
    queryFn: getCustomers,
    placeholderData: (previousData) => previousData,
  });
  const customers = customersPage?.items ?? [];

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
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full"
    >
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

      <motion.div variants={item} className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <h3 className="type-page-title font-bold">
            Dr. {`${me.firstName} ${me.lastName}`}
          </h3>
          <div className="px-4 py-2 rounded-2xl bg-accent-soft">
            <p className="type-label font-semibold text-accent">
              {t("totalClients", { count: me.assignedCustomersCount ?? 0 })}
            </p>
          </div>
        </div>
        <p className="type-body-lg text-content-muted">
          {t("welcomeBack", { name: me.firstName ?? "" })}
        </p>
      </motion.div>

      {isLoading ? (
        <div className="mt-10">
          <TableSkeleton columns={7} />
        </div>
      ) : (customers?.length ?? 0) > 0 ? (
        <div className="w-full overflow-x-auto rounded-2xl border border-line bg-surface-raised mt-10">
          <motion.table
            variants={container}
            className="min-w-full divide-y divide-line"
          >
            <thead className="bg-surface-subtle">
              <tr>
                {[
                  "name",
                  "email",
                  "phone",
                  "weightProgress",
                  "heightCm",
                  "linkToAnswers",
                  "note",
                ].map((header) => (
                  <th
                    key={header}
                    className="type-table whitespace-nowrap px-6 py-4 text-left font-light text-content-muted"
                  >
                    {t(header)}
                  </th>
                ))}
              </tr>
            </thead>

            <motion.tbody
              variants={tableContainer}
              className="divide-y divide-line bg-surface"
            >
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
            </motion.tbody>
          </motion.table>
        </div>
      ) : (
        <EmptyComp
          title={t("noClientsYet")}
          description={t("noClientsDescription")}
        />
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
    </motion.section>
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
  const hasAssessmentAnswers = !!customer?.assessment;

  return (
    <motion.tr
      layout
      variants={item}
      className="type-table font-light text-content-muted transition-colors"
    >
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
        <button
          onClick={() => onClickUpdateWeight(customer.id)}
          className="flex justify-center items-center gap-2.5 cursor-pointer w-full"
        >
          <p className="text-center">
            {customer.weight.start?.weight
              ? `${customer.weight.start.weight} kg ${" "}${" — "}${" "} ${customer.weight.current.weight} kg`
              : "—"}
          </p>
          <PenIcon className="text-content-placeholder" />
        </button>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {customer?.profile?.height ? `${customer.profile.height} cm` : "—"}
        </p>
      </TableCell>

      <TableCell>
        <ViewAnswersLink
          disabled={!hasAssessmentAnswers}
          customerId={customer.id}
        />
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
          className="flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer border border-line"
        >
          {!!customer.lastNote ? (
            <NoteIcon className="text-content-muted" />
          ) : (
            <AddNoteIcon className="text-content-muted" />
          )}
          <p className="type-control">
            {customer.lastNote?.content ? "View" : "Add"} Note
          </p>
        </button>
      </TableCell>
    </motion.tr>
  );
};
