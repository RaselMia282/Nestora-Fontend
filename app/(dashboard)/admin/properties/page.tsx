"use client";


import { Building2, Search, MapPin, DollarSign, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useProperties } from "@/src/feature/dashboard/api/admin/allproperty";

export default function AdminPropertiesPage() {
  const { data: properties, isLoading, isError, refetch } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");

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
            Failed to load properties.
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

  // সার্চ ফিল্টার লজিক
  const filteredProperties = properties?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Property Listings
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage all available property and room listings.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Total Properties</p>
            <p className="text-lg font-bold text-slate-900">
              {properties?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title, location, or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Properties Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Rent</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4 text-right">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties && filteredProperties.length > 0 ? (
                filteredProperties.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.propertyImg ? (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <Image
                              src={item.propertyImg}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                            <ImageIcon size={20} />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {item.description || "No description provided"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <MapPin size={15} className="text-slate-400 shrink-0" />
                        <span className="text-xs font-medium">{item.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-semibold text-slate-900">
                        <DollarSign size={14} className="text-emerald-600" />
                        {item.rent}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">
                          {item.owner?.name || "Unknown Owner"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {item.owner?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-medium text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Building2 size={32} className="text-slate-300" />
                      <p className="font-medium">No properties found.</p>
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