import { useQuery, useQueryClient } from "@tanstack/react-query";
import { assessmentApi } from "../api/endpoints/assessment.api";
import { useEffect } from "react";

const getSection = async (currentSectionId: string) => {
  const { data } = await assessmentApi.getSection(currentSectionId ?? "");
  return data.data;
};

export const useSection = (
  currentSectionId: string | null,
  nextSectionId: string | null,
) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!!nextSectionId) {
      queryClient.prefetchQuery({
        queryKey: ["section", nextSectionId],
        queryFn: () => getSection(nextSectionId!),
      });
    }
  }, [nextSectionId, queryClient]);

  return useQuery({
    queryKey: ["section", currentSectionId],
    queryFn: () => getSection(currentSectionId!),
    enabled: !!currentSectionId,
  });
};
