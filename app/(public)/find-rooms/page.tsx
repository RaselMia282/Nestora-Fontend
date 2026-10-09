"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Building2,
  Filter,
  Home,
  X,
  DollarSign,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGetAllRoom } from "@/src/feature/room/api/room";


export default function FindRoomsPage() {
  // Pagination State
  const [page, setPage] = useState(1);
  const limit = 10; // প্রতি পেজে ৯টি করে রুম দেখাবে

  // Fetch Rooms with Page and Limit
  const { data: response, isLoading, isError } = useGetAllRoom(page, limit);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [roomType, setRoomType] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [maxRent, setMaxRent] = useState<number>(30000);

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract rooms array & pagination meta from API response
  const rooms = response?.data?.data || [];
  const meta = response?.data?.meta || { totalPages: 1, pageNumber: 1 };

  // Filtering Logic
  const filteredRooms = rooms.filter((room: any) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !search ||
      room.roomNumber?.toLowerCase().includes(search) ||
      room.roomType?.toLowerCase().includes(search) ||
      room.property?.title?.toLowerCase().includes(search) ||
      room.property?.name?.toLowerCase().includes(search) ||
      room.propertyId?.toLowerCase().includes(search);

    const matchesRoomType =
      roomType === "ALL" ||
      room.roomType?.toUpperCase() === roomType.toUpperCase();

    const matchesStatus =
      statusFilter === "ALL" ||
      room.status?.toUpperCase() === statusFilter.toUpperCase();

    const rentValue = Number(room.baseRent) || 0;
    const matchesRent = rentValue <= maxRent;

    return matchesSearch && matchesRoomType && matchesStatus && matchesRent;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setRoomType("ALL");
    setStatusFilter("ALL");
    setMaxRent(30000);
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Find Your Ideal Room
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Search by property name, room number, or filter by room type and rent.
          </p>
        </div>

        {/* Top Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-2xs mb-8 flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by property name, room number (e.g., 101), or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-2xl border-none text-sm text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden w-full py-3 px-4 bg-emerald-50 text-emerald-700 font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 border border-emerald-200"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filter */}
          <div
            className={`lg:block ${
              isMobileFilterOpen
                ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto"
                : "hidden"
            }`}
          >
            <div className="bg-white lg:border border-gray-100 p-6 rounded-3xl lg:shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-bold text-gray-900 text-base">Filter Rooms</h2>
                </div>
                {isMobileFilterOpen && (
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* 1. Room Type Filter */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-emerald-600" />
                  Room Type
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                >
                  <option value="ALL">All Room Types</option>
                  <option value="SINGLE">Single Room</option>
                  <option value="DOUBLE">Double Room</option>
                  <option value="SHARED">Shared Room</option>
                </select>
              </div>

              {/* 2. Room Availability Status */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  Availability Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "ALL", label: "All" },
                    { id: "AVAILABLE", label: "Available" },
                    { id: "BOOKED", label: "Booked" },
                  ].map((status) => (
                    <button
                      key={status.id}
                      onClick={() => setStatusFilter(status.id)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        statusFilter === status.id
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Maximum Base Rent Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    Max Rent
                  </label>
                  <span className="text-xs font-bold text-emerald-600">
                    ৳{maxRent}
                  </span>
                </div>
                <input
                  type="range"
                  min="3000"
                  max="30000"
                  step="1000"
                  value={maxRent}
                  onChange={(e) => setMaxRent(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>৳3,000</span>
                  <span>৳30,000</span>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-dashed border-gray-200 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Right Area: Room Cards Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Count Header */}
            <div className="flex items-center justify-between">
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {filteredRooms.length}
                </span>{" "}
                rooms on this page
              </p>
            </div>

            {/* Skeleton Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl h-80 animate-pulse p-4 border border-gray-100"
                  >
                    <div className="bg-gray-200 h-40 rounded-2xl mb-4"></div>
                    <div className="bg-gray-200 h-5 rounded-lg w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded-lg w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center text-red-600 text-sm font-semibold">
                Failed to load rooms. Please make sure backend API is running.
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && filteredRooms.length === 0 && (
              <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-12 text-center">
                <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  No rooms match your search
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Try changing your filter settings or clear the search query.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Rooms Cards List */}
            {!isLoading && !isError && filteredRooms.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.map((room: any) => {
                    const primaryImage =
                      room.images && room.images.length > 0
                        ? room.images[0].imageUrl
                        : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800";

                    const propertyName =
                      room.property?.title ||
                      room.property?.name ||
                      `Apartment Property ${room.propertyId?.slice(0, 4)}`;

                    return (
                      <div
                        key={room.id}
                        className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                      >
                        <div>
                          {/* Room Image */}
                          <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                            <img
                              src={primaryImage}
                              alt={`Room ${room.roomNumber}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                              ৳{room.baseRent} / month
                            </span>
                            {room.status && (
                              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                                {room.status}
                              </span>
                            )}
                          </div>

                          {/* Room Content */}
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {room.roomType}
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-gray-900 mb-0.5 line-clamp-1">
                              {propertyName}
                            </h3>

                            <p className="text-xs font-semibold text-emerald-600 mb-2">
                              Room No: {room.roomNumber}
                            </p>

                            <div className="flex items-center text-xs text-gray-500 mb-1">
                              <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600 flex-shrink-0" />
                              <span className="truncate">
                                {room.property?.address ||
                                  room.property?.city ||
                                  "Road 10, apartment Residential Area"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-5 pt-0">
                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                            <Link
                              href={`/property/${room.propertyId}`}
                              className="w-full py-2.5 text-center text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
                            >
                              View Property Details →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {meta.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-8 pb-4">
                    <button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="p-2.5 rounded-2xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>

                    <span className="text-xs font-bold text-gray-700 bg-white px-4 py-2.5 rounded-2xl border border-gray-200">
                      Page {page} of {meta.totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setPage((prev) =>
                          Math.min(prev + 1, meta.totalPages)
                        )
                      }
                      disabled={page === meta.totalPages}
                      className="p-2.5 rounded-2xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}