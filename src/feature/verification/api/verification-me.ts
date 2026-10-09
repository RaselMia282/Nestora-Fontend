import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getMyVerification = async () => {
  return apiClient("verification/me", {
    method: "GET",
  });
};

export const useGetMyVerification = () => {
  return useQuery({
    queryKey: ["my-verification"],
    queryFn: getMyVerification,
  });
};