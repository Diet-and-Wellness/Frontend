"use client";

import { useQuery } from "@tanstack/react-query";
import { Customer, LastNote } from "@/app/[locale]/api/types/profile.types";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { Skeleton, TableSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import { useParams, useRouter } from "next/navigation";
import RightArrowIcon from "@/app/[locale]/components/icons/RightArrowIcon";
import NoteIcon from "@/app/[locale]/components/icons/NoteIcon";
import { AnimatePresence, motion } from "framer-motion";
import EmptyComp from "@/app/[locale]/components/Public/Empty";
import ViewLinkIcon from "@/app/[locale]/components/icons/ViewLinkIcon";
import ViewNoteModal from "./_components/ViewNoteModal";
import { useState } from "react";
import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dashboard");
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
        <SpecialistClientsSkeleton />
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
            className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="type-body text-[#A4A4A4]">{t("specialists")}</p>
                <RightArrowIcon />
                <p className="type-body">
                  {t("doctorName", {
                    name: `${specialist?.firstName} ${specialist?.lastName}`,
                  })}
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
                <h3 className="type-page-title font-bold">
                  {t("doctorName", {
                    name: `${specialist?.firstName} ${specialist?.lastName}`,
                  })}
                </h3>
                <div className="px-4 py-2 rounded-2xl bg-[#FCEFE0]">
                  <p className="type-label font-semibold text-[#E99532]">
                    {t("totalClients", { count: specialist?.assignedCustomersCount ?? 0 })}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={backToSpecialistHandler}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-[#E1E7EF] bg-[#FFFEFD] px-5 py-2 cursor-pointer sm:w-auto"
            >
              <ArrowIcon className="direction-aware-back-icon" />
              <p className="type-control font-semibold">{t("backToSpecialists")}</p>
            </button>
          </motion.div>

          {(customers?.length ?? 0) > 0 ? (
            <div className="w-full overflow-x-auto rounded-2xl border border-[#E1E7EF] bg-white mt-10">
              <table className="min-w-full divide-y divide-[#E1E7EF]">
                <thead className="bg-[#FCFCFC]">
                  <tr>
                    {["name", "email", "phone", "weightProgress", "heightCm", "linkToAnswers", "note"].map((header) => (
                      <th
                        key={header}
                        className="type-table whitespace-nowrap px-6 py-4 text-start font-light text-[#4F4F4F]"
                      >
                        {t(header)}
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
              title={t("noAssignedClientsYet")}
              description={t("assignedClientsDescription")}
            />
          )}
        </motion.div>
      )}
    </>
  );
};

export default SpecialistClientsPage;

const SpecialistClientsSkeleton = () => (
  <div aria-busy="true" className="flex w-full flex-col">
    <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-5 w-44" />
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Skeleton className="h-9 w-72 max-w-[56vw]" />
          <Skeleton className="h-10 w-30 rounded-2xl" />
        </div>
      </div>

      <Skeleton className="h-10 w-full shrink-0 rounded-full sm:w-44" />
    </div>

    <TableSkeleton className="mt-10" columns={7} rows={6} />
  </div>
);

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
  const t = useTranslations("dashboard");
  const router = useRouter();
  return (
    <motion.tr
      layout
      variants={item}
      className="type-table font-light text-[#4F4F4F] transition-colors"
    >
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
            ? `${customer.weight.start.weight} ${t("kilogram")} — ${customer.profile.currentWeight} ${t("kilogram")}`
            : "—"}
        </p>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {customer?.profile?.height
            ? `${customer.profile.height} ${t("centimeter")}`
            : "—"}
        </p>
      </TableCell>

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

      <TableCell>
        <button
          aria-disabled={!customer.lastNote}
          tabIndex={customer.lastNote ? 0 : -1}
          onClick={() => {
            if (customer.lastNote) onViewNote(customer.lastNote);
          }}
          className={
            customer.lastNote
              ? "cursor-pointer text-[#4F4F4F]"
              : "cursor-default text-[#C4CBD4]"
          }
        >
          <NoteIcon />
        </button>
      </TableCell>
    </motion.tr>
  );
};
