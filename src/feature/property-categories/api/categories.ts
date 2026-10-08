import { apiClient } from "@/src/lib/ofetch"
import { useQuery } from "@tanstack/react-query"

export const getCategories = async()=>{
    return apiClient("property-categories",{
        method:"GET"
    })
}

export const useCategories = ()=>{
    return useQuery({
        queryKey:["categories"],
        queryFn:getCategories,
    })
}