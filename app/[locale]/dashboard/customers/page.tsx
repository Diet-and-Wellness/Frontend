import StateComp from "../../components/Dashboard/StateComp";
import SearchIcon from "../../components/icons/SearchIcon";
import ViewLinkIcon from "../../components/icons/ViewLinkIcon";

const TABLE_HEADERS = [
  "Name",
  "Email",
  "Phone",
  "Weight Before",
  "Height (cm)",
  "Subscription",
  "Link To Answers",
  "Assign To Specialist",
];

const CUSTOMERS = [
  {
    id: 1,
    name: "Ahmed Khalil",
    initials: "AK",
    email: "ahmed@gmail.com",
    phone: "+20 100 000 0000",
    weight: "92 KG",
    height: "183 CM",
    subscription: "Trial",
  },
  {
    id: 2,
    name: "Hassan Mahmoud",
    initials: "HM",
    email: "hassan@gmail.com",
    phone: "+20 100 000 0000",
    weight: "92 KG",
    height: "183 CM",
    subscription: "Basic",
  },
  {
    id: 3,
    name: "Hassan Mahmoud",
    initials: "HM",
    email: "hassan@gmail.com",
    phone: "+20 100 000 0000",
    weight: "92 KG",
    height: "183 CM",
    subscription: "Premium",
  },
  {
    id: 4,
    name: "Hassan Mahmoud",
    initials: "HM",
    email: "hassan@gmail.com",
    phone: "+20 100 000 0000",
    weight: "92 KG",
    height: "183 CM",
    subscription: "Trial",
  },
  {
    id: 5,
    name: "Hassan Mahmoud",
    initials: "HM",
    email: "hassan@gmail.com",
    phone: "+20 100 000 0000",
    weight: "92 KG",
    height: "183 CM",
    subscription: "Basic",
  },
];

const CustomersPage = () => {
  return (
    <section className="flex w-full flex-col gap-5">
      {/* Header */}
      <div>
        <h2 className="mb-2 text-3xl font-bold">Customers</h2>
        <p className="text-xl font-light text-[#4F4F4F]">
          Manage and view all client profiles.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-5">
        <SearchInput />
        <FilterButton label="All Statuses" />
        <FilterButton label="All Plans" />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-2xl border border-[#E1E7EF] bg-white">
        <table className="min-w-full divide-y divide-[#E1E7EF]">
          <thead className="bg-[#FCFCFC]">
            <tr>
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap px-6 py-4 text-left text-base font-light text-[#4F4F4F]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E1E7EF] bg-[#FFFEFD]">
            {CUSTOMERS.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const SearchInput = () => {
  return (
    <div className="flex w-95 items-center gap-3 rounded-xl bg-[#FFFEFD] px-4 py-2.5 border border-[#E1E7EF]">
      <SearchIcon className="text-[#4F4F4F]" />
      <input
        type="text"
        placeholder="Search clients..."
        className="w-full outline-none placeholder:text-[#A4A4A4]"
      />
    </div>
  );
};

const FilterButton = ({ label }: { label: string }) => {
  return (
    <button className="border border-[#E1E7EF] flex items-center gap-3 rounded-xl bg-[#FFFEFD] px-6 py-2.5 cursor-pointer">
      <p className="text-base font-light">{label}</p>
      <ChevronDownIcon />
    </button>
  );
};

const CustomerRow = ({ customer }: { customer: (typeof CUSTOMERS)[0] }) => {
  return (
    <tr className="text-base font-light text-[#4F4F4F] transition-colors">
      {/* Name */}
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#FCEFE0]">
            <span className="text-[13px] font-medium text-[#E99532]">
              {customer.initials}
            </span>
          </div>
          <span className="text-black">{customer.name}</span>
        </div>
      </td>

      <TableCell>{customer.email}</TableCell>

      <TableCell>{customer.phone}</TableCell>

      <TableCell>{customer.weight}</TableCell>

      <TableCell>{customer.height}</TableCell>

      {/* Subscription */}
      <td className="px-6 py-4">
        <StateComp state={customer.subscription} />
      </td>

      {/* Answers */}
      <td className="whitespace-nowrap px-6 py-4">
        <button className="flex cursor-pointer items-center gap-2 text-[#E99532] hover:underline">
          <div className="min-w-6">
            <ViewLinkIcon className="text-[#E99532]" />
          </div>
          <span>View Answers</span>
        </button>
      </td>

      {/* Specialist */}
      <td className="px-6 py-4">
        <button className="flex min-w-50 items-center justify-center gap-5 rounded-xl border border-[#E1E7EF] bg-[#FFFEFD] px-5 py-2.5 cursor-pointer">
          <span className="whitespace-nowrap text-sm text-[#A4A4A4]">
            Select Specialist
          </span>
          <ChevronDownIcon />
        </button>
      </td>
    </tr>
  );
};

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td className="whitespace-nowrap px-6 py-4">{children}</td>;
};

const ChevronDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default CustomersPage;
