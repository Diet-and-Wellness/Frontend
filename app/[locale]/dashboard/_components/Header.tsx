"use client";

import ArrowDownIcon from "../../components/icons/ArrowDownIcon";
// import NotificationIcon from "../icons/NotificationIcon";
// import SearchIcon from "../../components/icons/SearchIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useMe } from "../../hooks/useMe";
import LogoutIcon from "../../components/icons/LogoutIcon";
import { useEffect, useRef, useState } from "react";
import { authApi } from "../../api/endpoints/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import LogoutIllustrator from "../../components/icons/LogoutIllustrator";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { dashboardShellTransition } from "./SideBar";
import ThemeSwitch from "../../components/Theme/ThemeSwitch";

const DashboardHeader = ({ collapsed }: { collapsed: boolean }) => {
  const [showMenu, setShowMenu] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("dashboard");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data: me } = useMe();

  const queryClient = useQueryClient();

  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.replace("/signin");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const showLogoutModalHandler = () => {
    setShowLogoutModal(true);
    setShowMenu(false);
  };

  const closeLogoutModalHandler = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenuOnOutsideInteraction = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        profileButtonRef.current?.contains(target) ||
        profileMenuRef.current?.contains(target)
      ) {
        return;
      }

      setShowMenu(false);
    };

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowMenu(false);
        profileButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeMenuOnOutsideInteraction);
    document.addEventListener("keydown", closeMenuOnEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeMenuOnOutsideInteraction,
      );
      document.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, [showMenu]);

  return (
    <motion.header
      initial={false}
      animate={{ insetInlineStart: collapsed ? 100 : 256 }}
      transition={dashboardShellTransition}
      className="fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between border-b border-line bg-surface px-4 py-2.5 sm:px-5 md:px-7.5 max-md:inset-s-0!"
    >
      <div className="md:hidden">
        <Image
          src="/icons/logo.svg"
          alt="Diet and Wellness"
          width={56}
          height={56}
        />
      </div>

      <AnimatePresence mode="wait">
        {showLogoutModal && (
          <AlertModal
            key="logout-modal"
            illustrator={<LogoutIllustrator />}
            note={t("logoutConfirmation")}
            confirmBtnTitle={t("confirmLogout")}
            confirm={logout}
            closeModal={closeLogoutModalHandler}
            pending={logoutMutation.isPending}
          />
        )}
      </AnimatePresence>

      {/* <div className="hidden w-95 items-center gap-3 rounded-xl border border-line bg-surface-muted px-4 py-2.5 sm:flex">
        <SearchIcon className="text-content-muted" />
        <input
          type="text"
          placeholder={t("searchClients")}
          className="w-full text-base outline-none"
        />
      </div> */}

      <div className="flex items-center justify-end gap-3 sm:gap-5 w-full">
        <ThemeSwitch />
        {/* <button className="relative cursor-pointer p-2.5">
          <NotificationIcon className="text-content" />
          <div className="bg-accent rounded-full size-5 flex justify-center items-center absolute -top-0.5 -end-1 text-surface text-[12px] font-bold">
            2
          </div>
        </button> */}
        <button
          ref={profileButtonRef}
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          aria-expanded={showMenu}
          aria-haspopup="menu"
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface-muted px-2 py-2 sm:gap-3 transition-colors hover:border-brand"
        >
          <div className="size-9 bg-accent rounded-xl flex justify-center items-center relative">
            <div className="size-3 bg-brand absolute rounded-full -top-0.5 -inset-e-0.5 shadow-[0_0_0_2px_var(--color-surface)]"></div>
            <span className="type-meta font-bold text-accent-contrast">
              {me?.firstName?.at(0)}
              {me?.lastName?.at(0)}
            </span>
          </div>
          <span className="type-control hidden font-medium text-content sm:block">
            {me?.firstName}
          </span>
          <ArrowDownIcon className="mx-2 hidden text-content-muted sm:block" />
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            ref={profileMenuRef}
            role="menu"
            initial={{ opacity: 0, top: 50 }}
            animate={{ opacity: 1, top: 70 }}
            exit={{ opacity: 0, top: 50 }}
            className="absolute inset-e-4 flex flex-col gap-2 rounded-lg border border-line bg-surface p-2 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] sm:inset-e-7.5"
          >
            <button
              type="button"
              role="menuitem"
              disabled={logoutMutation.isPending}
              onClick={showLogoutModalHandler}
              className={`min-w-40 p-2 text-center flex items-center gap-3 cursor-pointer hover:bg-surface-neutral transition-colors duration-150 rounded-lg`}
            >
              <LogoutIcon className="text-danger" />
              <p className="type-control text-danger">{t("logout")}</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default DashboardHeader;
