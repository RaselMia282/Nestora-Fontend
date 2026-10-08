import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getSingleCategory = async (id: string) => {
  return apiClient(`property-categories/${id}`, {
    method: "GET",
  });
};

export const useGetSingleCategory = (id: string) => {
  return useQuery({
    queryKey: ["property-category", id],
    queryFn: () => getSingleCategory(id),
    enabled: !!id,
  });
};