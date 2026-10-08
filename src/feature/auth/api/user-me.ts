import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getMe = async () => {
  return apiClient("auth/me", {
    method: "GET",
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
