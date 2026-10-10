"use client";


import { useAdminOverview } from "@/src/feature/dashboard/api/admin/overview";
import {
  Users,
  Building2,
  Home,
  FileText,
  KeyRound,
  CreditCard,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  const { data, isLoading, isError, refetch } = useAdminOverview();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl p-6 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="font-semibold text-slate-800">
            Failed to load admin overview statistics.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ৭টি ডাইনামিক মেট্রিক কার্ড সাজানো হলো
  const statCards = [
    {
      title: "Total Users",
      value: data?.totalUsers ?? 0,
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      link: "/admin/users",
    },
    {
      title: "Total Properties",
      value: data?.totalProperties ?? 0,
      icon: Building2,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      link: "/admin/properties",
    },
    {
      title: "Active Listings",
      value: data?.totalListings ?? 0,
      icon: Home,
      color: "text-sky-600 bg-sky-50 border-sky-100",
      link: "/admin/listings",
    },
    {
      title: "Pending Applications",
      value: data?.pendingApplications ?? 0,
      icon: FileText,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      link: "/admin/applications",
    },
    {
      title: "Active Leases",
      value: data?.activeLeases ?? 0,
      icon: KeyRound,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      link: "/admin/leases",
    },
    {
      title: "Completed Payments",
      value: data?.completedPayments ?? 0,
      icon: CreditCard,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      link: "/admin/payments",
    },
    {
      title: "Pending NID Verifications",
      value: data?.pendingNidVerifications ?? 0,
      icon: ShieldAlert,
      color: "text-rose-600 bg-rose-50 border-rose-100",
      link: "/admin/verifications",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of platform metrics, properties, and verification requests.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    {card.title}
                  </span>
                  <div className={`rounded-xl border p-2.5 ${card.color}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-3">
                <Link
                  href={card.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View details <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}