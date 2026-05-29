"use client";

import { useState } from "react";
import StateComp from "../../components/Dashboard/StateComp";
import Dots from "../../components/icons/Dots";
import { AnimatePresence, motion } from "framer-motion";
import TrashIcon from "../../components/icons/TrashIcon";
import MenuIcon from "../../components/icons/MenuIcon";
import Switch from "../../components/Dashboard/Switch";
import PlusIcon from "../../components/icons/PlusIcon";

const SPECIALISTS = [
  {
    id: 1,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Pending",
  },
  {
    id: 2,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Active",
  },
  {
    id: 3,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Active",
  },
  {
    id: 4,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Inactive",
  },
  {
    id: 6,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Inactive",
  },
  {
    id: 7,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Inactive",
  },
  {
    id: 9,
    name: "Ahmed Khalil",
    specialty: "Nutrition",
    email: "amina@wazn.com",
    phone: "+20 100 000 0000",
    noOfClients: 1,
    status: "Inactive",
  },
];

const SpecialistsPage = () => {
  const [openedMenuId, setOpenedMenuId] = useState<number | null>(null);

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
        <button className="px-5 py-2 rounded-xl bg-[#E99532] cursor-pointer hover:bg-[#e28010] transition duration-150 flex gap-2">
          <PlusIcon className="text-white" />
          <p className="text-[#FFFEFD] text-[18px] font-medium">
            Add Specialist
          </p>
        </button>
      </div>

      {/* Table */}
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
            {SPECIALISTS.map((specialist) => (
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
    </section>
  );
};

const SpecialistRow = ({
  specialist,
  openedMenuId,
  setOpenedMenuId,
}: {
  specialist: (typeof SPECIALISTS)[0];
  openedMenuId: number | null;
  setOpenedMenuId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const isOpened = openedMenuId === specialist.id;

  const toggleOpenedMenu = () => {
    setOpenedMenuId((prev) => (prev === specialist.id ? null : specialist.id));
  };

  return (
    <tr className="text-base font-light text-[#4F4F4F] transition-colors">
      <TableCell>
        <span className="text-black">{specialist.name}</span>
      </TableCell>

      <TableCell>{specialist.specialty}</TableCell>

      <TableCell>{specialist.email}</TableCell>

      <TableCell>
        <p className="text-center">{specialist.phone}</p>
      </TableCell>

      <TableCell>
        <p className="text-center">{specialist.noOfClients}</p>
      </TableCell>

      <TableCell>
        <StateComp state={specialist.status} />
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
