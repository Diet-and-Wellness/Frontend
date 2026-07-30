"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "./_components/Header";
import SideBar, {
  dashboardShellTransition,
} from "./_components/SideBar";
import { MotionConfig, motion } from "framer-motion";
import { useMe } from "../hooks/useMe";
import { getCleanPathname } from "../utils/getCleanPathname";
import { DashboardLogoLoader } from "../components/Public/Skeletons";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const { data, isLoading } = useMe();

  const me = data;

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (!isLoading && !me) {
      router.replace("/signin");
      return;
    }

    if (!isLoading && me) {
      const pathname = getCleanPathname(window.location.pathname);
      if (me.role === "admin" && pathname.startsWith("/dashboard/specialist")) {
        router.replace("/dashboard/admin/");
        return;
      }
      if (me.role === "specialist" && pathname.startsWith("/dashboard/admin")) {
        router.replace("/dashboard/specialist/");
        return;
      }
    }
  }, [me, isLoading, router]);

  if (isLoading || !me) {
    return <DashboardLogoLoader />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col bg-surface-muted pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <SideBar
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
          role={me?.role}
        />

        <motion.div
          initial={false}
          animate={{ marginInlineStart: collapsed ? 100 : 256 }}
          transition={dashboardShellTransition}
          className="mt-20 flex flex-1 px-4 py-5 sm:px-5 md:px-7.5 md:py-7.5 max-md:ms-0!"
        >
          <DashboardHeader collapsed={collapsed} />
          {children}
        </motion.div>
      </div>
    </MotionConfig>
  );
};

export default DashboardLayout;
