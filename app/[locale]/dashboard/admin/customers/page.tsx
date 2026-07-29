"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StateComp from "../../_components/StateComp";
import SearchIcon from "@/app/[locale]/components/icons/SearchIcon";
import ViewLinkIcon from "@/app/[locale]/components/icons/ViewLinkIcon";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { Customer } from "@/app/[locale]/api/types/profile.types";
import { TableSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import AssignSpecialistModal from "./_components/AssignSpecialistModal";
import { useState } from "react";
import ChevronDownIcon from "@/app/[locale]/components/icons/ChevronDownIcon";
import { AnimatePresence, motion } from "framer-motion";
import EmptyComp from "@/app/[locale]/components/Public/Empty";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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
    },
  },
} as const;

const CustomersPage = () => {
  const t = useTranslations("dashboard");
  const queryClient = useQueryClient();

  const [showAssignSpecialistModal, setShowAssignSpecialistModal] =
    useState<boolean>(false);
  const [assignmentData, setAssignmentData] = useState<{
    customerId: string | null;
    currentSpecialistId: string | undefined;
  }>({
    customerId: "",
    currentSpecialistId: "",
  });

  const getCustomers = async (): Promise<Customer[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "customer",
      page: 1,
      limit: 30,
    });

    return data?.data ?? [];
  };

  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const closeAssignSpecialistModalHandler = () => {
    setAssignmentData({
      customerId: null,
      currentSpecialistId: undefined,
    });
    setShowAssignSpecialistModal(false);
  };

  const showAssignSpecialistModalHandler = (
    customerId: string,
    specialistId: string | undefined,
  ) => {
    setAssignmentData({
      customerId: customerId,
      currentSpecialistId: specialistId,
    });
    setShowAssignSpecialistModal(true);
  };

  const handleAssignSpecialist = (specialistId: string) => {
    assignSpecialistMutation.mutate({
      specialistId: specialistId,
      customerId: assignmentData.customerId,
    });
  };

  const assignSpecialistMutation = useMutation({
    mutationFn: async ({
      specialistId,
      customerId,
    }: {
      specialistId: string;
      customerId: string | null;
    }) => {
      await profileApi.assignCustomersToSpecialist(specialistId, {
        customerIds: [customerId ?? ""],
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["specialists"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["customers"],
        }),
      ]);
      closeAssignSpecialistModalHandler();
    },
  });

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-5"
    >
      <AnimatePresence mode="wait">
        {showAssignSpecialistModal && (
          <AssignSpecialistModal
            onClose={closeAssignSpecialistModalHandler}
            onSelect={(specId) => handleAssignSpecialist(specId)}
            pending={assignSpecialistMutation.isPending}
            assignmentData={assignmentData}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={item}>
        <h2 className="type-page-title mb-3 font-bold sm:mb-4">{t("customers")}</h2>
        <p className="type-body-lg font-light text-[#4F4F4F]">
          {t("manageCustomers")}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
        <SearchInput />
        <FilterButton label={t("allStatuses")} />
        <FilterButton label={t("allPlans")} />
      </motion.div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton columns={8} />
      ) : (customers?.length ?? 0) > 0 ? (
        <div className="w-full overflow-x-auto rounded-2xl border border-[#E1E7EF] bg-white">
          <motion.table
            variants={container}
            className="min-w-full divide-y divide-[#E1E7EF]"
          >
            <thead className="bg-[#FCFCFC]">
              <tr>
                {["name", "email", "phone", "weightProgress", "heightCm", "subscription", "linkToAnswers", "assignToSpecialist"].map((header) => (
                  <th
                    key={header}
                    className="type-table whitespace-nowrap px-6 py-4 text-left font-light text-[#4F4F4F]"
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
                  assignSpecialistHandler={() =>
                    showAssignSpecialistModalHandler(
                      customer.id,
                      customer.specialist?.id,
                    )
                  }
                />
              ))}
            </motion.tbody>
          </motion.table>
        </div>
      ) : (
        <EmptyComp
          title={t("noCustomersYet")}
          description={t("noCustomersDescription")}
        />
      )}
    </motion.section>
  );
};

const CustomerRow = ({
  customer,
  assignSpecialistHandler,
}: {
  customer: Customer;
  assignSpecialistHandler: () => void;
}) => {
  const t = useTranslations("dashboard");
  const router = useRouter();

  return (
    <motion.tr
      layout
      variants={item}
      className="type-table font-light text-[#4F4F4F] transition-colors"
    >
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
        <p className="text-center">{customer?.phone}</p>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {customer.weight.start?.weight
            ? `${customer.weight.start.weight} kg ${" "}${" — "}${" "} ${customer.weight.current.weight} kg`
            : "—"}
        </p>
      </TableCell>

      <TableCell>
        <p className="text-center">
          {customer?.profile?.height ? `${customer.profile.height} cm` : "—"}
        </p>
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
        <button
          onClick={assignSpecialistHandler}
          className="flex min-w-50 items-center justify-center gap-5 rounded-xl border border-[#E1E7EF] bg-[#fffdfe] px-5 py-2.5 cursor-pointer"
        >
          {customer.specialist ? (
            <span className="">
              {customer.specialist.firstName} {customer.specialist.lastName}
            </span>
          ) : (
            <span className="whitespace-nowrap text-sm text-[#A4A4A4]">
              {t("selectSpecialist")}
            </span>
          )}
          <ChevronDownIcon />
        </button>
      </TableCell>
    </motion.tr>
  );
};

const SearchInput = () => {
  const t = useTranslations("dashboard");
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-[#E1E7EF] bg-[#FFFEFD] px-4 py-2.5 sm:w-95">
      <SearchIcon className="text-[#4F4F4F]" />
      <input
        type="text"
        placeholder={t("searchClients")}
        className="w-full outline-none placeholder:text-[#A4A4A4]"
      />
    </div>
  );
};

const FilterButton = ({ label }: { label: string }) => {
  return (
    <button className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#E1E7EF] bg-[#FFFEFD] px-6 py-2.5 cursor-pointer sm:w-auto sm:justify-start">
      <p className="text-base font-light">{label}</p>
      <ChevronDownIcon />
    </button>
  );
};

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};

export default CustomersPage;
