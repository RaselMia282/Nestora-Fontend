import { apiClient } from "@/src/lib/ofetch";
import { GoogleLoginInput } from "../types/interface";

export const googleLoginApi = async (data: GoogleLoginInput) => {
  return apiClient("auth/google-login", {
    method: "POST",
    body: data,
  });
};
