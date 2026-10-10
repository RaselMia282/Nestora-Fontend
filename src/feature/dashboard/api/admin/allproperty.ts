import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";
import { Property } from "../../interface";


export const getProperties = async (): Promise<Property[]> => {
  const res = await apiClient<any>("/properties", {
    method: "GET",
  });
  
  
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data; 
  
  return [];
};

export const useProperties = () => {
  return useQuery<Property[]>({
    queryKey: ["admin-properties"],
    queryFn: getProperties,
  });
};