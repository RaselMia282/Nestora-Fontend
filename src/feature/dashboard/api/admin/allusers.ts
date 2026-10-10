import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../interface";


export const getAdminUsers = async (): Promise<User[]> => {
  const res = await apiClient<{ data: User[] }>("/dashboard/users", {
    method: "GET",
  });
  return res.data;
};

export const useAdminUsers = () => {
  return useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
  });
};