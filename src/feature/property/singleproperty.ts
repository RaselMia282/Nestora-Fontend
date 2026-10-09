import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getSingleProperty = async (id: string) => {
  // Back-end route: /api/v1/properties/:id
  return apiClient(`properties/${id}`, {
    method: "GET",
  });
};

export const useGetSingleProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: () => getSingleProperty(id),
    enabled: !!id,
  });
};