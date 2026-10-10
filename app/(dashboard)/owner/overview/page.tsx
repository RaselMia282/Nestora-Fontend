"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileText,
  ClipboardList,
  Clock3,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/lib/ofetch";

type OwnerOverview = {
  totalProperties: number;
  totalListings: number;
  totalApplications: number;
  pendingApplications: number;
  activeLeases: number;
  completedPayments: number;
};

async function getOwnerOverview(): Promise<OwnerOverview> {
  const res = await apiClient<{ data: OwnerOverview }>(
    "/dashboard/owner-overview",
    { method: "GET" },
  );

  return res.data;
}

export default function OwnerOverviewPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["owner-overview"],
    queryFn: getOwnerOverview,
  });

  const stats = data
    ? [
        {
          title: "Total Properties",
          value: data.totalProperties,
          description: "Properties you manage",
          icon: Building2,
          color: "bg-blue-50 text-blue-600",
        },
        {
          title: "Active Listings",
          value: data.totalListings,
          description: "Published room listings",
          icon: FileText,
          color: "bg-violet-50 text-violet-600",
        },
        {
          title: "Total Applications",
          value: data.totalApplications,
          description: "Applications received",
          icon: ClipboardList,
          color: "bg-emerald-50 text-emerald-600",
        },
        {
          title: "Pending Applications",
          value: data.pendingApplications,
          description: "Awaiting your review",
          icon: Clock3,
          color: "bg-amber-50 text-amber-600",
        },
        {
          title: "Active Leases",
          value: data.activeLeases,
          description: "Currently active agreements",
          icon: CheckCircle2,
          color: "bg-indigo-50 text-indigo-600",
        },
        {
          title: "Completed Payments",
          value: data.completedPayments,
          description: "Successfully completed payments",
          icon: CreditCard,
          color: "bg-teal-50 text-teal-600",
        },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-52 animate-pulse rounded-3xl bg-slate-200" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          Unable to load your dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 text-white shadow-sm sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-blue-100">
            OWNER DASHBOARD
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Manage your properties
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Keep track of your properties, room listings, applications,
            leases, and payment activity in one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/owner/properties"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              My properties
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/owner/properties/create"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Add property
              <Building2 size={17} />
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-white/10" />
      </section>

      {/* Overview Cards */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Business overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A summary of your property management activity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  {stat.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Application Summary */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Application review
              </h2>
              <p className="text-sm text-slate-500">
                Applications waiting for your attention.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 rounded-xl bg-slate-50 p-5">
            <div>
              <p className="text-sm text-slate-500">
                Pending applications
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {data.pendingApplications}
              </p>
            </div>

            <Link
              href="/owner/applications"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Review <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Building2 size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Property management
              </h2>
              <p className="text-sm text-slate-500">
                Manage your properties and room listings.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Properties</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {data.totalProperties}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Listings</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {data.totalListings}
              </p>
            </div>
          </div>

          <Link
            href="/owner/properties"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Manage properties <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}