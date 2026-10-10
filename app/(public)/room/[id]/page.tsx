"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  BedDouble,
  Heart,
  Share2,
  CheckCircle2,
  Building2,
  ArrowLeft,
  Calendar,
  Sparkles,
  Send,
} from "lucide-react";
import { useGetSingleRoom } from "@/src/feature/room/api/singleroom";
import BookingModal from "@/src/components/modals/BookingsModal";
import { useSubmitIdentityVerification } from "@/src/feature/application/application";
import { apiClient } from "@/src/lib/ofetch";

export default function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: roomResponse, isLoading, isError } = useGetSingleRoom(id);

  // Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // TanStack Query Mutation Hook for NID Verification
  const { mutateAsync: submitVerification } = useSubmitIdentityVerification();

  // Exact data mapping according to API response structure
  const room = roomResponse?.data;
  const property = room?.property;
  const roomImages = room?.images || [];

  // Verification & Room Application Submission Handler
  const handleVerificationSubmit = async (formData: FormData) => {
    try {
      // Step 1: Submit NID Verification (Already verified হলে এরর ইগনোর করবে)
      try {
        await submitVerification(formData);
      } catch (verifErr) {
        console.log("Verification note or already exists:", verifErr);
      }

      // Step 2: Directly submit Room Application to backend
      const applicationRes = await apiClient("/application", {
        method: "POST",
        body: {
          roomId: room.id,
        },
      });

      console.log("Application Submitted Response:", applicationRes);
      alert("Room Application submitted successfully!");
      setIsBookingModalOpen(false);
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert(error?.message || "Failed to submit room application.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (isError || !room) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Room details not found
        </h2>
        <p className="mt-2 text-slate-500">
          The requested room could not be loaded or doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    );
  }

  // Combine primary room image, secondary room images, and property image for gallery
  const mainImage = roomImages[0]?.imageUrl || property?.propertyImg;
  const secondaryImage = roomImages[1]?.imageUrl || property?.propertyImg;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Header Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-red-500 cursor-pointer"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Image Gallery */}
      <div className="grid gap-4 overflow-hidden rounded-3xl md:grid-cols-3">
        <div className="relative h-80 md:col-span-2 md:h-105">
          {mainImage && (
            <Image
              src={mainImage}
              alt={`Room ${room.roomNumber}`}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4" /> Verified Residence
          </div>
        </div>

        <div className="hidden grid-cols-1 gap-4 md:grid">
          {secondaryImage && (
            <div className="relative h-50 w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={secondaryImage}
                alt="Room secondary view"
                fill
                className="object-cover"
              />
            </div>
          )}

          {property?.propertyImg && (
            <div className="relative h-50 w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={property.propertyImg}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left Column: Room & Property Information */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {room.roomType} Room
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" /> {room.status}
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Room #{room.roomNumber} - {property?.title}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                {property?.address}, {property?.city}
              </span>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-slate-100 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <BedDouble className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Room Type</p>
                <p className="text-sm font-bold text-slate-900 uppercase">
                  {room.roomType}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Property</p>
                <p className="text-sm font-bold text-slate-900">
                  {property?.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">
                  Availability
                </p>
                <p className="text-sm font-bold text-slate-900">
                  Immediate Move-in
                </p>
              </div>
            </div>
          </div>

          {/* Property Description */}
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              About this Residence
            </h3>
            <p className="mt-3 leading-relaxed text-slate-600 text-sm">
              {property?.description ||
                "A comfortable residence located in a convenient area with modern facilities."}
            </p>
          </div>
        </div>

        {/* Right Column: Clean Sidebar Card with Booking Action */}
        <div>
          <div className="sticky top-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Monthly Rent
              </span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  ৳{room.baseRent}
                </span>
                <span className="text-sm font-medium text-slate-500">
                  / month
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full rounded-xl bg-emerald-600 py-3.5 text-center text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Apply for Booking
            </button>

            {/* Value Guarantees */}
            <div className="border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Zero Hidden Application Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Verified Landlord Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Instant NID Verification System</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Integration */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSubmitVerification={handleVerificationSubmit}
        monthlyRent={room.baseRent}
        roomNumber={room.roomNumber}
      />
    </main>
  );
}