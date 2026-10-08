import { apiClient } from "@/src/lib/ofetch";
import { RegisterUserInput } from "../schema/auth-schema";
import { useMutation } from "@tanstack/react-query";

export const register = async (data: RegisterUserInput) => {
  return apiClient("auth/register", {
    method: "POST",
    body: data,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
