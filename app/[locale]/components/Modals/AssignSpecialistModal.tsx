import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ModalWrapper from "../Public/ModalWrapper";
import Spinner from "../Public/LoadingSpinner";

import { SpecialistDTO } from "../../api/types/profile.types";
import { profileApi } from "../../api/endpoints/profile.api";
import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";

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
      <div className="flex flex-col justify-start bg-[#FFFEFD] rounded-2xl min-w-120 max-h-[85vh]">
        <div className="p-5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-[18px] font-medium text-gray-900">
              Assign Customer to Specialist
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
              placeholder="Search specialists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner spinnerSize={60} borderColor="#4D8E32" />
          </div>
        ) : (
          <div className="px-5 py-2.5 flex flex-col justify-start gap-3 overflow-auto">
            {filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((specialist) => (
                <SpecialistComp
                  key={specialist.id}
                  firstName={specialist.firstName}
                  lastName={specialist.lastName}
                  isSelected={selectedSpecialistId === specialist.id}
                  onClick={() => handleSpecialistSelection(specialist.id)}
                />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">
                No specialists found.
              </div>
            )}
          </div>
        )}

        <div className="p-5">
          <button
            onClick={() => onSelect(selectedSpecialistId ?? "")}
            disabled={
              !selectedSpecialistId ||
              selectedSpecialistId === assignmentData.currentSpecialistId ||
              pending
            }
            className="w-full min-h-12.5 bg-[#E99532] rounded-2xl text-white font-semibold text-lg cursor-pointer flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? <Spinner spinnerSize={30} /> : "Assign Specialist"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

type SpecialistCompProps = {
  firstName: string;
  lastName: string;
  isSelected: boolean;
  onClick: () => void;
};

const SpecialistComp = ({
  firstName,
  lastName,
  isSelected,
  onClick,
}: SpecialistCompProps) => {
  return (
    <button
      onClick={onClick}
      className={`ring cursor-pointer py-1.5 px-3 rounded-xl flex items-center gap-3 transition-colors ${
        isSelected
          ? "ring-[#4D8E32] bg-green-50 ring-2"
          : "ring-[#E1E7EF] bg-white"
      }`}
    >
      <div className="size-9 rounded-full bg-[#E99532] text-[12px] font-bold text-white flex items-center justify-center">
        {firstName.at(0)}
        {lastName.at(0)}
      </div>

      <p className="text-[16px] font-medium">
        {firstName} {lastName}
      </p>
    </button>
  );
};

export default AssignSpecialistModal;
