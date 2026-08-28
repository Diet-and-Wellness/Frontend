"use client";

import "./LandingLayout.css";
import React, { useState } from "react";
import LandingHeader from "./_components/LandingHeader/LandingHeader";
import LandingFooter from "./_components/LandingFooter/LandingFooter";
import { AnimatePresence } from "framer-motion";
import AlertModal from "../components/Modals/AlertModal";
import LogoutIllustrator from "../components/icons/LogoutIllustrator";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { authApi } from "../api/endpoints/auth.api";
import { useMe } from "../hooks/useMe";
import { LogoLoader } from "../components/Public/Skeletons";
import MinimalFooter from "./_components/LandingFooter/MinimalFooter";
import MinimalHeader from "./_components/LandingHeader/MinimalHeader";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const t = useTranslations();

  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();
  const isLegalPage =
    pathname.endsWith("/terms-and-conditions") ||
    pathname.endsWith("/privacy-policy");

  const { isLoading } = useMe();

  const logoutMutation = useMutation({
    mutationFn: async () => await authApi.logout(),
    onSuccess: () => {
      closeLogoutModalHandler();
      queryClient.clear();
      router.replace("/signin");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const openLogoutModalHandler = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModalHandler = () => {
    setShowLogoutModal(false);
  };

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <div className="landingContainer">
      {isLegalPage ? (
        <MinimalHeader />
      ) : (
        <LandingHeader
          onClickLogout={openLogoutModalHandler}
          isLoggingout={logoutMutation.isPending}
        />
      )}

      {children}

      {isLegalPage ? <MinimalFooter /> : <LandingFooter />}

      <AnimatePresence mode="wait">
        {showLogoutModal && (
          <AlertModal
            key="logout-modal"
            illustrator={<LogoutIllustrator />}
            note={t("dashboard.logoutConfirmation")}
            confirmBtnTitle={t("dashboard.confirmLogout")}
            confirm={logout}
            closeModal={closeLogoutModalHandler}
            pending={logoutMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingLayout;
