"use client";

import React, { useEffect } from "react";
import AuthHeader from "./_components/AuthHeader";
import AuthFooter from "./_components/AuthFooter";
import { useMe } from "../hooks/useMe";
import { LogoLoader } from "../components/Public/Skeletons";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getRoleDestination } from "./_components/auth/authFlow";
import { div } from "framer-motion/client";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: me, isLoading } = useMe();

  useEffect(() => {
    if (!isLoading && me) {
      const isCompletingProfile = pathname === "/complete-profile";

      if (!me.phone && !isCompletingProfile) {
        router.replace("/complete-profile");
        return;
      }

      if (!isCompletingProfile || me.phone) {
        router.replace(getRoleDestination(me));
      }
    }
  }, [me, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="absolute inset-0">
        <LogoLoader />;
      </div>
    );
  }

  return (
    <div className="">
      <AuthHeader />
      {children}
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
