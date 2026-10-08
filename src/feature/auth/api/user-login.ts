import { apiClient } from "@/src/lib/ofetch";
import { loginUserInput } from "../schema/auth-schema";
import { useMutation } from "@tanstack/react-query";

export const login = async(data:loginUserInput)=>{
    return apiClient("auth/login",{
        method:"POST",
        body:data,
    })
}

export const useLogin =()=>{
    return useMutation({
        mutationFn:login
    })
}