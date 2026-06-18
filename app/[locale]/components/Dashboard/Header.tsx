"use client";

import ArrowDownIcon from "../icons/ArrowDownIcon";
// import NotificationIcon from "../icons/NotificationIcon";
import SearchIcon from "../icons/SearchIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useMe } from "../../hooks/useMe";
import LogoutIcon from "../icons/LogoutIcon";
import { useState } from "react";
import { authApi } from "../../api/endpoints/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import AlertModal from "../Modals/AlertModal";
import LogoutIllustrator from "../icons/LogoutIllustrator";

const DashboardHeader = ({ collapsed }: { collapsed: boolean }) => {
  const [showMenu, setShowMenu] = useState(false);

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
      animate={{
        left: collapsed ? 100 : 256,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className="px-7.5 py-2.5 max-h-17 bg-[#FFFEFD] border-b border-[#e1e7ef88] fixed z-50 top-0 right-0 flex flex-row justify-between items-center"
    >
      <AnimatePresence mode="wait">
        {showLogoutModal && (
          <AlertModal
            key="logout-modal"
            illustrator={<LogoutIllustrator />}
            note={"Are you sure you want to logout"}
            confirmBtnTitle={"Yes, logout"}
            confirm={logout}
            closeModal={closeLogoutModalHandler}
            pending={logoutMutation.isPending}
          />
        )}
      </AnimatePresence>

      <div className="w-95 px-4 py-2.5 bg-[#F9F9F9] rounded-xl flex flex-row items-center gap-3 border border-[#e1e7ef88]">
        <SearchIcon className="text-[#4F4F4F]" />
        <input
          type="text"
          placeholder="Search clients..."
          className="outline-none w-full"
        />
      </div>

      <div className="flex flex-row gap-5 items-center">
        {/* <button className="relative cursor-pointer p-2.5">
          <NotificationIcon className="text-black" />
          <div className="bg-[#E99532] rounded-full size-5 flex justify-center items-center absolute -top-0.5 -right-1 text-[#FFFEFD] text-[12px] font-bold">
            2
          </div>
        </button> */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="rounded-xl px-2 py-2 flex flex-row gap-3 items-center cursor-pointer border border-[#E1E7EF]"
        >
          <div className="size-9 bg-[#E99532] rounded-xl flex justify-center items-center relative">
            <div className="size-3 bg-[#4D8E32] absolute rounded-full -top-0.5 -right-0.5 shadow-[0_0_0_2px_white]"></div>
            <span className="text-[#FFFEFD] text-[13px] font-bold">
              {me?.firstName?.at(0)}
              {me?.lastName?.at(0)}
            </span>
          </div>
          <span className="text-black text-[16px] font-medium">
            {me?.firstName}
          </span>
          <ArrowDownIcon className="text-[#4F4F4F] mx-2" />
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, top: 50 }}
            animate={{ opacity: 1, top: 70 }}
            exit={{ opacity: 0, top: 50 }}
            className={`p-2 border border-[#E1E7EF] rounded-lg bg-white flex flex-col gap-2 absolute right-7.5 shadow-[0_0_10px_0px_rgba(0,0,0,0.1)]`}
          >
            <button
              disabled={logoutMutation.isPending}
              onClick={showLogoutModalHandler}
              className={`min-w-40 p-2 text-center flex items-center gap-3 cursor-pointer hover:bg-red-50 transition-colors duration-150`}
            >
              <LogoutIcon className="text-[#DC2626]" />
              <p className="text-[18px] text-[#DC2626]">Logout</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default DashboardHeader;
