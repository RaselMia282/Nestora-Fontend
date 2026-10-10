// import { ofetch } from "ofetch";

// export const apiClient = ofetch.create({
//   // Base URL
//   baseURL:
//     process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",

//   onRequest({ options }) {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         options.headers = new Headers(options.headers);
//         options.headers.set("Authorization", `Bearer ${token}`);
//       }
//     }
//   },

//   // Response / Error Interceptor (401 Handling)
//   onResponseError({ response }) {
//     if (response.status === 401) {
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("accessToken");
//         // window.location.href = '/login';
//       }
//     }
//   },
// });





import { ofetch } from "ofetch";

export const apiClient = ofetch.create({
  // সরাসরি ব্যাকএন্ডের সম্পূর্ণ বেস ইউআরএল বসিয়ে দিন
  baseURL: "http://localhost:8000/api/v1",

  onRequest({ options }) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        options.headers = new Headers(options.headers);
        options.headers.set("Authorization", `Bearer ${token}`);
      }
    }
  },
});