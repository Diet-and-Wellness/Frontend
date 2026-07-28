"use client";

import AdminProfileTab from "./_components/AdminProfileTab";
import SecurityTab from "../../_components/settings/SecurityTab";
import Tab from "../../_components/settings/Tab";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
} as const;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <motion.div variants={item} className="flex flex-col gap-2">
        <h3 className="font-bold text-[30px]">Settings</h3>
        <p className="text-[#4F4F4F] text-[20px]">
          Manage your admin profile and account security.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex gap-10 mt-7.5">
        <Tab
          label="Profile"
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <Tab
          label="Security"
          isActive={activeTab === "security"}
          onClick={() => setActiveTab("security")}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === "profile" ? (
          <AdminProfileTab key="profile" />
        ) : (
          <SecurityTab key="security" />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default SettingsPage;
