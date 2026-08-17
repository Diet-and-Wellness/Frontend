"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StateComp from "../../_components/StateComp";
import SearchIcon from "@/app/[locale]/components/icons/SearchIcon";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { Customer } from "@/app/[locale]/api/types/profile.types";
import { TableSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import AssignSpecialistModal from "./_components/AssignSpecialistModal";
import { useState } from "react";
import ChevronDownIcon from "@/app/[locale]/components/icons/ChevronDownIcon";
import { AnimatePresence, motion } from "framer-motion";
import EmptyComp from "@/app/[locale]/components/Public/Empty";
import { useTranslations } from "next-intl";
import Pagination from "../../_components/Pagination";
import { parsePaginatedResponse } from "@/app/[locale]/utils/pagination";
import FilterSelect, {
  type FilterOption,
} from "../../_components/FilterSelect";
import { useDebouncedValue } from "@/app/[locale]/hooks/useDebouncedValue";
import { useAdminSubscriptionPlans } from "@/app/[locale]/hooks/useSubscriptionPlans";
import {
  filterCustomers,
  paginateCustomers,
  type CustomerSubscriptionStatus,
} from "./_components/customerFilters";
import { ViewAnswersLink } from "../../_components/ViewAnswersLink";

const CUSTOMER_PAGE_SIZE = 20;
const CUSTOMER_FETCH_SIZE = 100;
const CUSTOMER_FETCH_BATCH_SIZE = 5;
const MAX_CUSTOMER_PAGES = 100;

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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<CustomerSubscriptionStatus>("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim());
  const { data: subscriptionPlans = [], isLoading: arePlansLoading } =
    useAdminSubscriptionPlans();
  const hasActiveFilters = Boolean(search || status || subscriptionPlan);

  const statusOptions: FilterOption[] = [
    { value: "", label: t("allStatuses") },
    { value: "active", label: t("active") },
    { value: "inactive", label: t("inactive") },
  ];
  const planOptions: FilterOption[] = [
    { value: "", label: t("allPlans") },
    ...subscriptionPlans.map((plan) => ({
      value: plan.name,
      label: plan.displayName,
    })),
  ];

  const [showAssignSpecialistModal, setShowAssignSpecialistModal] =
    useState<boolean>(false);
  const [assignmentData, setAssignmentData] = useState<{
    customerId: string | null;
    currentSpecialistId: string | undefined;
  }>({
    customerId: "",
    currentSpecialistId: "",
  });

  const getCustomerPage = async (requestPage: number, signal: AbortSignal) => {
    const { data } = await profileApi.searchProfiles(
      {
        role: "customer",
        page: requestPage,
        limit: CUSTOMER_FETCH_SIZE,
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      },
      signal,
    );

    return parsePaginatedResponse<Customer>(
      data,
      requestPage,
      CUSTOMER_FETCH_SIZE,
    );
  };

  const getFilteredCustomers = async (signal: AbortSignal) => {
    const firstPage = await getCustomerPage(1, signal);
    const allCustomers = [...firstPage.items];

    if (firstPage.totalPages && firstPage.totalPages > 1) {
      const lastPage = Math.min(firstPage.totalPages, MAX_CUSTOMER_PAGES);

      for (
        let batchStart = 2;
        batchStart <= lastPage;
        batchStart += CUSTOMER_FETCH_BATCH_SIZE
      ) {
        const batchEnd = Math.min(
          batchStart + CUSTOMER_FETCH_BATCH_SIZE - 1,
          lastPage,
        );
        const pages = Array.from(
          { length: batchEnd - batchStart + 1 },
          (_, index) => batchStart + index,
        );
        const results = await Promise.all(
          pages.map((requestPage) => getCustomerPage(requestPage, signal)),
        );

        results.forEach((result) => allCustomers.push(...result.items));
      }
    } else if (firstPage.hasNextPage) {
      let requestPage = 2;
      let previousPage = firstPage;

      while (previousPage.hasNextPage && requestPage <= MAX_CUSTOMER_PAGES) {
        previousPage = await getCustomerPage(requestPage, signal);
        allCustomers.push(...previousPage.items);
        requestPage += 1;
      }
    }

    const uniqueCustomers = Array.from(
      new Map(allCustomers.map((customer) => [customer.id, customer])).values(),
    );

    return filterCustomers(uniqueCustomers, { status, subscriptionPlan });
  };

  const {
    data: filteredCustomers = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customers", debouncedSearch, status, subscriptionPlan],
    queryFn: ({ signal }) => getFilteredCustomers(signal),
    staleTime: 0,
    gcTime: 0,
  });
  const totalPages = Math.ceil(filteredCustomers.length / CUSTOMER_PAGE_SIZE);
  const customers = paginateCustomers(
    filteredCustomers,
    page,
    CUSTOMER_PAGE_SIZE,
  );

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateStatus = (value: string) => {
    setStatus(value as CustomerSubscriptionStatus);
    setPage(1);
  };

  const updatePlan = (value: string) => {
    setSubscriptionPlan(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setSubscriptionPlan("");
    setPage(1);
  };

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
        <h2 className="type-page-title mb-3 font-bold sm:mb-4">
          {t("customers")}
        </h2>
        <p className="type-body-lg font-light text-content-muted">
          {t("manageCustomers")}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={item}
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
      >
        <SearchInput value={search} onChange={updateSearch} />
        <FilterSelect
          ariaLabel={t("filterByStatus")}
          value={status}
          options={statusOptions}
          onChange={updateStatus}
        />
        <FilterSelect
          ariaLabel={t("filterByPlan")}
          value={subscriptionPlan}
          options={planOptions}
          onChange={updatePlan}
          disabled={arePlansLoading}
        />

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              whileTap={{ scale: 0.96 }}
              onClick={clearFilters}
              className="flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="size-4"
              >
                <path
                  d="M5 5l10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {t("clearFilters")}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton columns={8} />
      ) : (customers?.length ?? 0) > 0 ? (
        <div
          className={`w-full overflow-x-auto rounded-2xl border border-line bg-surface-raised transition-opacity ${
            isFetching ? "opacity-65" : "opacity-100"
          }`}
          aria-busy={isFetching}
        >
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
                  "subscriptionPlan",
                  "subscriptionStatus",
                  "linkToAnswers",
                  "assignToSpecialist",
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
          title={
            hasActiveFilters
              ? t("noCustomersMatchFilters")
              : t("noCustomersYet")
          }
          description={
            hasActiveFilters
              ? t("adjustCustomerFilters")
              : t("noCustomersDescription")
          }
        />
      )}

      {filteredCustomers.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={page < totalPages}
          isFetching={isFetching}
          onPageChange={setPage}
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

  const hasAssessmentAnswers = !!customer?.assessment;

  return (
    <motion.tr
      layout
      variants={item}
      className="type-table font-light text-content-muted transition-colors"
    >
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
        <span className="type-label font-medium text-content">
          {customer.subscription?.displayName ?? t("noPlan")}
        </span>
      </TableCell>

      <TableCell>
        <div className="flex min-w-36 gap-1.5 justify-center items-center">
          <StateComp
            state={customer?.subscription?.active ? "active" : "inactive"}
          />
        </div>
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
        <button
          onClick={assignSpecialistHandler}
          className="flex min-w-50 items-center justify-center gap-5 rounded-xl border border-line bg-surface-raised px-5 py-2.5 cursor-pointer"
        >
          {customer.specialist ? (
            <span className="">
              {customer.specialist.firstName} {customer.specialist.lastName}
            </span>
          ) : (
            <span className="whitespace-nowrap text-sm text-content-placeholder">
              {t("selectSpecialist")}
            </span>
          )}
          <ChevronDownIcon />
        </button>
      </TableCell>
    </motion.tr>
  );
};

const SearchInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const t = useTranslations("dashboard");
  return (
    <div className="flex min-h-12 w-full items-center gap-3 rounded-xl border border-line bg-surface-raised px-4 py-2.5 transition-[border-color,box-shadow] focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10 sm:w-95">
      <SearchIcon className="text-content-muted" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("searchClients")}
        aria-label={t("searchClients")}
        autoComplete="off"
        className="w-full outline-none placeholder:text-content-placeholder"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onChange("")}
            aria-label={t("clearSearch")}
            className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-surface-neutral text-content-muted transition-colors hover:bg-brand-soft hover:text-brand"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="size-3.5"
            >
              <path
                d="M5 5l10 10M15 5 5 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};

export default CustomersPage;
