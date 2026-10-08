import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getSingleCategories = async (id: string) => {
  return apiClient(`categories/${id}`, {
    method: "GET",
  });
};

export const useGetSingleCategories = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getSingleCategories(id),
    enabled: !!id,
  });
};