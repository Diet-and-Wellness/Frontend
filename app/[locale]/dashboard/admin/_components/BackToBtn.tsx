import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";

export const BackButton = ({
  clickHandler,
  text,
}: {
  clickHandler: () => void;
  text: string;
}) => {
  return (
    <button
      onClick={clickHandler}
      className="type-control flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-line bg-surface px-7 py-1 md:py-1.5 font-semibold text-content-muted transition-colors hover:bg-surface-muted md:w-fit"
    >
      <ArrowIcon className="direction-aware-back-icon w-3 md:w-3.5 h-auto" />
      <p className="type-control font-semibold">{text}</p>
    </button>
  );
};
