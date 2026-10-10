import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

// 1. Fetch Applications API Function
export const getMyApplications = async () => {
  return apiClient("application", {
    method: "GET",
  });
};

// 2. React Query Hook
export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: getMyApplications,
  });
};