import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/endpoints/profile.api";

const getMyProfile = async () => {
  const { data } = await profileApi.getMyProfile();
  return data ?? {};
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });
};
