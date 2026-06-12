"use client";

import { useState } from "react";
import StateComp from "@/app/[locale]/components/Dashboard/StateComp";
import Dots from "@/app/[locale]/components/icons/Dots";
import { AnimatePresence, motion } from "framer-motion";
import TrashIcon from "@/app/[locale]/components/icons/TrashIcon";
import MenuIcon from "@/app/[locale]/components/icons/MenuIcon";
import Switch from "@/app/[locale]/components/Dashboard/Switch";
import PlusIcon from "@/app/[locale]/components/icons/PlusIcon";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import { SpecialistDTO } from "@/app/[locale]/api/types/profile.types";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";

const SpecialistsPage = () => {
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

  const getSpecialists = async (): Promise<SpecialistDTO[]> => {
    const { data } = await profileApi.searchProfiles({
      role: "specialist",
      limit: 10,
      page: 1,
    });
    return data?.data ?? [];
  };

  const { data: specialists, isLoading } = useQuery({
    queryKey: ["specialists"],
    queryFn: getSpecialists,
  });

  const createNewSpecialist = async () => {
    // await profileApi.createSpecialist({
    //   firstName: "James",
    //   lastName: "Thompson",
    //   email: "james.thompson@example.com",
    //   phone: "01067890123",
    //   password: "StrongPassword123!",
    //   specialization: "Clinical Dietetics",
    //   experienceYears: 10,
    // });
    // await profileApi.activateSpecialist("6a07754af243e2830490e704");
  };

  return (
    <section className="flex w-full flex-col gap-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Specialists</h2>
          <p className="text-xl font-light text-[#4F4F4F]">
            Manage your team of wellness specialists.
          </p>
        </div>
        <button
          onClick={createNewSpecialist}
          className="px-5 py-2.5 rounded-full bg-[#E99532] cursor-pointer hover:bg-[#e28010] transition duration-150 flex"
        >
          <PlusIcon className="text-white" />
          <p className="text-[#FFFEFD] text-[16px] font-medium">
            Add Specialist
          </p>
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="place-self-center my-25">
          <Spinner spinnerSize={50} borderColor="#4D8E32" />
        </div>
      ) : (
        <div className="min-w-full overflow-x-auto border border-[#E1E7EF] rounded-2xl bg-[#FFFEFD]">
          <table className="min-w-full divide-y divide-[#E1E7EF]">
            <thead className="bg-[#FCFCFC]">
              <tr>
                <TableHeaderCell>Name</TableHeaderCell>

                <TableHeaderCell>Specialty</TableHeaderCell>

                <TableHeaderCell>Email</TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">Phone</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">No. of Clients</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">Status</p>
                </TableHeaderCell>

                <TableHeaderCell>
                  <p className="text-center">Actions</p>
                </TableHeaderCell>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E1E7EF] bg-[#FFFEFD]">
              {specialists?.map((specialist) => (
                <SpecialistRow
                  key={specialist.id}
                  specialist={specialist}
                  openedMenuId={openedMenuId}
                  setOpenedMenuId={setOpenedMenuId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const SpecialistRow = ({
  specialist,
  openedMenuId,
  setOpenedMenuId,
}: {
  specialist: SpecialistDTO;
  openedMenuId: string | null;
  setOpenedMenuId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const isOpened = openedMenuId === specialist.id;

  const toggleOpenedMenu = () => {
    setOpenedMenuId((prev) => (prev === specialist.id ? null : specialist.id));
  };

  return (
    <tr className="text-base font-light text-[#4F4F4F] transition-colors">
      <TableCell>
        <span className="text-black">{`${specialist.firstName} ${specialist.lastName}`}</span>
      </TableCell>

      <TableCell>{specialist.specialistInfo.specialization}</TableCell>

      <TableCell>{specialist.email}</TableCell>

      <TableCell>
        <p className="text-center">{specialist.phone}</p>
      </TableCell>

      <TableCell>
        <p className="text-center">{specialist.assignedCustomersCount}</p>
      </TableCell>

      <TableCell>
        <StateComp state={specialist.specialistInfo.status} />
      </TableCell>

      <TableCell className="relative">
        <button
          onClick={toggleOpenedMenu}
          className="flex size-10 items-center justify-center place-self-center cursor-pointer hover:bg-gray-100 rounded-full"
        >
          <Dots className="text-black" />
        </button>
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="border border-[#E1E7EF] rounded-2xl bg-white absolute shadow-[0_2px_10px_0px_#00000026] z-20 top-15 right-8"
            >
              <div className="p-3.5 flex flex-col gap-3.5">
                <button className="w-full flex items-center gap-2.5 cursor-pointer">
                  <MenuIcon className="text-black" />
                  <p className="text-black text-[16px] font-light">
                    View client list
                  </p>
                </button>
                <button className="w-full flex items-center gap-2.5 cursor-pointer">
                  <TrashIcon className="text-[#DC2626]" />
                  <p className="text-[#DC2626] text-[16px] font-light">
                    Delete Specialist
                  </p>
                </button>
              </div>
              <div className="flex items-center gap-3 border-t border-t-[#E1E7EF] p-3.5">
                <Switch />
                <span>Deactivate Specialist</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </TableCell>
    </tr>
  );
};

const TableHeaderCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <th
      className={`whitespace-nowrap px-6 py-4 text-start text-[#4F4F4F] font-light ${className}`}
    >
      {children}
    </th>
  );
};

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <td
      className={`whitespace-nowrap px-6 py-4 text-start text-[#4F4F4F] font-light ${className}`}
    >
      {children}
    </td>
  );
};

export default SpecialistsPage;
