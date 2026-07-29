"use client";

import Link from "next/link";
import { easeInOut, motion } from "framer-motion";

import DashboardIcon from "../../components/icons/DashboardIcon";
import CustomersIcon from "../../components/icons/CustomersIcon";
import SpecialistsIcon from "../../components/icons/SpecialistsIcon";
import BlogsIcon from "../../components/icons/BlogsIcon";
// import RecipesIcon from "../icons/RecipesIcon";
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
                className={`${pathname === "/dashboard/admin" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin",
            isActive: pathname === "/dashboard/admin",
          },
          {
            label: t("specialists"),
            icon: (
              <SpecialistsIcon
                className={`${pathname === "/dashboard/admin/specialists" || pathname.startsWith("/dashboard/admin/specialists/") ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
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
                className={`${pathname === "/dashboard/admin/customers" || pathname.startsWith("/dashboard/customers") ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
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
                className={`${pathname === "/dashboard/admin/blogs" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/blogs",
            isActive: pathname.startsWith("/dashboard/admin/blogs"),
          },
          // {
          //   label: "Recipes",
          //   icon: (
          //     <RecipesIcon
          //       className={`${pathname === "/dashboard/admin/recipes" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
          //     />
          //   ),
          //   href: "/dashboard/admin/recipes",
          //   isActive: pathname === "/dashboard/admin/recipes",
          // },
          {
            label: t("feedback"),
            icon: (
              <FeedbackIcon
                className={`${pathname === "/dashboard/admin/feedback" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/feedback",
            isActive: pathname === "/dashboard/admin/feedback",
          },
          {
            label: t("settings"),
            icon: (
              <SettingsIcon
                className={`${pathname === "/dashboard/admin/settings" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
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
                className={`${isSpecialistDashboardActive ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/specialist",
            isActive: isSpecialistDashboardActive,
          },
          {
            label: t("settings"),
            icon: (
              <SettingsIcon
                className={`${pathname === "/dashboard/specialist/settings" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
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
      animate={{
        width: collapsed ? 100 : 256,
      }}
      transition={{
        duration: 0.25,
        ease: easeInOut,
      }}
      className="
      hidden md:block
      fixed inset-s-0 bottom-0 top-0
      bg-[#FFFEFD]
      overflow-y-scroll hide-scrollbar
      border-e border-[#e1e7ef88]
    "
      >
      <div className={"flex items-center justify-center px-5 py-3 max-h-17"}>
        {collapsed ? (
          <div
            onClick={toggleCollapse}
            className="group relative size-12 cursor-pointer rounded-full hover:bg-gray-100"
          >
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={50}
              height={50}
              className="
              absolute inset-0 m-auto
              transition-all duration-200
              group-hover:opacity-0
              group-hover:scale-75
            "
            />
            <Collapse
              className="
              absolute place-self-center top-3.5 m-auto
              text-gray-500
              opacity-0 scale-75
              transition-all duration-200
              group-hover:opacity-100
              group-hover:scale-100
            "
            />
          </div>
        ) : (
          <div className="w-full flex justify-between items-center">
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
            <div
              onClick={toggleCollapse}
              className="size-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
            >
              <Collapse className="text-gray-500" />
            </div>
          </div>
        )}
      </div>

      <nav className="px-5 py-2.5">
        <ul className="flex flex-col gap-2.5">
          {sidebarList.map((item, index) => (
            <SideBarItem
              key={index}
              label={item.label}
              icon={item.icon}
              href={item.href}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </nav>
      </motion.aside>

      <nav
        aria-label="Dashboard navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E1E7EF] bg-[#FFFEFD] px-2 pb-[env(safe-area-inset-bottom)] pt-1.5 md:hidden"
      >
        <ul className="flex items-center justify-around gap-1 overflow-x-auto">
          {sidebarList.map((item) => (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-label={item.label}
                className={`group flex size-12 items-center justify-center rounded-xl transition-colors ${item.isActive ? "bg-[#FCEFE0]" : "bg-transparent"}`}
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
}: {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link href={href} className="w-full overflow-hidden">
      <div
        className={`relative group p-2 ps-5 ${isActive ? "bg-[#FCEFE0]" : "bg-white"} hover:bg-[#FCEFE0] transition-colors duration-200 flex flex-row items-center gap-3`}
      >
        <div
          className={`
            absolute
            -inset-s-2
            top-1/2
            -translate-y-1/2
            w-4
            h-10
            bg-[#E99532]
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

        <div className="overflow-hidden whitespace-nowrap">
          <p
            className={`
            type-control
            ${isActive ? "font-extrabold" : "font-medium"}
            group-hover:font-extrabold
          `}
          >
            {label}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SideBar;
