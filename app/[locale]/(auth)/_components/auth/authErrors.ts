import axios from "axios";

type ApiErrorPayload = {
  message?: string | string[];
  error?: string;
  code?: string;
  errors?: Record<string, string | string[]>;
};

const firstMessage = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiErrorPayload>(error)) {
    const payload = error.response?.data;
    return (
      firstMessage(payload?.message) ||
      payload?.error ||
      (error.code === "ECONNABORTED" ? fallback : undefined) ||
      fallback
    );
  }

  return error instanceof Error && error.message !== "Network Error"
    ? error.message
    : fallback;
};

export const getApiFieldErrors = (error: unknown) => {
  if (!axios.isAxiosError<ApiErrorPayload>(error)) return {};

  const errors = error.response?.data?.errors ?? {};

  return Object.fromEntries(
    Object.entries(errors)
      .map(([field, message]) => [field, firstMessage(message)])
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
};

export const getApiErrorCode = (error: unknown) =>
  axios.isAxiosError<ApiErrorPayload>(error)
    ? error.response?.data?.code
    : undefined;
