const ToolModalHeader = ({ toolName }: { toolName: string }) => {
  return (
    <div className="shrink-0 border-b border-line px-2.5 py-5 w-full">
      <p className="min-w-0 flex-1 text-center text-lg leading-snug font-semibold sm:text-xl text-content">
        {toolName}
      </p>
    </div>
  );
};

export default ToolModalHeader;
