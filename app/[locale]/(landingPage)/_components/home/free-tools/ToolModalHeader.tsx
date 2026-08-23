import { CloseBtn } from "@/app/[locale]/components/Public/CloseBtn";
import type { ReactNode } from "react";

const ToolModalHeader = ({
  toolName,
  toolIcon,
  onClose,
}: {
  toolName: string;
  toolIcon: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="shrink-0 border-b border-line px-4 py-3 sm:px-5 sm:py-3.5 flex w-full items-center justify-between gap-2">
      <div className="flex size-13 shrink-0 items-center justify-center rounded-full bg-(--color-palette-c8dcbf)">
        {toolIcon}
      </div>
      <p className="min-w-0 flex-1 text-center text-lg leading-snug font-semibold sm:text-xl text-content">
        {toolName}
      </p>
      <CloseBtn onClose={onClose} />
    </div>
  );
};

export default ToolModalHeader;
