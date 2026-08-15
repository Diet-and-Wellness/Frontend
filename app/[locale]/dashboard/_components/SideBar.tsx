"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import DashboardIcon from "../../components/icons/DashboardIcon";
import CustomersIcon from "../../components/icons/CustomersIcon";
import SpecialistsIcon from "../../components/icons/SpecialistsIcon";
import BlogsIcon from "../../components/icons/BlogsIcon";
import FeedbackIcon from "../../components/icons/FeedbackIcon";
import SettingsIcon from "../../components/icons/SettingsIcon";
import { usePathname } from "@/i18n/navigation";
import Collapse from "../../components/icons/Collapse";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SideBar = ({
  collapsed,
  toggleCollapse,
  role,
}: {
  collapsed: boolean;
  toggleCollapse: () => void;
  role: "admin" | "specialist";
}) => {
  const pathname = usePathname();
  const t = useTranslations("dashboard");
  const isSpecialistDashboardActive =
    pathname === "/dashboard/specialist" ||
    pathname.startsWith("/dashboard/customers/");

  const sidebarList =
    role === "admin"
      ? [
          {
            label: t("dashboard"),
            icon: (
              <DashboardIcon
                className={`${pathname === "/dashboard/admin" ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin",
            isActive: pathname === "/dashboard/admin",
          },
          {
            label: t("specialists"),
            icon: (
              <SpecialistsIcon
                className={`${pathname === "/dashboard/admin/specialists" || pathname.startsWith("/dashboard/admin/specialists/") ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/specialists",
            isActive:
              pathname === "/dashboard/admin/specialists" ||
              pathname.startsWith("/dashboard/admin/specialists/"),
          },
          {
            label: t("customers"),
            icon: (
              <CustomersIcon
                className={`${pathname === "/dashboard/admin/customers" || pathname.startsWith("/dashboard/customers") ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/customers",
            isActive:
              pathname.startsWith("/dashboard/admin/customers") ||
              pathname.startsWith("/dashboard/customers"),
          },
          {
            label: t("contentAndBlogs"),
            icon: (
              <BlogsIcon
                className={`${pathname === "/dashboard/admin/blogs" ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/blogs",
            isActive: pathname.startsWith("/dashboard/admin/blogs"),
          },
          {
            label: t("feedback"),
            icon: (
              <FeedbackIcon
                className={`${pathname === "/dashboard/admin/feedback" ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/feedback",
            isActive: pathname === "/dashboard/admin/feedback",
          },
          {
            label: t("settings"),
            icon: (
              <SettingsIcon
                className={`${pathname === "/dashboard/admin/settings" ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/settings",
            isActive: pathname === "/dashboard/admin/settings",
          },
        ]
      : [
          {
            label: t("dashboard"),
            icon: (
              <DashboardIcon
                className={`${isSpecialistDashboardActive ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/specialist",
            isActive: isSpecialistDashboardActive,
          },
          {
            label: t("settings"),
            icon: (
              <SettingsIcon
                className={`${pathname === "/dashboard/specialist/settings" ? "text-accent" : "text-content"} group-hover:text-accent transition-colors duration-150`}
              />
            ),
            href: "/dashboard/specialist/settings",
            isActive: pathname === "/dashboard/specialist/settings",
          },
        ];

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 100 : 256 }}
        transition={dashboardShellTransition}
        className="fixed inset-s-0 top-0 bottom-0 hidden overflow-x-hidden overflow-y-scroll border-e border-line bg-surface md:block hide-scrollbar"
      >
        <div className="flex max-h-17 items-center px-6 py-3">
          <div className="group relative h-12 w-full">
            <Link href={"/"}>
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={50}
                height={50}
                className={`absolute inset-s-0 top-1/2 -translate-y-1/2 transition-[opacity,transform] duration-200 ${
                  collapsed ? "group-hover:scale-75 group-hover:opacity-0" : ""
                }`}
              />
            </Link>
            <motion.button
              type="button"
              onClick={toggleCollapse}
              aria-label={collapsed ? t("expandSidebar") : t("collapseSidebar")}
              initial={false}
              animate={{
                opacity: collapsed ? 0 : 1,
                scale: collapsed ? 0.8 : 1,
              }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-e-0 top-0 flex size-12 cursor-pointer items-center justify-center rounded-full text-content-subtle hover:bg-surface-neutral"
            >
              <Collapse
                className={`transition-transform duration-300 ${
                  collapsed ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          </div>
        </div>

        <nav className="px-5 py-2.5">
          <ul className="flex flex-col gap-2.5">
            {sidebarList.map((item) => (
              <SideBarItem
                key={item.href}
                label={item.label}
                icon={item.icon}
                href={item.href}
                isActive={item.isActive}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>
      </motion.aside>

      <nav
        aria-label="Dashboard navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface px-2 pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden"
      >
        <ul className="flex items-center justify-around gap-1 overflow-x-auto">
          {sidebarList.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-label={item.label}
                className={`group flex size-12 items-center justify-center rounded-xl transition-colors ${item.isActive ? "bg-accent-soft" : "bg-transparent"}`}
              >
                <span className="min-w-6">{item.icon}</span>
                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

const SideBarItem = ({
  label,
  icon,
  href,
  isActive,
  collapsed,
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
  collapsed: boolean;
}) => {
  return (
    <Link href={href} className="w-full overflow-hidden">
      <div
        className={`relative group p-2 ps-5 ${isActive ? "bg-accent-soft" : "bg-surface-raised"} hover:bg-accent-soft transition-colors duration-200 flex flex-row items-center gap-3`}
      >
        <div
          className={`
            absolute
            -inset-s-2
            top-1/2
            -translate-y-1/2
            w-4
            h-10
            bg-accent
            rounded-full

            ${isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}

            group-hover:scale-y-100
            group-hover:opacity-100
            transition-all
            duration-250
            origin-center
          `}
        />

        <div className="min-w-6">{icon}</div>

        <motion.div
          initial={false}
          animate={{
            width: collapsed ? 0 : "auto",
            opacity: collapsed ? 0 : 1,
          }}
          transition={{
            duration: collapsed ? 0.16 : 0.22,
            delay: collapsed ? 0 : 0.08,
            ease: "easeOut",
          }}
          className="overflow-hidden whitespace-nowrap"
        >
          <p
            className={`type-control ${isActive ? "font-extrabold" : "font-medium"}`}
          >
            {label}
          </p>
        </motion.div>
      </div>
    </Link>
  );
};

export const dashboardShellTransition = {
  duration: 0.32,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

export default SideBar;
