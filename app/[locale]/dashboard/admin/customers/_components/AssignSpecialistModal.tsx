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

  const getSpecialists = async (): Promise<SpecialistDTO[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "specialist",
      limit: 20,
      page: 1,
    });

    return data?.data ?? [];
  };

  const { data: specialists, isLoading } = useQuery({
    queryKey: ["specialists"],
    queryFn: getSpecialists,
  });

  const filteredSpecialists = useMemo(() => {
    if (!specialists) return [];

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
      <div className="flex max-h-[85vh] w-[min(100%,30rem)] flex-col justify-start overflow-y-auto rounded-2xl bg-[#FFFEFD]">
        <div className="p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="type-card-title font-medium text-gray-900">
              {t("assignCustomer")}
            </p>

            <button
              onClick={onClose}
              className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
            >
              <CloseIcon className="text-gray-500" width="16" height="16" />
            </button>
          </div>

          <div className="w-full px-4 py-2.5 bg-[#F9F9F9] rounded-xl flex items-center gap-3 border border-[#E1E7EF]">
            <SearchIcon className="text-[#4F4F4F]" />

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
                className="flex items-center gap-3 rounded-xl border border-[#E1E7EF] p-3"
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
            className="px-5 py-2.5 flex flex-col justify-start gap-3 overflow-auto"
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
              <div className="type-body py-10 text-center text-gray-500">
                {t("noSpecialistsFound")}
              </div>
            )}
          </motion.div>
        )}

        <div className="p-5">
          <button
            onClick={() => onSelect(selectedSpecialistId ?? "")}
            disabled={
              !selectedSpecialistId ||
              selectedSpecialistId === assignmentData.currentSpecialistId ||
              pending
            }
            className="type-control flex min-h-12 w-full items-center justify-center rounded-full bg-[#E99532] font-semibold text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
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
          ? "ring-[#4D8E32] bg-green-50 ring-2"
          : "ring-[#E1E7EF] bg-white"
      }`}
    >
      <div className="type-meta flex size-9 items-center justify-center rounded-full bg-[#E99532] font-bold text-white">
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
