"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type tabType = { label: string, href: string };

const NavList = ({ tabs }: { tabs: tabType[]  }) => {
  const pathname = usePathname();

  return (
    <div
      className={`hidden xl:flex-row xl:flex xl:justify-between xl:items-center gap-5`}
    >
      <ul
        className="
        xl:flex items-center self-center gap-1 
        rounded-full border-2 border-[#3a6b26] p-1"
      >
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
        group border-2 border-[#3a6b26] px-8 py-2 cursor-pointer
        hover:bg-[#3a6b26] lg:flex self-center rounded-full
        transition-all duration-300 active:scale-95"
      >
        <span className="text-xl font-semibold text-[#3a6b26] group-hover:text-white transition-colors duration-300">
          Get Started
        </span>
      </Link>
    </div>
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
        className={`rounded-full cursor-pointer px-7 py-2 text-[20px] font-semibold text-[#3a6b26]
           transition-all duration-300 ease-in-out
           hover:bg-[#3a6b26] hover:text-white
           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a6b26] focus-visible:ring-offset-2 ${isActive ? "bg-[#3a6b26] text-white shadow-sm" : ""}`}
      >
        {label}
      </li>
    </Link>
  );
};

export default NavList;
