import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

export const getAllRooms = async () => {
  return apiClient("room", {
    method: "GET",
  });
};

export const useGetAllRoom = () => {
  return useQuery({
    queryKey: ["room"],
    queryFn: getAllRooms,
  });
};
