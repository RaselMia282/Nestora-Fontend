import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

// Fetch Payment History API Function
export const getMyPayments = async () => {
  return apiClient("payment", {
    method: "GET",
  });
};

// React Query Hook
export const useMyPayments = () => {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
};