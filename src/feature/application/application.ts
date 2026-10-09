import { apiClient } from "@/src/lib/ofetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 1. Types for Application Payload
export interface CreateApplicationPayload {
  roomId: string;
  propertyId: string;
  moveInDate: string;
  note?: string;
}

// 2. Application Submit API Function
export const submitApplication = async (payload: CreateApplicationPayload) => {
  return apiClient("application", {
    method: "POST",
    body: payload,
  });
};

// 3. Application Submit Mutation Hook
export const useSubmitApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["my-applications"] });
    },
  });
};