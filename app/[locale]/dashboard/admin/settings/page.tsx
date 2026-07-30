"use client";

import AdminProfileTab from "./_components/AdminProfileTab";
import SecurityTab from "../../_components/settings/SecurityTab";
import Tab from "../../_components/settings/Tab";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <motion.div variants={item} className="flex flex-col gap-2">
        <h3 className="type-page-title font-bold">{t("settings")}</h3>
        <p className="type-body-lg text-content-muted">
          {t("manageAdminProfileSecurity")}
        </p>
      </motion.div>

      <motion.div variants={item} className="mt-6 flex gap-4 sm:mt-7.5 sm:gap-10">
        <Tab
          label={t("profile")}
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <Tab
          label={t("security")}
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
