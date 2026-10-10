// import { apiClient } from "@/src/lib/ofetch";
// import { useQuery } from "@tanstack/react-query";

// // 1. Fetch Applications API Function
// export const getMyApplications = async () => {
//   return apiClient("application", {
//     method: "GET",
//   });
// };

// // 2. React Query Hook
// export const useMyApplications = () => {
//   return useQuery({
//     queryKey: ["my-applications"],
//     queryFn: getMyApplications,
//   });
// };

import { apiClient } from "@/src/lib/ofetch";
import { useQuery } from "@tanstack/react-query";

// export const getMyApplications = async () => {
//   const res = await apiClient<{
//     success: boolean;
//     data: unknown;
//   }>("/application", {
//     method: "GET",
//   });

//   console.log("MY APPLICATIONS RESPONSE:", res);

//   return res;
// };

// export const useMyApplications = () => {
//   return useQuery({
//     queryKey: ["my-applications"],
//     queryFn: getMyApplications,
//   });
// };

export const getMyApplications = async () => {
  const res = await apiClient<{
    success: boolean;
    data: any[];
  }>("/application", {
    method: "GET",
  });

  console.log("MY APPLICATIONS RESPONSE:", res);

  // ব্যাকএন্ডের data ফিল্ড থেকে সরাসরি অ্যারে রিটার্ন করুন
  if (Array.isArray(res?.data)) {
    return res.data;
  }

  if (Array.isArray(res)) {
    return res;
  }

  return [];
};

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: getMyApplications,
  });
};
