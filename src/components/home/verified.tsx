"use client";

import { Heart, MapPin, ShieldCheck, BedDouble } from "lucide-react";
import Image from "next/image";

import { useGetAllRoom } from "@/src/feature/room/api/room";
import Link from "next/link";

const Verified = () => {
  const { data: rooms, isLoading, isError } = useGetAllRoom();

  const roomList = rooms?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-10 text-center font-medium text-red-500">
        Something went wrong while fetching rooms.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>100% Verified Listings</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Featured Verified Residences
        </h2>

        <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500 sm:text-base">
          Discover verified rooms with comfortable spaces, trusted listings, and
          transparent pricing.
        </p>
      </div>

      {/* Empty State */}
      {roomList.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
          <p className="text-sm font-medium text-slate-500">
            No verified rooms available at the moment.
          </p>
        </div>
      ) : (
        /* Room Cards */
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {roomList.slice(0, 3).map((room: any) => (
            <div
              key={room.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                {room.images?.[0]?.imageUrl && (
                  <Image
                    src={room.images[0].imageUrl}
                    alt={`Room ${room.roomNumber}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}

                {/* Verified Badge */}
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur">
                  <ShieldCheck className="h-4 w-4" />
                  Verified
                </div>

                {/* Favorite */}
                <button
                  type="button"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
                >
                  <Heart className="h-5 w-5" />
                </button>

                {/* Rent */}
                <div className="absolute bottom-4 left-4 rounded-xl bg-slate-900/90 px-4 py-2 text-white backdrop-blur">
                  <span className="text-lg font-bold">৳{room.baseRent}</span>
                  <span className="ml-1 text-xs text-slate-300">/ month</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Room Type */}
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  {room.roomType}
                </span>

                {/* Room Number */}
                <h3 className="mt-1 line-clamp-1 text-xl font-bold text-slate-900">
                  Room {room.roomNumber}
                </h3>

                {/* Location */}
                <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="line-clamp-1">Dhaka, Bangladesh</span>
                </div>

                {/* Features */}
                <div className="mt-5 flex items-center gap-5 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <BedDouble className="h-4 w-4 text-slate-400" />
                    <span>{room.roomType} Room</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>{room.status}</span>
                  </div>
                </div>

                {/* Button */}
                <Link href={`/room/${room.id}`}>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    View Room Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Verified;
