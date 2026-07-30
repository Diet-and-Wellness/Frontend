"use client";

import { SpecialistDTO } from "@/app/[locale]/api/types/profile.types";
import { useTranslations } from "next-intl";
import StateComp from "../../_components/StateComp";

const RecentSpecialist = ({ specialist }: { specialist: SpecialistDTO }) => {
  const t = useTranslations("dashboard");
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-3">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft">
          <span className="text-sm font-light text-accent">
            {`${specialist.firstName.at(0)}${specialist.lastName.at(0)}`}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="truncate text-base leading-tight font-medium text-content sm:text-lg">
            {`${specialist.firstName} ${specialist.lastName}`}
          </h3>

          <p className="truncate text-sm font-light text-content-muted">
            {specialist.specialistInfo?.specialization}
          </p>
          <p className="text-sm font-light text-content">
            {t("currentClients", { count: specialist.assignedCustomersCount })}
          </p>
        </div>
      </div>

      <StateComp state={specialist.specialistInfo.status} />
    </div>
  );
};

export default RecentSpecialist;
