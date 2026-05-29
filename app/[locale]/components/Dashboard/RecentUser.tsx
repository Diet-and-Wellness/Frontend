"use client";

import StateComp from "./StateComp";

const RecentUser = ({
  userType,
  userData,
}: {
  userType: string;
  userData: {
    userName: string;
    userNameAppr: string;
    specialty?: string;
    clientsCount?: number;
    userEmail?: string;
    userState?: string;
  };
}) => {
  return (
    <div className="p-3 border border-[#E1E7EF] bg-[#FFFEFD] rounded-2xl flex flex-row justify-between items-center">
      <div className="flex flex-row gap-4 items-start">
        <div className="size-10 rounded-full bg-[#FCEFE0] flex justify-center items-center">
          <span className="text-[#E99532] text-[16px] font-light">
            {userData.userNameAppr}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-black text-[20px] font-medium">
            {userData.userName}
          </h3>

          <p className="text-[#4F4F4F] text-[16px] font-light">
            {userType === "specialist"
              ? userData.specialty
              : userData.userEmail}
          </p>

          {userType === "specialist" && (
            <p className="text-black text-[16px] font-light">
              Current Clients: {userData.clientsCount}
            </p>
          )}
        </div>
      </div>

      {userType === "specialist" && userData.userState && (
        <StateComp state={userData.userState} />
      )}
    </div>
  );
};

export default RecentUser;
