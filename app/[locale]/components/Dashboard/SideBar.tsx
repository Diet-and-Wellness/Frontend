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
import LogoutIcon from "../icons/LogoutIcon";
import { usePathname } from "@/i18n/navigation";
import Collapse from "../icons/Collapse";

const SideBar = ({
  collapsed,
  toggleCollapse,
}: {
  collapsed: boolean;
  toggleCollapse: () => void;
}) => {
  const pathname = usePathname();

  const sidebarList = [
    {
      label: "Dashboard",
      icon: (
        <DashboardIcon
          className={`${pathname === "/dashboard" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard",
    },
    {
      label: "Customers",
      icon: (
        <CustomersIcon
          className={`${pathname === "/dashboard/customers" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard/customers",
    },
    {
      label: "Specialists",
      icon: (
        <SpecialistsIcon
          className={`${pathname === "/dashboard/specialists" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard/specialists",
    },
    {
      label: "Content & Blogs",
      icon: (
        <BlogsIcon
          className={`${pathname === "/dashboard/blogs" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard/blogs",
    },
    {
      label: "Recipes",
      icon: (
        <RecipesIcon
          className={`${pathname === "/dashboard/recipes" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard/recipes",
    },
    {
      label: "Feedback",
      icon: (
        <FeedbackIcon
          className={`${pathname === "/dashboard/feedback" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard/feedback",
    },
  ];

  const generalList = [
    {
      label: "Settings",
      icon: (
        <SettingsIcon
          className={`${pathname === "/dashboard/settings" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard/settings",
    },
    {
      label: "Logout",
      icon: (
        <LogoutIcon
          className={`${pathname === "/dashboard/logout" ? "text-[#E99532]" : "text-black"} group-hover:text-[#E99532] transition-colors duration-150`}
        />
      ),
      href: "/dashboard/logout",
    },
  ];

  return (
    <motion.aside
      animate={{
        width: collapsed ? 100 : 256,
      }}
      transition={{
        duration: 0.25,
        ease: easeInOut,
      }}
      className="
      fixed left-0 bottom-0 top-12.5 md:top-14.5 lg:top-15.5
      bg-[#FFFEFD]
      px-5 pt-12 pb-2.5
      overflow-y-scroll hide-scrollbar
    "
    >
      <div
        onClick={toggleCollapse}
        className="absolute z-50 right-5 top-5 cursor-pointer"
      >
        <Collapse className="text-[gray]" />
      </div>

      <nav>
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
        <div className="mt-7.5">
          <p className="my-3 text-[16px] font-medium">General</p>
          <ul className="flex flex-col gap-2.5">
            {generalList.map((item, index) => (
              <SideBarItem
                key={index}
                label={item.label}
                icon={item.icon}
                href={item.href}
                isActive={pathname === item.href}
              />
            ))}
          </ul>
        </div>
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
