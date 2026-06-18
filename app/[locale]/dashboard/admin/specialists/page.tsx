"use client";

import { useState } from "react";
import StateComp from "@/app/[locale]/components/Dashboard/StateComp";
import Dots from "@/app/[locale]/components/icons/Dots";
import { AnimatePresence, motion } from "framer-motion";
import TrashIcon from "@/app/[locale]/components/icons/TrashIcon";
import MenuIcon from "@/app/[locale]/components/icons/MenuIcon";
import Switch from "@/app/[locale]/components/Dashboard/Switch";
import PlusIcon from "@/app/[locale]/components/icons/PlusIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { SpecialistDTO } from "@/app/[locale]/api/types/profile.types";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import CreateSpecialistModal from "@/app/[locale]/components/Modals/CreateSpecialistModal";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import TrashIllustrator from "@/app/[locale]/components/icons/TrashIllustrator";

const SpecialistsPage = () => {
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);
  const [showCreateSpecialistModal, setShowCreateSpecialistModal] =
    useState<boolean>(false);
  const [specialistDeletion, setSpecialistDeletion] = useState<{
    showAlertModal: boolean;
    specialistId: string | null;
  }>({
    showAlertModal: false,
    specialistId: null,
  });

  const queryClient = useQueryClient();

  const openAlertModal = (specialistId: string) => {
    setSpecialistDeletion({
      specialistId: specialistId,
      showAlertModal: true,
    });
  };

  const closeAlertModal = () => {
    setSpecialistDeletion({
      specialistId: null,
      showAlertModal: false,
    });
  };

  const confirmSpecialistDeletion = () => {
    deleteSpecialistMutation.mutate();
  };

  const deleteSpecialistMutation = useMutation({
    mutationFn: async () => {
      await profileApi.deleteProfile(specialistDeletion.specialistId ?? "");
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["specialists"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["dashboardStat"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["recentSpecialists"],
        }),
      ]);
      closeAlertModal();
    },
  });

  const validateCache = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["specialists"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["dashboardStat"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["recentSpecialists"],
      }),
    ]);
  };

  const activate = (specialistId: string) => {
    statusActivationMutation.mutate(specialistId);
  };

  const deactivate = (specialistId: string) => {
    statusDeactivationMutation.mutate(specialistId);
  };

  const statusActivationMutation = useMutation({
    mutationFn: async (specialistId: string) => {
      await profileApi.activateSpecialist(specialistId);
    },
    onSuccess: () => validateCache(),
  });

  const statusDeactivationMutation = useMutation({
    mutationFn: async (specialistId: string) => {
      await profileApi.deactivateSpecialist(specialistId);
    },
    onSuccess: () => validateCache(),
  });

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

  return (
    <section className="flex w-full flex-col gap-10">
      <AnimatePresence mode="wait">
        {showCreateSpecialistModal && (
          <CreateSpecialistModal
            key="create-specialist-modal"
            closeModal={() => setShowCreateSpecialistModal(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {specialistDeletion.showAlertModal && (
          <AlertModal
            illustrator={<TrashIllustrator />}
            key="delete-specialist-modal"
            note={"Are you sure you want to delete this Specialist ?"}
            confirmBtnTitle={"Yes I’m Sure"}
            confirm={confirmSpecialistDeletion}
            closeModal={closeAlertModal}
            pending={deleteSpecialistMutation.isPending}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Specialists</h2>
          <p className="text-xl font-light text-[#4F4F4F]">
            Manage your team of wellness specialists.
          </p>
        </div>
        <button
          onClick={() => setShowCreateSpecialistModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#E99532] cursor-pointer hover:bg-[#e28010] transition duration-150 flex"
        >
          <PlusIcon className="text-white" />
          <p className="text-[#FFFEFD] text-[16px] font-medium">
            Add Specialist
          </p>
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="place-self-center my-50">
          <Spinner spinnerSize={50} borderColor="#4D8E32" />
        </div>
      ) : (
        <div className="min-w-full overflow-x-auto border border-[#E1E7EF] rounded-2xl bg-[#FFFEFD]">
          <table className="min-w-full divide-y divide-[#E1E7EF]">
            <thead className="bg-[#FCFCFC]">
              <tr>
                <TableHeaderCell>Name</TableHeaderCell>

                <TableHeaderCell>Specialty</TableHeaderCell>

                <TableHeaderCell>Email</TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">Phone</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">No. of Clients</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">Status</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">Actions</p>
                </TableHeaderCell>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E1E7EF] bg-[#FFFEFD]">
              {specialists?.map((specialist) => (
                <SpecialistRow
                  key={specialist.id}
                  specialist={specialist}
                  openedMenuId={openedMenuId}
                  setOpenedMenuId={setOpenedMenuId}
                  openAlertModal={() => openAlertModal(specialist.id)}
                  activate={() => activate(specialist.id)}
                  deactivate={() => deactivate(specialist.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const SpecialistRow = ({
  specialist,
  openedMenuId,
  setOpenedMenuId,
  openAlertModal,
  activate,
  deactivate,
}: {
  specialist: SpecialistDTO;
  openedMenuId: string | null;
  setOpenedMenuId: React.Dispatch<React.SetStateAction<string | null>>;
  openAlertModal: () => void;
  activate: () => void;
  deactivate: () => void;
}) => {
  const isOpened = openedMenuId === specialist.id;

  const toggleOpenedMenu = () => {
    setOpenedMenuId((prev) => (prev === specialist.id ? null : specialist.id));
  };

  return (
    <tr className="text-base font-light text-[#4F4F4F] transition-colors">
      <TableCell>
        <span className="text-black">{`${specialist.firstName} ${specialist.lastName}`}</span>
      </TableCell>

      <TableCell>{specialist.specialistInfo.specialization}</TableCell>

      <TableCell>{specialist.email}</TableCell>

      <TableCell>
        <p className="text-center">{specialist.phone}</p>
      </TableCell>

      <TableCell>
        <p className="text-center">{specialist.assignedCustomersCount}</p>
      </TableCell>

      <TableCell>
        <StateComp state={specialist.specialistInfo.status} />
      </TableCell>

      <TableCell className="relative">
        <button
          onClick={toggleOpenedMenu}
          className="flex size-10 items-center justify-center place-self-center cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <Dots className="text-black" />
        </button>
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="border border-[#E1E7EF] rounded-2xl bg-white absolute shadow-[0_2px_10px_0px_#00000026] z-20 top-15 right-8"
            >
              <div className="p-3.5 flex flex-col gap-3.5">
                <button className="w-full flex items-center gap-2.5 cursor-pointer">
                  <MenuIcon className="text-black" />
                  <p className="text-black text-[16px] font-light">
                    View client list
                  </p>
                </button>
                <button
                  onClick={openAlertModal}
                  className="w-full flex items-center gap-2.5 cursor-pointer"
                >
                  <TrashIcon className="text-[#DC2626]" />
                  <p className="text-[#DC2626] text-[16px] font-light">
                    Delete Specialist
                  </p>
                </button>
              </div>
              <div className="flex items-center gap-3 border-t border-t-[#E1E7EF] p-3.5">
                <Switch
                  isOn={specialist.specialistInfo.status === "active"}
                  activate={activate}
                  deactivate={deactivate}
                />
                <span>Activate Specialist</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TableCell>
    </tr>
  );
};

const TableHeaderCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={`whitespace-nowrap px-6 py-4 text-start text-[#4F4F4F] font-light ${className}`}
    >
      {children}
    </th>
  );
};

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <td
      className={`whitespace-nowrap px-6 py-4 text-start text-[#4F4F4F] font-light ${className}`}
    >
      {children}
    </td>
  );
};

export default SpecialistsPage;
