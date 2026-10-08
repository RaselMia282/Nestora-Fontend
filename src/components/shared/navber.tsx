"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/src/store/authStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Find Rooms" },
  { href: "/categories", label: "Categories" },
  { href: "/how-it-works", label: "How it works" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogOut = () => {
    logout();
    setMobileMenuOpen(false);
    router.push("/login");
  };

  const displayName =
    (user as { name?: string } | null)?.name ||
    user?.email?.split("@")[0]?.slice(0, 3) ||
    "User";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-600 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          Nestora<span className="text-blue-200">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-blue-50 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-3 md:flex">
          {!mounted ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-blue-500/50" />
          ) : user ? (
            /* ---------- Logged In ---------- */
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm font-semibold text-white outline-none transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-white/60 data-[state=open]:bg-blue-700">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600">
                  {initial}
                </span>
                <span className="max-w-[120px] truncate">{displayName}</span>
                <svg
                  className="h-4 w-4 opacity-80"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60 rounded-xl border-gray-200 bg-white p-2 text-gray-800 shadow-xl"
              >
                {/* User info */}
                <div className="mb-1 flex items-center gap-3 border-b border-gray-100 px-3 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                    <span className="mt-1 inline-block rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                      {user.role}
                    </span>
                  </div>
                </div>

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard")}
                  className="cursor-pointer rounded-lg py-2 font-medium hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-600"
                >
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-gray-100" />

                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="cursor-pointer rounded-lg py-2 font-medium text-red-600 focus:bg-red-50 focus:text-red-700"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* ---------- Logged Out ---------- */
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="font-semibold text-white hover:bg-blue-700 hover:text-white"
                onClick={() => router.push("/login")}
              >
                Sign in
              </Button>
              <Button
                className="bg-white font-semibold text-blue-600 hover:bg-blue-50"
                onClick={() => router.push("/register")}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="text-xl font-bold">
              {mobileMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="space-y-4 border-t border-blue-700 bg-blue-600 px-4 pb-6 pt-3 text-white shadow-xl md:hidden">
          <div className="flex flex-col space-y-3 text-sm font-semibold">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-1 hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-blue-500 pt-3">
            {mounted && user ? (
              <div className="flex flex-col space-y-3 text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-base font-bold text-blue-600">
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-blue-100">
                      {user.email}
                    </p>
                    <span className="mt-0.5 inline-block rounded bg-blue-700 px-1.5 py-0.5 text-[10px] font-bold uppercase text-blue-100">
                      {user.role}
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="py-1 hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogOut}
                  className="py-1 text-left font-semibold text-red-200 hover:text-red-100"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Button
                  variant="outline"
                  className="w-full border-white bg-transparent font-semibold text-white hover:bg-blue-700 hover:text-white"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/login");
                  }}
                >
                  Sign in
                </Button>
                <Button
                  className="w-full bg-white font-semibold text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/register");
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
