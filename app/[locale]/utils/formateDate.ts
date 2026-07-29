export const formatDate = (date: string | Date, locale = "en-US") => {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};
