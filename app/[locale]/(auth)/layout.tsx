"use client";

import React, { useEffect } from "react";
import AuthHeader from "./_components/AuthHeader";
import AuthFooter from "./_components/AuthFooter";
import { useMe } from "../hooks/useMe";
import { LogoLoader } from "../components/Public/Skeletons";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: me, isLoading } = useMe();

  useEffect(() => {
    if (!isLoading && me) {
      if (me.role === "customer") {
        router.replace("/");
        return;
      } else if (me.role === "admin") {
        router.replace("/dashboard/admin");
        return;
      } else if (me.role === "specialist") {
        router.replace("/dashboard/specialist");
        return;
      }
    }
  }, [me, isLoading, router]);

  if (isLoading) {
    return <LogoLoader />;
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
