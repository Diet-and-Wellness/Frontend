import type { AuthUser, GoogleAuthMeta } from "../../../api/types/auth.types";

export const getRoleDestination = (user: Pick<AuthUser, "role">) => {
  if (user.role === "admin") return "/dashboard/admin";
  if (user.role === "specialist") return "/dashboard/specialist";
  return "/nutrition-analysis";
};

export const getGoogleAuthDestination = (
  user: Pick<AuthUser, "role">,
  meta?: GoogleAuthMeta,
) =>
  meta?.needsProfileCompletion ? "/complete-profile" : getRoleDestination(user);
