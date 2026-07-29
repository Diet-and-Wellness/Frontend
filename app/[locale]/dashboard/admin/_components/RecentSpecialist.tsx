"use client";

import { SpecialistDTO } from "@/app/[locale]/api/types/profile.types";
import { useTranslations } from "next-intl";
import StateComp from "../../_components/StateComp";

const RecentSpecialist = ({ specialist }: { specialist: SpecialistDTO }) => {
  const t = useTranslations("dashboard");
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E1E7EF] bg-[#FFFEFD] p-3">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FCEFE0]">
          <span className="type-label font-light text-[#E99532]">
            {`${specialist.firstName.at(0)}${specialist.lastName.at(0)}`}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="type-card-title truncate font-medium text-black">
            {`${specialist.firstName} ${specialist.lastName}`}
          </h3>

          <p className="type-label truncate font-light text-[#4F4F4F]">
            {specialist.specialistInfo?.specialization}
          </p>
          <p className="type-label font-light text-black">
            {t("currentClients", { count: specialist.assignedCustomersCount })}
          </p>
        </div>
      </div>

      <StateComp state={specialist.specialistInfo.status} />
    </div>
  );
};

export default RecentSpecialist;
