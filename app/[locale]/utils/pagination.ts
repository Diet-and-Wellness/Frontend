type PaginationMetadata = Record<string, unknown>;

export type PaginatedResult<T> = {
  items: T[];
  totalPages?: number;
  hasNextPage: boolean;
};

const getPositiveNumber = (
  sources: PaginationMetadata[],
  keys: string[],
) => {
  for (const source of sources) {
    for (const key of keys) {
      const value = Number(source[key]);

      if (Number.isFinite(value) && value >= 0) {
        return value;
      }
    }
  }

  return undefined;
};

export const parsePaginatedResponse = <T>(
  payload: unknown,
  currentPage: number,
  limit: number,
): PaginatedResult<T> => {
  const response =
    payload && typeof payload === "object"
      ? (payload as PaginationMetadata)
      : {};
  const items = Array.isArray(payload)
    ? (payload as T[])
    : Array.isArray(response.data)
      ? (response.data as T[])
      : [];

  const metadataSources = [
    response.pagination,
    response.meta,
    response,
  ].filter(
    (value): value is PaginationMetadata =>
      Boolean(value) && typeof value === "object" && !Array.isArray(value),
  );

  const explicitTotalPages = getPositiveNumber(metadataSources, [
    "totalPages",
    "pageCount",
    "pages",
  ]);
  const totalItems = getPositiveNumber(metadataSources, [
    "total",
    "totalCount",
    "totalItems",
    "count",
  ]);
  const totalPages =
    explicitTotalPages ??
    (totalItems === undefined ? undefined : Math.ceil(totalItems / limit));
  const explicitHasNext = metadataSources
    .map((source) => source.hasNextPage ?? source.hasNext)
    .find((value) => typeof value === "boolean");

  return {
    items,
    totalPages,
    hasNextPage:
      typeof explicitHasNext === "boolean"
        ? explicitHasNext
        : totalPages !== undefined
          ? currentPage < totalPages
          : items.length === limit,
  };
};
