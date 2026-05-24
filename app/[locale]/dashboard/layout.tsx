"use client";

import DashboardHeader from "../components/Dashboard/Header";
import SideBar from "../components/Dashboard/SideBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#F9F9F9]">
      <DashboardHeader />
      <div className="mt-12.5 md:mt-14.5 lg:mt-15.5 ml-64 p-5 md:p-7.5 flex flex-1">
        {children}
      </div>
      <SideBar />
    </div>
  );
};

export default DashboardLayout;
