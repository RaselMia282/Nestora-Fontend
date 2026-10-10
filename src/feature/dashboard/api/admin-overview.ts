import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";
import { AdminDashboardOverviewResponse } from "../interface";

export const adminOverview = () => {
  return apiClient<AdminDashboardOverviewResponse>("/admin-overview", {
    method: "GET",
  });
};

export const useTenantOverview = () => {
  return useQuery({
    queryKey: ["admin-overview"],
    queryFn: adminOverview,
  });
};
