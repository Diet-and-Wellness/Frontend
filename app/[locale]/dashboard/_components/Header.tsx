"use client";

import ArrowDownIcon from "../../components/icons/ArrowDownIcon";
// import NotificationIcon from "../icons/NotificationIcon";
import SearchIcon from "../../components/icons/SearchIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useMe } from "../../hooks/useMe";
import LogoutIcon from "../../components/icons/LogoutIcon";
import { useState } from "react";
import { authApi } from "../../api/endpoints/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import LogoutIllustrator from "../../components/icons/LogoutIllustrator";
import { useTranslations } from "next-intl";
import Image from "next/image";

const DashboardHeader = ({ collapsed }: { collapsed: boolean }) => {
  const [showMenu, setShowMenu] = useState(false);
  const t = useTranslations("dashboard");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const data = useMe();

  const me = data?.data ?? {};

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

  return (
    <motion.header
      initial={false}
      className={`fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between border-b border-[#e1e7ef88] bg-[#FFFEFD] px-4 py-2.5 sm:px-5 md:px-7.5 md:transition-[inset-inline-start] md:duration-250 md:ease-in-out ${collapsed ? "md:inset-s-25" : "md:inset-s-64"}`}
      >
      <div className="sm:hidden">
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

      <div className="hidden w-95 items-center gap-3 rounded-xl border border-[#e1e7ef88] bg-[#F9F9F9] px-4 py-2.5 sm:flex">
        <SearchIcon className="text-[#4F4F4F]" />
        <input
          type="text"
          placeholder={t("searchClients")}
          className="w-full text-base outline-none"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* <button className="relative cursor-pointer p-2.5">
          <NotificationIcon className="text-black" />
          <div className="bg-[#E99532] rounded-full size-5 flex justify-center items-center absolute -top-0.5 -end-1 text-[#FFFEFD] text-[12px] font-bold">
            2
          </div>
        </button> */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#E1E7EF] px-2 py-2 sm:gap-3"
        >
          <div className="size-9 bg-[#E99532] rounded-xl flex justify-center items-center relative">
            <div className="size-3 bg-[#4D8E32] absolute rounded-full -top-0.5 -end-0.5 shadow-[0_0_0_2px_white]"></div>
            <span className="type-meta font-bold text-[#FFFEFD]">
              {me?.firstName?.at(0)}
              {me?.lastName?.at(0)}
            </span>
          </div>
          <span className="type-control hidden font-medium text-black sm:block">
            {me?.firstName}
          </span>
          <ArrowDownIcon className="mx-2 hidden text-[#4F4F4F] sm:block" />
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, top: 50 }}
            animate={{ opacity: 1, top: 70 }}
            exit={{ opacity: 0, top: 50 }}
            className="absolute inset-e-4 flex flex-col gap-2 rounded-lg border border-[#E1E7EF] bg-[#FFFEFD] p-2 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)] sm:end-7.5"
          >
            <button
              disabled={logoutMutation.isPending}
              onClick={showLogoutModalHandler}
              className={`min-w-40 p-2 text-center flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors duration-150 rounded-lg`}
            >
              <LogoutIcon className="text-[#DC2626]" />
              <p className="type-control text-[#DC2626]">{t("logout")}</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default DashboardHeader;
