import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";


export const ownerOverview = () => {
  return apiClient("/owner-overview", {
    method: "GET",
  });
};

export const useOwnerOverview = () => {
  return useQuery({
    queryKey: ["owner-overview"],
    queryFn: ownerOverview,
  });
};
