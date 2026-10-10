import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";
import { OwnerDashboardOverviewResponse } from "../interface";

export const ownerOverview = () => {
  return apiClient<OwnerDashboardOverviewResponse>("/owner-overview", {
    method: "GET",
  });
};

export const useOwnerOverview = () => {
  return useQuery({
    queryKey: ["owner-overview"],
    queryFn: ownerOverview,
  });
};
