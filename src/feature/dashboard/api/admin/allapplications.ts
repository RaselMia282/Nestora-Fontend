import { apiClient } from "@/src/lib/ofetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Application, UpdateApplicationStatusPayload } from "../../interface";



export const getApplications = async (): Promise<Application[]> => {
  const res = await apiClient<{ data: Application[] }>("/application", {
    method: "GET",
  });
  return res.data;
};

export const useApplications = () => {
  return useQuery<Application[]>({
    queryKey: ["admin-applications"],
    queryFn: getApplications,
  });
};


export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateApplicationStatusPayload) => {
      return await apiClient(`/application/${id}/status`, {
        method: "PATCH",
        body: { status },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });
};