"use client";


import { usePendingVerifications, useUpdateVerificationStatus } from "@/src/feature/dashboard/api/admin/verification";
import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ExternalLink,
  FileCheck,
} from "lucide-react";

export default function AdminVerificationsPage() {
  const { data: verifications, isLoading, isError, refetch } =
    usePendingVerifications();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateVerificationStatus();

  const handleAction = (id: string, status: "VERIFIED" | "REJECTED") => {
    updateStatus({ id, status });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl p-6 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="font-semibold text-slate-800">
            Failed to load verification requests.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            NID Verifications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review identity documents and verify user accounts.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
            <FileCheck size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Pending Requests</p>
            <p className="text-lg font-bold text-slate-900">
              {verifications?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Verification Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">NID Documents</th>
                <th className="px-6 py-4">Submitted Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verifications && verifications.length > 0 ? (
                verifications.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.user?.name || "N/A"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.user?.email || item.userId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <a
                          href={item.nidFront}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Front <ExternalLink size={12} />
                        </a>
                        <span className="text-slate-300">|</span>
                        <a
                          href={item.nidBack}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Back <ExternalLink size={12} />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={isUpdating}
                          onClick={() => handleAction(item.id, "VERIFIED")}
                          className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                        >
                          <CheckCircle2 size={15} /> Verify
                        </button>
                        <button
                          disabled={isUpdating}
                          onClick={() => handleAction(item.id, "REJECTED")}
                          className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
                        >
                          <XCircle size={15} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShieldAlert size={32} className="text-slate-300" />
                      <p className="font-medium">No pending NID verification requests.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}