"use client";

import Link from "next/link";
import StatCard from "../../components/Dashboard/StatCard";
import SpecialistIcon from "../../components/icons/SpecialistIcon";
import { profileApi } from "../../api/endpoints/profile.api";
import { SpecialistDTO, UserDTO } from "../../api/types/profile.types";
import { useQuery } from "@tanstack/react-query";
import RecentSpecialist from "../../components/Dashboard/RecentSpecialist";
import RecentCustomer from "../../components/Dashboard/RecentCustomer";
import CustomersIcon from "../../components/icons/CustomersIcon";
import SpecialistsIcon from "../../components/icons/SpecialistsIcon";
import BlogsIcon from "../../components/icons/BlogsIcon";
import StatArrow from "../../components/icons/StatArrow";

type RecentUsersListProps =
  | {
      usersListType: "specialists";
      usersList: SpecialistDTO[];
    }
  | {
      usersListType: "clients";
      usersList: UserDTO[];
    };

const AdminDashboardIndex = () => {
  const getRecentCustomers = async (): Promise<UserDTO[]> => {
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

  return (
    <section className="w-full">
      <div className="mb-7.5">
        <h2 className="text-black text-3xl mb-2 font-bold">Dashboard</h2>
        <p className="text-[#4F4F4F] text-[16px] md:text-[18px] lg:text-[20px] font-light">
          Welcome back, Admin. Here&apos;s an overview of Diet and Wellness.
        </p>
      </div>

      <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <StatCard
          arrowIcon={"/icons/green-up-arrow.svg"}
          statIcon={
            <CustomersIcon className="text-[#E99532]" strokeWidth={"1.67"} />
          }
          progress={`${dashboardStat?.clients?.thisMonth ?? 0}%`}
          statNumber={dashboardStat?.clients?.total ?? 0}
          statType={"Total Clients"}
        />
        <StatCard
          arrowIcon={"/icons/green-up-arrow.svg"}
          statIcon={
            <SpecialistsIcon className="text-[#E99532]" strokeWidth={"1.67"} />
          }
          progress={`${dashboardStat?.specialists?.thisMonth ?? 0}%`}
          statNumber={dashboardStat?.specialists?.active ?? 0}
          statType={"Active Specialist"}
        />
        <StatCard
          arrowIcon={"/icons/green-up-arrow.svg"}
          statIcon={
            <BlogsIcon className="text-[#E99532]" strokeWidth={"1.67"} />
          }
          progress={`${dashboardStat?.articles?.thisMonth ?? 0}%`}
          statNumber={dashboardStat?.articles?.total ?? 0}
          statType={"Published Articles"}
        />
        <StatCard
          arrowIcon={"/icons/green-up-arrow.svg"}
          statIcon={
            <StatArrow className="text-[#E99532]" strokeWidth={"1.67"} />
          }
          progress={`${dashboardStat?.subscriptions.thisMonth ?? 0}%`}
          statNumber={dashboardStat?.subscriptions?.active ?? 0}
          statType={"Active Subscriptions "}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7.5 xl:gap-15 mt-7.5">
        {recentSpecialistsLoading || (
          <RecentUsersList
            usersListType="specialists"
            usersList={recentSpecialists ?? []}
          />
        )}
        {recentCustomersLoading || (
          <RecentUsersList
            usersListType="clients"
            usersList={recentCustomers ?? []}
          />
        )}
      </div>
    </section>
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
      {usersListType === "specialists"
        ? usersList.map((user) => (
            <RecentSpecialist key={user.id} specialist={user} />
          ))
        : usersList.map((user) => (
            <RecentCustomer key={user.id} customer={user} />
          ))}
    </div>
  );
};

export default AdminDashboardIndex;
