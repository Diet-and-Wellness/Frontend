import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/endpoints/profile.api";

const getMyProfile = async () => {
  try {
    const { data } = await profileApi.getMyProfile();
    return data ?? null;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 || error.response?.status === 429)
    ) {
      return null;
    }

    throw error;
  }
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
