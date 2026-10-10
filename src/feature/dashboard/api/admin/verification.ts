import { apiClient } from "@/src/lib/ofetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NidVerification, VerificationStatusPayload } from "../../interface";


export const getPendingVerifications = async (): Promise<NidVerification[]> => {
  const res = await apiClient<{ data: NidVerification[] }>(
    "/verification/pending-list",
    {
      method: "GET",
    }
  );
  return res.data;
};

export const usePendingVerifications = () => {
  return useQuery<NidVerification[]>({
    queryKey: ["pending-verifications"],
    queryFn: getPendingVerifications,
  });
};

export const useUpdateVerificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: VerificationStatusPayload) => {
      return await apiClient(`/verification/${id}/status`, {
        method: "PATCH",
        body: { status },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-verifications"] });
      queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
  });
};