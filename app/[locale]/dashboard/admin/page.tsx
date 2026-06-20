"use client";

import Link from "next/link";
import StatCard from "../../components/Dashboard/StatCard";
import SpecialistIcon from "../../components/icons/SpecialistIcon";
import { profileApi } from "../../api/endpoints/profile.api";
import { SpecialistDTO, Customer } from "../../api/types/profile.types";
import { useQuery } from "@tanstack/react-query";
import RecentSpecialist from "../../components/Dashboard/RecentSpecialist";
import RecentCustomer from "../../components/Dashboard/RecentCustomer";
import CustomersIcon from "../../components/icons/CustomersIcon";
import SpecialistsIcon from "../../components/icons/SpecialistsIcon";
import BlogsIcon from "../../components/icons/BlogsIcon";
import StatArrow from "../../components/icons/StatArrow";
import { useMe } from "../../hooks/useMe";
import { motion } from "framer-motion";

type RecentUsersListProps =
  | {
      usersListType: "specialists";
      usersList: SpecialistDTO[];
    }
  | {
      usersListType: "clients";
      usersList: Customer[];
    };

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
} as const;

const AdminDashboardIndex = () => {
  const data = useMe();
  const me = data?.data ?? {};

  const calcProgress = (part?: number, total?: number) => {
    if (!part || !total) return "0%";
    return `${Math.floor((part / total) * 100)}%`;
  };

  const getRecentCustomers = async (): Promise<Customer[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "customer",
      page: 1,
      limit: 5,
    });

    return data?.data ?? [];
  };

  const { data: recentCustomers, isLoading: recentCustomersLoading } = useQuery(
    {
      queryKey: ["recentCustomers"],
      queryFn: getRecentCustomers,
    },
  );

  const getRecentSpecialists = async (): Promise<SpecialistDTO[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "specialist",
      page: 1,
      limit: 5,
    });

    return data?.data ?? [];
  };

  const { data: recentSpecialists, isLoading: recentSpecialistsLoading } =
    useQuery({
      queryKey: ["recentSpecialists"],
      queryFn: getRecentSpecialists,
    });

  const getDashboardStat = async () => {
    const { data } = await profileApi.getAdminDashboard();
    return data ?? {};
  };

  const { data: dashboardStat } = useQuery({
    queryKey: ["dashboardStat"],
    queryFn: getDashboardStat,
  });

  const stats = [
    {
      statType: "Total Clients",
      statNumber: dashboardStat?.clients?.total ?? 0,
      progress: calcProgress(
        dashboardStat?.clients?.thisMonth,
        dashboardStat?.clients?.total,
      ),
      icon: <CustomersIcon className="text-[#E99532]" strokeWidth={"1.67"} />,
    },
    {
      statType: "Active Specialist",
      statNumber: dashboardStat?.specialists?.active ?? 0,
      progress: calcProgress(
        dashboardStat?.specialists?.activeThisMonth,
        dashboardStat?.specialists?.active,
      ),
      icon: <SpecialistsIcon className="text-[#E99532]" strokeWidth={"1.67"} />,
    },
    {
      statType: "Published Articles",
      statNumber: dashboardStat?.articles?.active ?? 0,
      progress: calcProgress(
        dashboardStat?.articles?.activeThisMonth,
        dashboardStat?.articles?.active,
      ),
      icon: <BlogsIcon className="text-[#E99532]" strokeWidth={"1.67"} />,
    },
    {
      statType: "Active Subscriptions",
      statNumber: dashboardStat?.subscriptions?.active ?? 0,
      progress: calcProgress(
        dashboardStat?.subscriptions?.activeThisMonth,
        dashboardStat?.subscriptions?.active,
      ),
      icon: <StatArrow className="text-[#E99532]" strokeWidth={"1.67"} />,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full"
    >
      <motion.div variants={item} className="mb-7.5">
        <h2 className="text-black text-3xl mb-2 font-bold">Dashboard</h2>
        <p className="text-[#4F4F4F] text-[16px] md:text-[18px] lg:text-[20px] font-light">
          Welcome back, {me.firstName}. Here&apos;s an overview of Diet and
          Wellness.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {stats.map((stat) => (
          <motion.div key={stat.statType} variants={item}>
            <StatCard
              arrowIcon="/icons/green-up-arrow.svg"
              statIcon={stat.icon}
              progress={stat.progress}
              statNumber={stat.statNumber}
              statType={stat.statType}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 xl:grid-cols-2 gap-7.5 xl:gap-15 mt-7.5"
      >
        {recentSpecialistsLoading || (
          <motion.div variants={item}>
            <RecentUsersList
              usersListType="specialists"
              usersList={recentSpecialists ?? []}
            />
          </motion.div>
        )}

        {recentCustomersLoading || (
          <motion.div variants={item}>
            <RecentUsersList
              usersListType="clients"
              usersList={recentCustomers ?? []}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};

const RecentUsersList = ({
  usersListType,
  usersList,
}: RecentUsersListProps) => {
  return (
    <div className="flex flex-col gap-5 p-5 bg-[#FFFEFD] rounded-2xl border border-[#E1E7EF] self-start">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          {usersListType === "specialists" ? (
            <SpecialistIcon className="text-[#E99532]" strokeWidth="1.67" />
          ) : (
            <CustomersIcon className="text-[#E99532]" strokeWidth="1.67" />
          )}
          <p className="text-black text-[20px] font-extrabold">
            {usersListType === "specialists"
              ? "Recent Specialists"
              : "Recent Customers"}
          </p>
        </div>

        <Link
          href={
            usersListType === "specialists"
              ? "admin/specialists"
              : "admin/customers"
          }
        >
          <span className="text-[#E99532] text-[16px] font-medium underline">
            View All
          </span>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {usersListType === "specialists"
          ? usersList.map((user) => (
              <motion.div key={user.id} variants={item}>
                <RecentSpecialist specialist={user} />
              </motion.div>
            ))
          : usersList.map((user) => (
              <motion.div key={user.id} variants={item}>
                <RecentCustomer customer={user} />
              </motion.div>
            ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboardIndex;
