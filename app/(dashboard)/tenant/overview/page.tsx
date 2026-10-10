"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Home,
  Wallet,
} from "lucide-react";
import { useTenantOverview } from "@/src/feature/dashboard/api/tenant-overview";


export default function TenantOverviewPage() {
  const { data: rawData, isLoading, isError, refetch } = useTenantOverview();

  
  const data = (rawData as any)?.data || rawData;

  const money = (amount: number = 0) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);

  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="font-semibold text-slate-800">
          Could not load dashboard data.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  const stats = [
    {
      title: "Monthly Rent",
      value: money(data.monthlyRent ?? 0),
      note: data.activeLease ? "Current monthly rent" : "No active lease",
      icon: Wallet,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Payments",
      value: data.totalPayments ?? 0,
      note: "All recorded payments",
      icon: CreditCard,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Completed Payments",
      value: data.completedPayments ?? 0,
      note: "Successfully completed",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Pending Payments",
      value: data.pendingPayments ?? 0,
      note: "Awaiting completion",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const lease = data.activeLease;

  const formatDate = (date: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Hero / Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 to-indigo-600 p-8 text-white sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-blue-100">
            TENANT DASHBOARD
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Welcome to your home hub
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Manage your rental, track payments, and keep your housing
            information organized in one place.
          </p>
          <Link
            href="/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
          >
            Explore rooms <ArrowRight size={17} />
          </Link>
        </div>
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-white/10" />
      </section>

      {/* Metrics Section */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">Your overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            A quick look at your rental activity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <p className="mt-3 break-words text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={21} />
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500">{stat.note}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Rental Agreement & Quick Actions */}
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                My rental agreement
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your current lease information.
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Home size={23} />
            </div>
          </div>

          {lease ? (
            <div className="mt-7 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Monthly rent
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {money(lease.monthlyRent)}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  Active lease
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={17} /> Lease starts
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {formatDate(lease.startDate)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 p-4">
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={17} /> Lease ends
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {formatDate(lease.endDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Agreement status
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {lease.isSigned
                      ? "Your lease is signed."
                      : "Awaiting signature."}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    lease.isSigned
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {lease.isSigned ? "Signed" : "Unsigned"}
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Home size={27} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No active rental yet
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Explore available rooms and find a place that feels like
                home. Your lease details will appear here when you have
                an active rental.
              </p>
              <Link
                href="/rooms"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse available rooms <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold text-slate-900">Quick actions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Jump to what you need.
          </p>

          <div className="mt-6 space-y-3">
            <Link
              href="/rooms"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/60"
            >
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Home size={21} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">Browse rooms</p>
                <p className="mt-1 text-xs text-slate-500">
                  Find your ideal space
                </p>
              </div>
              <ArrowRight
                size={17}
                className="text-slate-400 group-hover:text-blue-600"
              />
            </Link>

            <Link
              href="/dashboard/tenant/payments"
              className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/60"
            >
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <CreditCard size={21} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-800">My payments</p>
                <p className="mt-1 text-xs text-slate-500">
                  Review payment activity
                </p>
              </div>
              <ArrowRight
                size={17}
                className="text-slate-400 group-hover:text-blue-600"
              />
            </Link>
          </div>

          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <p className="text-sm font-semibold text-blue-900">
              Need a place to stay?
            </p>
            <p className="mt-1 text-xs leading-5 text-blue-700">
              Explore listings to discover your next home.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}