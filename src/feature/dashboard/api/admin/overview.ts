import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";
import { AdminOverviewData } from "../../interface";

export const adminOverview = async () => {
  const res = await apiClient<{ data: AdminOverviewData }>(
    "/dashboard/admin-overview",
    {
      method: "GET",
    },
  );

  return res.data;
};

export const useAdminOverview = () => {
  return useQuery<AdminOverviewData>({
    queryKey: ["admin-overview"],
    queryFn: adminOverview,
  });
};
