"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import Pagination from "../../_components/Pagination";
import { parsePaginatedResponse } from "@/app/[locale]/utils/pagination";

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
  const [page, setPage] = useState(1);
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
      if (page > 1 && specialists.length === 1) {
        setPage(page - 1);
      }

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

  const getSpecialists = async () => {
    const { data } = await profileApi.searchProfiles({
      role: "specialist",
      limit: 20,
      page,
    });
    return parsePaginatedResponse<SpecialistDTO>(data, page, 5);
  };

  const {
    data: specialistsPage,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["specialists", page],
    queryFn: getSpecialists,
    placeholderData: (previousData) => previousData,
  });
  const specialists = specialistsPage?.items ?? [];

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

      <motion.div
        variants={item}
        className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h2 className="type-page-title mb-3 font-bold sm:mb-4">
            {t("specialists")}
          </h2>
          <p className="type-body-lg font-light text-content-muted">
            {t("manageSpecialists")}
          </p>
        </div>
        <button
          onClick={() => setShowCreateSpecialistModal(true)}
          className="flex w-full justify-center rounded-full bg-accent px-5 py-2.5 transition duration-150 cursor-pointer hover:bg-accent-hover sm:w-auto"
        >
          <PlusIcon className="text-accent-contrast" />
          <p className="type-control font-medium text-surface">
            {t("addSpecialist")}
          </p>
        </button>
      </motion.div>

      {isLoading ? (
        <TableSkeleton columns={7} />
      ) : (specialists?.length ?? 0) > 0 ? (
        <div className="min-w-full overflow-x-auto border border-line rounded-2xl bg-surface">
          <motion.table
            variants={container}
            className="min-w-full divide-y divide-line"
          >
            <thead className="bg-surface-subtle">
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
              className="divide-y divide-line bg-surface-raised"
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

      {specialists.length > 0 && specialistsPage && (
        <Pagination
          currentPage={page}
          totalPages={specialistsPage.totalPages}
          hasNextPage={specialistsPage.hasNextPage}
          isFetching={isFetching}
          onPageChange={setPage}
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
  const actionsButtonRef = useRef<HTMLButtonElement>(null);
  const actionsMenuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    openAbove: false,
  });

  const toggleOpenedMenu = () => {
    if (isOpened) {
      setOpenedMenuId(null);
      return;
    }

    const buttonRect = actionsButtonRef.current?.getBoundingClientRect();

    if (buttonRect) {
      const viewportPadding = 8;
      const menuWidth = Math.min(256, window.innerWidth - viewportPadding * 2);
      const estimatedMenuHeight = 190;
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const openAbove =
        spaceBelow < estimatedMenuHeight + viewportPadding &&
        buttonRect.top > spaceBelow;

      setMenuPosition({
        top: openAbove
          ? buttonRect.top - viewportPadding
          : buttonRect.bottom + viewportPadding,
        left: Math.min(
          Math.max(buttonRect.right - menuWidth, viewportPadding),
          window.innerWidth - menuWidth - viewportPadding,
        ),
        openAbove,
      });
    }

    setOpenedMenuId(specialist.id);
  };

  useEffect(() => {
    if (!isOpened) return;

    const closeMenuOnOutsideInteraction = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        actionsButtonRef.current?.contains(target) ||
        actionsMenuRef.current?.contains(target)
      ) {
        return;
      }

      setOpenedMenuId(null);
    };

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedMenuId(null);
        actionsButtonRef.current?.focus();
      }
    };

    const closeMenuOnViewportChange = () => setOpenedMenuId(null);

    document.addEventListener("pointerdown", closeMenuOnOutsideInteraction);
    document.addEventListener("keydown", closeMenuOnEscape);
    window.addEventListener("resize", closeMenuOnViewportChange);
    window.addEventListener("scroll", closeMenuOnViewportChange, true);

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeMenuOnOutsideInteraction,
      );
      document.removeEventListener("keydown", closeMenuOnEscape);
      window.removeEventListener("resize", closeMenuOnViewportChange);
      window.removeEventListener("scroll", closeMenuOnViewportChange, true);
    };
  }, [isOpened, setOpenedMenuId]);

  return (
    <motion.tr
      layout
      variants={item}
      className="type-table font-light text-content-muted transition-colors"
    >
      <TableCell>
        <span className="text-content">{`${specialist.firstName} ${specialist.lastName}`}</span>
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
          ref={actionsButtonRef}
          type="button"
          onClick={toggleOpenedMenu}
          aria-expanded={isOpened}
          aria-haspopup="menu"
          className="flex size-10 items-center justify-center place-self-center cursor-pointer hover:bg-surface-neutral rounded-full"
        >
          <Dots className="text-content" />
        </button>
        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {isOpened && (
                <div
                  className="fixed z-50 w-64 max-w-[calc(100vw-1rem)]"
                  style={{
                    top: menuPosition.top,
                    left: menuPosition.left,
                    transform: menuPosition.openAbove
                      ? "translateY(-100%)"
                      : undefined,
                  }}
                >
                  <motion.div
                    ref={actionsMenuRef}
                    role="menu"
                    initial={{
                      opacity: 0,
                      y: menuPosition.openAbove ? 12 : -12,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: menuPosition.openAbove ? 12 : -12,
                    }}
                    className="rounded-2xl border border-line bg-surface-raised shadow-[0_2px_10px_0px_var(--color-palette-00000026)]"
                  >
                    <div className="p-3.5 flex flex-col gap-3.5">
                      <Link
                        href={`/dashboard/admin/specialists/${specialist.id}/clients`}
                        role="menuitem"
                        onClick={() => setOpenedMenuId(null)}
                        className="w-full flex items-center gap-2.5 cursor-pointer"
                      >
                        <MenuIcon className="text-content" />
                        <p className="type-label font-light text-content">
                          {t("viewClientList")}
                        </p>
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setOpenedMenuId(null);
                          openAlertModal();
                        }}
                        className="w-full flex items-center gap-2.5 cursor-pointer"
                      >
                        <TrashIcon className="text-danger" />
                        <p className="type-label font-light text-danger">
                          {t("deleteSpecialist")}
                        </p>
                      </button>
                    </div>
                    <div className="flex items-center gap-3 border-t border-t-line p-3.5">
                      <Switch
                        isOn={specialist.specialistInfo.status === "active"}
                        activate={activate}
                        deactivate={deactivate}
                      />
                      <span>{t("activateSpecialist")}</span>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body,
          )}
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
      className={`whitespace-nowrap px-6 py-4 text-start text-content-muted font-light ${className}`}
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
      className={`whitespace-nowrap px-6 py-4 text-start text-content-muted font-light ${className}`}
    >
      {children}
    </td>
  );
};

export default SpecialistsPage;
