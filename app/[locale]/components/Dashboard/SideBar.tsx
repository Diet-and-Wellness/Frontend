"use client";

import Link from "next/link";
import { easeInOut, motion } from "framer-motion";

import DashboardIcon from "../icons/DashboardIcon";
import CustomersIcon from "../icons/CustomersIcon";
import SpecialistsIcon from "../icons/SpecialistsIcon";
import BlogsIcon from "../icons/BlogsIcon";
import RecipesIcon from "../icons/RecipesIcon";
import FeedbackIcon from "../icons/FeedbackIcon";
import SettingsIcon from "../icons/SettingsIcon";
import { usePathname } from "@/i18n/navigation";
import Collapse from "../icons/Collapse";
import Image from "next/image";

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

  const sidebarList =
    role === "admin"
      ? [
          {
            label: "Dashboard",
            icon: (
              <DashboardIcon
                className={`${pathname === "/dashboard/admin" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin",
          },
          {
            label: "Specialists",
            icon: (
              <SpecialistsIcon
                className={`${pathname === "/dashboard/admin/specialists" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/specialists",
          },
          {
            label: "Customers",
            icon: (
              <CustomersIcon
                className={`${pathname === "/dashboard/admin/customers" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/customers",
          },
          {
            label: "Content & Blogs",
            icon: (
              <BlogsIcon
                className={`${pathname === "/dashboard/admin/blogs" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/blogs",
          },
          {
            label: "Recipes",
            icon: (
              <RecipesIcon
                className={`${pathname === "/dashboard/admin/recipes" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/recipes",
          },
          {
            label: "Feedback",
            icon: (
              <FeedbackIcon
                className={`${pathname === "/dashboard/admin/feedback" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/feedback",
          },
          {
            label: "Settings",
            icon: (
              <SettingsIcon
                className={`${pathname === "/dashboard/admin/settings" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/admin/settings",
          },
        ]
      : [
          {
            label: "Dashboard",
            icon: (
              <DashboardIcon
                className={`${pathname === "/dashboard/specialist" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/specialist",
          },
          {
            label: "Profile",
            icon: (
              <SettingsIcon
                className={`${pathname === "/dashboard/specialist/profile" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
              />
            ),
            href: "/dashboard/specialist/profile",
          },
        ];

  return (
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
      fixed left-0 bottom-0 top-0
      bg-[#FFFEFD]
      overflow-y-scroll hide-scrollbar
      border-r border-[#e1e7ef88]
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
              isActive={pathname === item.href}
            />
          ))}
        </ul>
      </nav>
    </motion.aside>
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
        className={`relative group p-2 pl-5 ${isActive ? "bg-[#FCEFE0]" : "bg-white"} hover:bg-[#FCEFE0] transition-colors duration-200 flex flex-row items-center gap-3`}
      >
        <div
          className={`
            absolute
            -left-2
            top-1/2
            -translate-y-1/2
            w-4
            h-10
            bg-[#E99532]
            rounded-full

            ${isActive ? "scale-y-100 opacity-100 translate-x-0" : "scale-y-0 opacity-0 -translate-x-2"}

            group-hover:scale-y-100
            group-hover:opacity-100
            group-hover:translate-x-0

            transition-all
            duration-250
            origin-center
          `}
        />

        <div className="min-w-6">{icon}</div>

        <div className="overflow-hidden whitespace-nowrap">
          <p
            className={`
            text-[16px]
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
