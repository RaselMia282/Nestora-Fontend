"use client";


import { useApplications, useUpdateApplicationStatus } from "@/src/feature/dashboard/api/admin/allapplications";
import { ApplicationStatus } from "@/src/feature/dashboard/interface";
import {
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Building,
  User,
} from "lucide-react";
import { useState } from "react";

export default function AdminApplicationsPage() {
  const { data: applications, isLoading, isError, refetch } = useApplications();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
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
            Failed to load rental applications.
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

  // ফিল্টারিং লজিক (সার্চ এবং স্ট্যাটাস অনুযায়ী)
  const filteredApplications = applications?.filter((item) => {
    const matchesSearch =
      item.tenant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.property?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Rental Applications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review and manage property/room booking applications from tenants.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Total Applications</p>
            <p className="text-lg font-bold text-slate-900">
              {applications?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tenant or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                selectedStatus === status
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Tenant</th>
                <th className="px-6 py-4">Property / Room</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications && filteredApplications.length > 0 ? (
                filteredApplications.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.tenant?.name || "Unknown Tenant"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {item.tenant?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-slate-400 shrink-0" />
                        <div>
                          <p className="font-medium text-slate-800">
                            {item.property?.title || item.room?.roomNumber || "N/A"}
                          </p>
                          <p className="text-xs text-slate-500">
                            Rent: ${item.property?.rent || item.room?.rent || 0}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "APPROVED"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status === "REJECTED"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
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
                          disabled={isUpdating || item.status === "APPROVED"}
                          onClick={() => handleStatusChange(item.id, "APPROVED")}
                          className="inline-flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50"
                        >
                          <CheckCircle2 size={15} /> Approve
                        </button>
                        <button
                          disabled={isUpdating || item.status === "REJECTED"}
                          onClick={() => handleStatusChange(item.id, "REJECTED")}
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
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText size={32} className="text-slate-300" />
                      <p className="font-medium">No applications found.</p>
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