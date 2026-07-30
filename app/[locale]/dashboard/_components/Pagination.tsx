"use client";

import { useTranslations } from "next-intl";

type PaginationProps = {
  currentPage: number;
  totalPages?: number;
  hasNextPage: boolean;
  isFetching?: boolean;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  isFetching = false,
  onPageChange,
}: PaginationProps) => {
  const t = useTranslations("dashboard");
  const lastPage = totalPages && totalPages > 0 ? totalPages : undefined;

  if (currentPage === 1 && !hasNextPage && (!lastPage || lastPage <= 1)) {
    return null;
  }

  return (
    <nav
      aria-label={t("pagination")}
      className="flex items-center justify-center pt-4"
    >
      <div className="flex w-fit items-center gap-1 rounded-full border border-line-subtle bg-surface-raised p-1">
        <button
          type="button"
          disabled={currentPage === 1 || isFetching}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label={t("previousPage")}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-subtle bg-surface-muted text-content-muted transition-[background-color,transform] hover:bg-surface-neutral active:scale-95 sm:size-11"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="direction-aware-back-icon size-5"
          >
            <path
              d="m15 18-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span
          aria-current="page"
          aria-live="polite"
          className="type-control flex min-w-20 items-center justify-center whitespace-nowrap px-2.5 font-semibold text-content-muted sm:min-w-24"
        >
          {lastPage
            ? t("pageOfPages", { page: currentPage, total: lastPage })
            : t("pageNumber", { page: currentPage })}
        </span>

        <button
          type="button"
          disabled={!hasNextPage || isFetching}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label={t("nextPage")}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-accent-dark bg-accent text-white transition-[background-color,transform] hover:bg-accent-hover active:scale-95 sm:size-11"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="direction-aware-forward-icon size-5"
          >
            <path
              d="m9 18 6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
