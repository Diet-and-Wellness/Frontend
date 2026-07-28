import Image from "next/image";
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";

const ToolModalHeader = ({
  toolName,
  onClose,
}: {
  toolName: string;
  onClose: () => void;
}) => {
  return (
    <div className="flex justify-between items-center gap-7.5 w-full">
      <div className="size-12 flex justify-center items-center rounded-2xl bg-[#C8DCBF]">
        <Image src={"/icons/bmi.svg"} alt="" width={30} height={30} />
      </div>
      <p className="text-[22px] font-semibold text-center">{toolName}</p>
      <button
        onClick={onClose}
        className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
      >
        <CloseIcon className="text-gray-500" width="16" height="16" />
      </button>
    </div>
  );
};

export default ToolModalHeader;
