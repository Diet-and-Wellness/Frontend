// Returns a src that next/image can request, or null for missing/malformed
// values coming from the API so callers can render a placeholder instead.
export const getImageSrc = (url: string | null | undefined) => {
  const value = url?.trim();
  if (!value) return null;

  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    return new URL(value).protocol === "https:" ? value : null;
  } catch {
    return null;
  }
};
