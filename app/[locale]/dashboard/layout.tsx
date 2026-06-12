"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "../components/Dashboard/Header";
import SideBar from "../components/Dashboard/SideBar";
import { motion } from "framer-motion";
import { useMe } from "../hooks/useMe";
import { getCleanPathname } from "../utils/getCleanPathname";
import Spinner from "../components/Public/LoadingSpinner";

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner spinnerSize={60} borderColor="#4D8E32" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F9F9F9]">
      <SideBar
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        role={me?.role}
      />

      <motion.div
        initial={false}
        animate={{
          marginLeft: collapsed ? 100 : 256,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="mt-12.5 md:mt-14.5 lg:mt-15.5 px-5 py-7.5 md:px-7.5 flex flex-1"
      >
        <DashboardHeader collapsed={collapsed} />
        {children}
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
