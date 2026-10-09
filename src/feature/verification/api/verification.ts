import { apiClient } from "@/src/lib/ofetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// 1. Verification Submit Function (FormData)
export const verifyIdentity = async (formData: FormData) => {
  return apiClient("verification", {
    method: "POST",
    body: formData,
  });
};

// 2. Verification Mutation Hook
export const useVerifyIdentity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyIdentity,
    onSuccess: () => {
      // NID আপলোড সফল হলে সাথে সাথে useGetMyVerification এর ক্যাশ রিফ্রেশ করবে
      queryClient.invalidateQueries({ queryKey: ["my-verification"] });
    },
  });
};