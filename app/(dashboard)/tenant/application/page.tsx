"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Home,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import { useMyApplications } from "@/src/feature/dashboard/api/tenant-application";


export default function TenantApplicationsPage() {
  const { data: rawData, isLoading, isError, refetch } = useMyApplications();

  
  const applications = (rawData as any)?.data || rawData || [];

  const money = (amount: number = 0) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date: string) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-2xl bg-slate-200"
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
            Could not load your rental applications.
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

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Rental Applications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track the status of the rooms you have applied for.
          </p>
        </div>
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:self-auto"
        >
          Browse more rooms <ArrowRight size={16} />
        </Link>
      </div>

      {/* Applications List / Grid */}
      {applications.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app: any) => {
            const status = app.status?.toUpperCase() || "PENDING";
            
            // স্ট্যাটাস অনুযায়ী ডেকোরেশন ও কালার সেটআপ
            const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
              APPROVED: {
                bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
                text: "Approved",
                icon: CheckCircle2,
              },
              REJECTED: {
                bg: "bg-rose-50 text-rose-700 border-rose-200",
                text: "Rejected",
                icon: XCircle,
              },
              PENDING: {
                bg: "bg-amber-50 text-amber-700 border-amber-200",
                text: "Pending Review",
                icon: Clock,
              },
            };

            const currentStatus = statusConfig[status] || statusConfig["PENDING"];
            const StatusIcon = currentStatus.icon;

            return (
              <div
                key={app.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  {/* Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${currentStatus.bg}`}
                    >
                      <StatusIcon size={14} />
                      {currentStatus.text}
                    </span>
                    <span className="text-xs text-slate-400">
                      Applied: {formatDate(app.createdAt || app.appliedAt)}
                    </span>
                  </div>

                  {/* Room & Rent Info */}
                  <div className="mt-5 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                      {app.room?.title || "Room Rental Application"}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1">
                      📍 {app.room?.location || "Location not specified"}
                    </p>
                  </div>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Proposed Monthly Rent
                    </p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {money(app.room?.rent || app.monthlyRent || 0)}
                    </p>
                  </div>

                  {/* Move-in Date */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays size={16} className="text-slate-400" />
                    <span>Move-in: {formatDate(app.moveInDate)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    href={`/rooms/${app.room?.id || app.roomId}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    View room details <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileText size={32} />
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No applications found
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You haven't submitted any room rental applications yet. Explore our
            available listings and find your next home.
          </p>
          <Link
            href="/rooms"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Explore available rooms <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}