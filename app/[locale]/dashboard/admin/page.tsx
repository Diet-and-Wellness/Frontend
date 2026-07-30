"use client";

import Link from "next/link";
import StatCard from "./_components/StatCard";
import SpecialistIcon from "../../components/icons/SpecialistIcon";
import { profileApi } from "../../api/endpoints/profile.api";
import { SpecialistDTO, Customer } from "../../api/types/profile.types";
import { useQuery } from "@tanstack/react-query";
import RecentSpecialist from "./_components/RecentSpecialist";
import RecentCustomer from "./_components/RecentCustomer";
import CustomersIcon from "../../components/icons/CustomersIcon";
import SpecialistsIcon from "../../components/icons/SpecialistsIcon";
import BlogsIcon from "../../components/icons/BlogsIcon";
import StatArrow from "../../components/icons/StatArrow";
import { useMe } from "../../hooks/useMe";
import { motion } from "framer-motion";
import EmptyComp from "../../components/Public/Empty";
import { useTranslations } from "next-intl";
import { Skeleton } from "../../components/Public/Skeletons";

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
      staggerChildren: 0.15,
      delayChildren: 0.08,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
} as const;

const AdminDashboardIndex = () => {
  const t = useTranslations("dashboard");
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

  const { data: dashboardStat, isLoading: dashboardStatLoading } = useQuery({
    queryKey: ["dashboardStat"],
    queryFn: getDashboardStat,
  });

  const stats = [
    {
      statType: t("totalClientsStat"),
      statNumber: dashboardStat?.clients?.total ?? 0,
      progress: calcProgress(
        dashboardStat?.clients?.thisMonth,
        dashboardStat?.clients?.total,
      ),
      icon: <CustomersIcon className="text-accent" strokeWidth={"1.67"} />,
    },
    {
      statType: t("activeSpecialists"),
      statNumber: dashboardStat?.specialists?.active ?? 0,
      progress: calcProgress(
        dashboardStat?.specialists?.activeThisMonth,
        dashboardStat?.specialists?.active,
      ),
      icon: <SpecialistsIcon className="text-accent" strokeWidth={"1.67"} />,
    },
    {
      statType: t("publishedArticles"),
      statNumber: dashboardStat?.articles?.active ?? 0,
      progress: calcProgress(
        dashboardStat?.articles?.activeThisMonth,
        dashboardStat?.articles?.active,
      ),
      icon: <BlogsIcon className="text-accent" strokeWidth={"1.67"} />,
    },
    {
      statType: t("activeSubscriptions"),
      statNumber: dashboardStat?.subscriptions?.active ?? 0,
      progress: calcProgress(
        dashboardStat?.subscriptions?.activeThisMonth,
        dashboardStat?.subscriptions?.active,
      ),
      icon: <StatArrow className="text-accent" strokeWidth={"1.67"} />,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full"
    >
      <motion.div variants={item} className="mb-6 sm:mb-7.5">
        <h2 className="type-page-title mb-3 font-bold text-content sm:mb-4">{t("dashboard")}</h2>
        <p className="type-body-lg font-light text-content-muted">
          {t("welcomeBack", { name: me.firstName ?? "" })}
        </p>
      </motion.div>

      <motion.div
        variants={container}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
      >
        {dashboardStatLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <DashboardStatCardSkeleton key={index} />
            ))
          : stats.map((stat) => (
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
        className="mt-6 grid grid-cols-1 gap-6 sm:mt-7.5 sm:gap-7.5 xl:grid-cols-2 xl:gap-15"
      >
        {recentSpecialistsLoading ? (
          <RecentUsersSkeleton usersListType="specialists" />
        ) : (
          <motion.div variants={item}>
            <RecentUsersList
              usersListType="specialists"
              usersList={recentSpecialists ?? []}
            />
          </motion.div>
        )}

        {recentCustomersLoading ? (
          <RecentUsersSkeleton usersListType="clients" />
        ) : (
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

const DashboardStatCardSkeleton = () => (
  <div
    aria-busy="true"
    className="flex flex-col justify-between gap-7.5 rounded-2xl border border-line bg-surface-raised p-4 md:p-5"
  >
    <div className="flex items-start justify-between">
      <Skeleton className="size-12 rounded-2xl" />
      <div className="flex items-center gap-1.5 pt-1.5">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="size-5 rounded-full!" />
      </div>
    </div>

    <div className="flex flex-col gap-1">
      <Skeleton className="h-9 w-18" />
      <Skeleton className="h-4 w-28" />
    </div>
  </div>
);

const RecentUsersSkeleton = ({
  usersListType,
}: {
  usersListType: RecentUsersListProps["usersListType"];
}) => (
  <div
    aria-busy="true"
    className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="size-7 rounded-full!" />
        <Skeleton className="h-6 w-42" />
      </div>
      <Skeleton className="h-4 w-14" />
    </div>

    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex items-start justify-between rounded-2xl border border-line bg-surface p-3"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="size-10 rounded-full!" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-44 max-w-[35vw]" />
              {usersListType === "specialists" && (
                <Skeleton className="h-4 w-26" />
              )}
            </div>
          </div>
          {usersListType === "specialists" && (
            <Skeleton className="mt-1 h-6 w-16 rounded-full" />
          )}
        </div>
      ))}
    </div>
  </div>
);

const RecentUsersList = ({
  usersListType,
  usersList,
}: RecentUsersListProps) => {
  const t = useTranslations("dashboard");
  return (
    <div className="flex w-full flex-col gap-5 rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          {usersListType === "specialists" ? (
            <SpecialistIcon className="text-accent" strokeWidth="1.67" />
          ) : (
            <CustomersIcon className="text-accent" strokeWidth="1.67" />
          )}
          <p className="text-lg leading-tight font-extrabold text-content sm:text-xl">
            {usersListType === "specialists"
              ? t("recentSpecialists")
              : t("recentCustomers")}
          </p>
        </div>

        <Link
          href={
            usersListType === "specialists"
              ? "admin/specialists"
              : "admin/customers"
          }
        >
          <span className="text-sm font-medium text-accent underline sm:text-[0.9375rem]">
            {t("viewAll")}
          </span>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-3"
      >
        {usersListType === "specialists" ? (
          usersList.length > 0 ? (
            usersList.map((user) => (
              <motion.div key={user.id} variants={item}>
                <RecentSpecialist specialist={user} />
              </motion.div>
            ))
          ) : (
            <EmptyComp
              title={t("noSpecialistsYet")}
              description={t("noSpecialistsDescription")}
            />
          )
        ) : usersList.length > 0 ? (
          usersList.map((user) => (
            <motion.div key={user.id} variants={item}>
              <RecentCustomer customer={user} />
            </motion.div>
          ))
        ) : (
          <EmptyComp
            title={t("noClientsYet")}
            description={t("noClientsDescription")}
          />
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboardIndex;
