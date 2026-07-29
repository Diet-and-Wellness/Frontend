"use client";

import { useState } from "react";
import StateComp from "../../_components/StateComp";
import Dots from "@/app/[locale]/components/icons/Dots";
import { AnimatePresence, motion } from "framer-motion";
import TrashIcon from "@/app/[locale]/components/icons/TrashIcon";
import MenuIcon from "@/app/[locale]/components/icons/MenuIcon";
import Switch from "../../_components/Switch";
import PlusIcon from "@/app/[locale]/components/icons/PlusIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { SpecialistDTO } from "@/app/[locale]/api/types/profile.types";
import { TableSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import CreateSpecialistModal from "./_components/CreateSpecialistModal";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import TrashIllustrator from "@/app/[locale]/components/icons/TrashIllustrator";
import Link from "next/link";
import EmptyComp from "@/app/[locale]/components/Public/Empty";
import { useTranslations } from "next-intl";

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

const SpecialistsPage = () => {
  const t = useTranslations("dashboard");
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
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="flex w-full flex-col gap-10"
    >
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
            note={t("deleteSpecialistConfirmation")}
            confirmBtnTitle={t("confirmDelete")}
            confirm={confirmSpecialistDeletion}
            closeModal={closeAlertModal}
            pending={deleteSpecialistMutation.isPending}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div variants={item} className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="type-page-title mb-3 font-bold sm:mb-4">{t("specialists")}</h2>
          <p className="type-body-lg font-light text-[#4F4F4F]">
            {t("manageSpecialists")}
          </p>
        </div>
        <button
          onClick={() => setShowCreateSpecialistModal(true)}
          className="flex w-full justify-center rounded-full bg-[#E99532] px-5 py-2.5 transition duration-150 cursor-pointer hover:bg-[#e28010] sm:w-auto"
        >
          <PlusIcon className="text-white" />
          <p className="type-control font-medium text-[#FFFEFD]">
            {t("addSpecialist")}
          </p>
        </button>
      </motion.div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton columns={7} />
      ) : (specialists?.length ?? 0) > 0 ? (
        <div className="min-w-full overflow-x-auto border border-[#E1E7EF] rounded-2xl bg-[#FFFEFD]">
          <motion.table
            variants={container}
            className="min-w-full divide-y divide-[#E1E7EF]"
          >
            <thead className="bg-[#FCFCFC]">
              <tr>
                <TableHeaderCell>{t("name")}</TableHeaderCell>

                <TableHeaderCell>{t("specialty")}</TableHeaderCell>

                <TableHeaderCell>{t("email")}</TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">{t("phone")}</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">{t("numberOfClients")}</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">{t("status")}</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">{t("actions")}</p>
                </TableHeaderCell>
              </tr>
            </thead>

            <motion.tbody
              variants={tableContainer}
              className="divide-y divide-[#E1E7EF] bg-[#fffdfe]"
            >
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
            </motion.tbody>
          </motion.table>
        </div>
      ) : (
        <EmptyComp
          title={t("noSpecialistsYet")}
          description={t("noSpecialistsDescription")}
        />
      )}
    </motion.section>
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
  const t = useTranslations("dashboard");
  const isOpened = openedMenuId === specialist.id;

  const toggleOpenedMenu = () => {
    setOpenedMenuId((prev) => (prev === specialist.id ? null : specialist.id));
  };

  return (
    <motion.tr
      layout
      variants={item}
      className="type-table font-light text-[#4F4F4F] transition-colors"
    >
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
              className="border border-[#E1E7EF] rounded-2xl bg-white absolute shadow-[0_2px_10px_0px_#00000026] z-20 top-15 inset-e-8"
            >
              <div className="p-3.5 flex flex-col gap-3.5">
                <Link
                  href={`/dashboard/admin/specialists/${specialist.id}/clients`}
                  className="w-full flex items-center gap-2.5 cursor-pointer"
                >
                  <MenuIcon className="text-black" />
                  <p className="type-label font-light text-black">
                    {t("viewClientList")}
                  </p>
                </Link>
                <button
                  onClick={openAlertModal}
                  className="w-full flex items-center gap-2.5 cursor-pointer"
                >
                  <TrashIcon className="text-[#DC2626]" />
                  <p className="type-label font-light text-[#DC2626]">
                    {t("deleteSpecialist")}
                  </p>
                </button>
              </div>
              <div className="flex items-center gap-3 border-t border-t-[#E1E7EF] p-3.5">
                <Switch
                  isOn={specialist.specialistInfo.status === "active"}
                  activate={activate}
                  deactivate={deactivate}
                />
                <span>{t("activateSpecialist")}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TableCell>
    </motion.tr>
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
