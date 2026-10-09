import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getAllRooms = async (page = 1, limit = 10) => {
  return apiClient(`room?page=${page}&limit=${limit}`, {
    method: "GET",
  });
};

export const useGetAllRoom = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["room", page, limit],
    queryFn: () => getAllRooms(page, limit),
  });
};