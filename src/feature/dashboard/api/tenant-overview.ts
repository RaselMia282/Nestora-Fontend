import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";
import { TenantOverview } from "../interface";

export const tenantOverview = async () => {
  const res = await apiClient<{ data: TenantOverview }>(
    "/dashboard/tenant-overview",
    {
      method: "GET",
    },
  );

  return res.data;
};

export const useTenantOverview = () => {
  return useQuery<TenantOverview>({
    queryKey: ["tenant-overview"],
    queryFn: tenantOverview,
  });
};
