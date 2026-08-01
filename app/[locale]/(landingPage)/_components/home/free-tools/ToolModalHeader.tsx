import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
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
      <p className="min-w-0 flex-1 text-center text-lg leading-snug font-semibold sm:text-xl">
        {toolName}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 cursor-pointer rounded-full p-3 transition-colors duration-200 hover:bg-surface-neutral"
      >
        <CloseIcon className="text-content-subtle" width="16" height="16" />
      </button>
    </div>
  );
};

export default ToolModalHeader;
