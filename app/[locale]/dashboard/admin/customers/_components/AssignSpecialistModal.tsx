import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { Skeleton } from "@/app/[locale]/components/Public/Skeletons";

import { SpecialistDTO } from "@/app/[locale]/api/types/profile.types";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import SearchIcon from "@/app/[locale]/components/icons/SearchIcon";
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import { useTranslations } from "next-intl";
import Pagination from "../../../_components/Pagination";
import { parsePaginatedResponse } from "@/app/[locale]/utils/pagination";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 5 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
} as const;

const AssignSpecialistModal = ({
  onClose,
  onSelect,
  pending,
  assignmentData,
}: {
  onClose: () => void;
  onSelect: (specId: string) => void;
  pending: boolean;
  assignmentData: {
    customerId: string | null;
    currentSpecialistId: string | undefined;
  };
}) => {
  const t = useTranslations("dashboard");
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<
    string | undefined
  >(assignmentData.currentSpecialistId);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const getSpecialists = async () => {
    const { data } = await profileApi.searchProfiles({
      role: "specialist",
      limit: 5,
      page,
    });

    return parsePaginatedResponse<SpecialistDTO>(data, page, 5);
  };

  const {
    data: specialistsPage,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["specialistsToAssign", page],
    queryFn: getSpecialists,
    placeholderData: (previousData) => previousData,
  });
  const specialists = useMemo(
    () => specialistsPage?.items ?? [],
    [specialistsPage],
  );

  const filteredSpecialists = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return specialists;

    return specialists.filter((specialist) => {
      const firstName = specialist.firstName.toLowerCase();
      const lastName = specialist.lastName.toLowerCase();
      const fullName = `${firstName} ${lastName}`;

      return (
        firstName.includes(search) ||
        lastName.includes(search) ||
        fullName.includes(search)
      );
    });
  }, [specialists, searchTerm]);

  const handleSpecialistSelection = (specialistId: string) => {
    if (pending) return;
    setSelectedSpecialistId(specialistId);
  };

  return (
    <ModalWrapper>
      <div className="flex max-h-[85dvh] w-[min(100%,30rem)] flex-col justify-start overflow-hidden rounded-2xl bg-surface border border-line">
        <div className="flex shrink-0 flex-col gap-3 border-b border-line p-5">
          <div className="flex justify-between items-center">
            <p className="type-card-title font-medium text-content-strong">
              {t("assignCustomer")}
            </p>

            <button
              onClick={onClose}
              className="hover:bg-surface-neutral transition-colors duration-200 p-3 rounded-full cursor-pointer"
            >
              <CloseIcon
                className="text-content-subtle"
                width="16"
                height="16"
              />
            </button>
          </div>

          <div className="w-full px-4 py-2.5 bg-surface-muted rounded-xl flex items-center gap-3 border border-line">
            <SearchIcon className="text-content-muted" />

            <input
              type="text"
              placeholder={t("searchSpecialists")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-base outline-none"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-3 px-5 py-2.5" aria-busy="true">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-line p-3"
              >
                <Skeleton className="size-9 rounded-full" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex min-h-0 flex-1 flex-col justify-start gap-3 overflow-y-auto px-5 py-2.5 overscroll-contain"
          >
            {filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((specialist) => (
                <SpecialistCard
                  key={specialist.id}
                  firstName={specialist.firstName}
                  lastName={specialist.lastName}
                  isSelected={selectedSpecialistId === specialist.id}
                  onClick={() => handleSpecialistSelection(specialist.id)}
                />
              ))
            ) : (
              <div className="type-body py-10 text-center text-content-subtle">
                {t("noSpecialistsFound")}
              </div>
            )}
          </motion.div>
        )}

        {specialists.length > 0 && specialistsPage && (
          <div className="px-5 py-2.5">
            <Pagination
              currentPage={page}
              totalPages={specialistsPage.totalPages}
              hasNextPage={specialistsPage.hasNextPage}
              isFetching={isFetching}
              onPageChange={setPage}
            />
          </div>
        )}

        <div className="shrink-0 border-t border-line bg-surface p-5">
          <button
            onClick={() => onSelect(selectedSpecialistId ?? "")}
            disabled={
              !selectedSpecialistId ||
              selectedSpecialistId === assignmentData.currentSpecialistId ||
              pending
            }
            className="type-control flex min-h-12 w-full items-center justify-center rounded-full bg-accent font-semibold text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-content-subtle"
          >
            {pending ? <Spinner spinnerSize={30} /> : t("assignToSpecialist")}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

type SpecialistCardProps = {
  firstName: string;
  lastName: string;
  isSelected: boolean;
  onClick: () => void;
};

const SpecialistCard = ({
  firstName,
  lastName,
  isSelected,
  onClick,
}: SpecialistCardProps) => {
  return (
    <motion.button
      variants={item}
      onClick={onClick}
      className={`ring cursor-pointer py-1.5 px-3 rounded-xl flex items-center gap-3 transition-colors ${
        isSelected
          ? "ring-brand bg-brand-soft ring-2"
          : "ring-line bg-surface-raised"
      }`}
    >
      <div className="type-meta flex size-9 items-center justify-center rounded-full bg-accent font-bold text-accent-contrast">
        {firstName.at(0)}
        {lastName.at(0)}
      </div>

      <p className="type-control font-medium">
        {firstName} {lastName}
      </p>
    </motion.button>
  );
};

export default AssignSpecialistModal;
