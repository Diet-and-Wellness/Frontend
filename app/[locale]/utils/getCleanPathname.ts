export const getCleanPathname = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);
  const pathnameWithoutLocale = segments.slice(1);
  return "/" + pathnameWithoutLocale.join("/");
};  