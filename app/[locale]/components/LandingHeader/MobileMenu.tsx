"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { getCleanPathname } from "../../utils/getCleanPathname";

type tabType = { label: string; href: string };

const MobileMenu = ({ tabs }: { tabs: tabType[] }) => {
  const pathname = getCleanPathname(usePathname());

  return (
    <motion.div
      initial={{ x: "100%" }} 
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="-z-10 pb-20 min-h-screen w-full bg-white absolute inset-0 mt-15 flex flex-col justify-evenly items-center"
    >
      <ul className="flex flex-col items-center self-center gap-5">
        {tabs.map((tab) => (
          <Tab
            key={tab.href}
            label={tab.label}
            href={tab.href}
            isActive={pathname === tab.href}
          />
        ))}
      </ul>
      <Link
        href={"/signin"}
        className="
            group border-2 border-[#E88B60] px-15 py-3 cursor-pointer
            lg:flex self-center rounded-full
            transition-all duration-300 active:scale-95"
      >
        <span className="text-xl font-semibold text-[#E88B60] transition-colors duration-300">
          Get Started
        </span>
      </Link>
    </motion.div>
  );
};

const Tab = ({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link href={href} className="rounded-full">
      <li
        className={`rounded-full cursor-pointer px-20 py-3 text-[20px] font-semibold text-[#3a6b26]
           transition-all duration-300 ease-in-out
           hover:bg-[#3a6b26] hover:text-white
           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a6b26] focus-visible:ring-offset-2 ${isActive ? "bg-[#3a6b26] text-white shadow-sm" : ""}`}
      >
        {label}
      </li>
    </Link>
  );
};

export default MobileMenu;
