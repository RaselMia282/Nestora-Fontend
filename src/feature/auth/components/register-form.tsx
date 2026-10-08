"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Building2, UserCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRegister } from "../api/user-register";
import { RegisterUserInput, registerUserSchema } from "../schema/auth-schema";
import { Gender, Role } from "../types/enum";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";

export default function RegisterForm() {
  const { mutate: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const defaultValues: RegisterUserInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: Gender.MALE,
    role: Role.TENANT,
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      // Zod validation check
      const validation = registerUserSchema.safeParse(value);
      if (!validation.success) {
        return;
      }

      register(value as RegisterUserInput, {
        onSuccess: (res) => {
          form.reset();
          console.log("Registration successful:", res);
          setUser(res.data);
          form.reset();
          router.push("/")
        },
      });
    },
  });

//   const handleGoogleSignUp = () => {
//     // Backend Google OAuth URL Redirect
//     window.location.href = `${process.env.NEXT_PUBLIC_BASE_API}/auth/google`;
//   };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50">
      {/* Left Column: Branding / Info Banner (Desktop Only) */}
      <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Building2 className="w-8 h-8 text-indigo-200" />
            <span>Nestora</span>
          </Link>

          <div className="mt-24 space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Find your next home or tenant with confidence.
            </h1>
            <p className="text-indigo-100 text-base leading-relaxed">
              Join thousands of users managing rental properties, room listings, and roommate matching seamlessly on Nestora.
            </p>

            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/30 rounded-lg backdrop-blur-md">
                  <ShieldCheck className="w-5 h-5 text-indigo-200" />
                </div>
                <span className="text-sm font-medium">Verified tenant & landlord profiles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/30 rounded-lg backdrop-blur-md">
                  <UserCheck className="w-5 h-5 text-indigo-200" />
                </div>
                <span className="text-sm font-medium">Automated roommate matching system</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-indigo-200">
          © {new Date().getFullYear()} Nestora Platform. All rights reserved.
        </div>

        {/* Decorative background blur elements */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Right Column: Registration Form */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create an Account</h2>
            <p className="text-sm text-slate-500 mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold transition">
                Sign in
              </Link>
            </p>
          </div>

          {/* Social Sign Up Button */}
          <button
            type="button"
            // onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 rounded-xl font-medium text-slate-700 bg-white hover:bg-slate-50 transition shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">Or register with email</span>
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* First Name & Last Name (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <form.Field
                name="firstName"
                validators={{ onChange: registerUserSchema.shape.firstName }}
              >
                {(field) => (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="John"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {typeof field.state.meta.errors[0] === "string"
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="lastName"
                validators={{ onChange: registerUserSchema.shape.lastName }}
              >
                {(field) => (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Doe"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {typeof field.state.meta.errors[0] === "string"
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Email Field */}
            <form.Field
              name="email"
              validators={{ onChange: registerUserSchema.shape.email }}
            >
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {typeof field.state.meta.errors[0] === "string"
                        ? field.state.meta.errors[0]
                        : field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Phone & Gender (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <form.Field
                name="phone"
                validators={{ onChange: registerUserSchema.shape.phone }}
              >
                {(field) => (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="tel"
                      placeholder="+880 1700-000000"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {typeof field.state.meta.errors[0] === "string"
                          ? field.state.meta.errors[0]
                          : field.state.meta.errors[0]?.message}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field name="gender">
                {(field) => (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                    <select
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value as Gender)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                    >
                      <option value={Gender.MALE}>Male</option>
                      <option value={Gender.FEMALE}>Female</option>
                    </select>
                  </div>
                )}
              </form.Field>
            </div>

            {/* Role Field */}
            <form.Field name="role">
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">I want to register as</label>
                  <select
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as Role)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  >
                    <option value={Role.TENANT}>Tenant (Searching for Rooms)</option>
                    <option value={Role.ADMIN}>Landlord / Owner (Posting Rooms)</option>
                  </select>
                </div>
              )}
            </form.Field>

            {/* Password Field with Toggle Show/Hide */}
            <form.Field
              name="password"
              validators={{ onChange: registerUserSchema.shape.password }}
            >
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-xs mt-1 font-medium">
                      {typeof field.state.meta.errors[0] === "string"
                        ? field.state.meta.errors[0]
                        : field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}