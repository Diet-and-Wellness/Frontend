"use client";

import { useState } from "react";
import DashboardHeader from "../components/Dashboard/Header";
import SideBar from "../components/Dashboard/SideBar";
import { motion } from "framer-motion";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F9F9F9]">
      <SideBar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <motion.div
        animate={{
          marginLeft: collapsed ? 100 : 256,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="mt-12.5 md:mt-14.5 lg:mt-15.5 p-5 md:p-7.5 flex flex-1"
      >
        <DashboardHeader collapsed={collapsed} />
        {children}
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
