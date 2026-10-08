"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { GoogleLogin } from "@react-oauth/google";

import { useLogin } from "../api/user-login";
import { loginUserInput } from "../schema/auth-schema";
import { useAuthStore } from "@/src/store/authStore";
import { getMe } from "../api/user-me";
import { googleLoginApi } from "../api/user-google";

export default function LoginForm() {
  const { mutate: login, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const defaultValues: loginUserInput = {
    email: "",
    password: "",
  };

  const form = useForm({
    defaultValues,

    onSubmit: async ({ value }) => {
      login(value, {
        onSuccess: async (res) => {
          try {
            alert("Login successful");

            console.log("Login response:", res);

            // Save access token
            if (res?.data?.accessToken) {
              localStorage.setItem(
                "accessToken",
                res.data.accessToken,
              );
            }

            // Get logged in user
            const meResponse = await getMe();

            // Save user in Zustand
            setUser(meResponse.data);

            // Reset form
            form.reset();

            // Redirect home
            router.push("/");
          } catch (error) {
            console.error("Login post-processing error:", error);
          }
        },

        onError: (error) => {
          console.error("Login error:", error);
          alert("Invalid email or password.");
        },
      });
    },
  });

  return (
    <div className="mx-auto mb-5 mt-5 w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white text-gray-800 shadow-2xl shadow-blue-900/10">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400" />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-500/30">
            N
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Sign in to your Nestora account
          </p>
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                // Google ID token check
                if (!credentialResponse.credential) {
                  throw new Error("Google ID token not found");
                }

                // Send Google ID token to backend
                const res = await googleLoginApi({
                  idToken: credentialResponse.credential,
                });

                console.log("Google login successful:", res);

                // Save access token
                if (res?.data?.accessToken) {
                  localStorage.setItem(
                    "accessToken",
                    res.data.accessToken,
                  );
                }

                // Get logged in user
                const meResponse = await getMe();

                // Save user in Zustand
                setUser(meResponse.data);

                alert("Google login successful!");

                // Redirect home
                router.push("/");
              } catch (error) {
                console.error(
                  "Google authentication error:",
                  error,
                );

                alert("Google sign-in failed on backend.");
              }
            }}
            onError={() => {
              console.error("Google Login Failed");
              alert("Google sign in was canceled or failed.");
            }}
          />
        </div>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
            or sign in with email
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Email Login Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            form.handleSubmit();
          }}
        >
          {/* Email Field */}
          <form.Field name="email">
            {(field) => (
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Email Address
                </label>

                <input
                  type="email"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50/60 px-4 py-2.5 text-sm transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Password Field */}
          <form.Field name="password">
            {(field) => (
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50/60 py-2.5 pl-4 pr-11 text-sm transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Submit Button */}
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
            ]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={
                  !canSubmit ||
                  isSubmitting ||
                  isPending
                }
                className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting || isPending
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            )}
          </form.Subscribe>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          <span>Don&apos;t have an account? </span>

          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}