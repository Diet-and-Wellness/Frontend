"use client";

import RecentUser from "../components/Dashboard/RecentUser";
import StatCard from "../components/Dashboard/StatCard";
import SpecialistIcon from "../components/icons/SpecialistIcon";

const DashboardIndex = () => {
  const specialistsList = [
    {
      userName: "Dr. Sarah Mansour",
      userNameAppr: "SM",
      specialty: "Clinical Nutritionist",
      clientsCount: 14,
      userState: "active",
    },
    {
      userName: "Coach Ahmed Hassan",
      userNameAppr: "AH",
      specialty: "Strength & Conditioning",
      clientsCount: 10,
      userState: "inactive",
    },
    {
      userName: "Dr. Laila Soliman",
      userNameAppr: "LS",
      specialty: "Behavioral Psychologist",
      clientsCount: 0,
      userState: "pending",
    },
    {
      userName: "Dr. Mahmoud Fawzy",
      userNameAppr: "MF",
      specialty: "Physical Therapist",
      clientsCount: 25,
      userState: "full",
    },
  ];

  const clientsList = [
    {
      userName: "Sarah Al-Rashid",
      userNameAppr: "SA",
      userEmail: "sarah@example.com",
    },
    {
      userName: "Omar Hassan",
      userNameAppr: "OH",
      userEmail: "omar@example.com",
    },
    {
      userName: "Layla Mohammed",
      userNameAppr: "LM",
      userEmail: "layla@example.com",
    },
    {
      userName: "Ahmed Khalil",
      userNameAppr: "AK",
      userEmail: "ahmed@example.com",
    },
  ];

  return (
    <section className="w-full">
      <div className="mb-7.5">
        <h2 className="text-black text-[22px] md:text-[26px] lg:text-[30px] font-bold mb-2 md:mb-3">
          Dashboard
        </h2>
        <p className="text-[#4F4F4F] text-[16px] md:text-[18px] lg:text-[20px] font-light">
          Welcome back, Admin. Here's an overview of Diet and Wellness.
        </p>
      </div>

      <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((item) => {
          return (
            <div key={item}>
              <StatCard />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7.5 xl:gap-15 mt-7.5">
        <RecentUsersList
          usersListType="specialist"
          usersList={specialistsList}
        />
        <RecentUsersList usersListType="clients" usersList={clientsList} />
      </div>
    </section>
  );
};

const RecentUsersList = ({
  usersListType,
  usersList,
}: {
  usersListType: string;
  usersList: {
    userName: string;
    userNameAppr: string;
    specialty?: string;
    clientsCount?: number;
    userEmail?: string;
    userState?: string;
  }[];
}) => {
  return (
    <div className="flex flex-col gap-5 p-5 bg-[#FFFEFD] rounded-2xl border border-[#E1E7EF] self-start">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 items-center">
          <SpecialistIcon className="text-[#E99532]" />
          <p className="text-black text-[20px] font-extrabold">
            Recent Specialists
          </p>
        </div>
        <a href="">
          <span className="text-[#E99532] text-[16px] font-medium underline">
            View All
          </span>
        </a>
      </div>
      {usersList.map((user, index) => (
        <RecentUser key={index} userData={user} userType={usersListType} />
      ))}
    </div>
  );
};

export default DashboardIndex;
