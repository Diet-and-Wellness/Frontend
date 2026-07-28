import { useQuery } from "@tanstack/react-query";
import { assessmentApi } from "../api/endpoints/assessment.api";
import { useMe } from "./useMe";

const getForm = async () => {
  const { data } = await assessmentApi.getActiveForm();
  return data.data;
};

export const useAssessment = () => {
  const { data: me } = useMe();
  return useQuery({
    queryKey: ["assessment"],
    queryFn: getForm,
    enabled: !!me?.profile?.gender,
  });
};
