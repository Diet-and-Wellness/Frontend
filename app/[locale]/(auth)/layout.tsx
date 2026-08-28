"use client";

import React, { useEffect } from "react";
import AuthHeader from "./_components/AuthHeader";
import MinimalFooter from "../(landingPage)/_components/LandingFooter/MinimalFooter";
import { useMe } from "../hooks/useMe";
import { LogoLoader } from "../components/Public/Skeletons";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getRoleDestination } from "./_components/auth/authFlow";

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
      <MinimalFooter />
    </div>
  );
};

export default AuthLayout;
