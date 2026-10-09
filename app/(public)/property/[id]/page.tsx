"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  Wifi,
  ShieldCheck,
  Zap,
  Car,
  User,
  PhoneCall,
  Mail,
  Share2,
  Heart,
} from "lucide-react";
import { useGetSingleProperty } from "@/src/feature/property/singleproperty";


export default function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { data: response, isLoading, isError } = useGetSingleProperty(id);

  const property = response?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-6 max-w-6xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-[400px] bg-gray-200 rounded-3xl w-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500 font-medium">
        Failed to load property details. Please try again later.
      </div>
    );
  }

  // Sample static features for UI richness
  const features = [
    { icon: Wifi, label: "High Speed Wi-Fi" },
    { icon: ShieldCheck, label: "24/7 Security & CCTV" },
    { icon: Zap, label: "24/7 Power Backup" },
    { icon: Car, label: "Dedicated Parking" },
  ];

  return (
    <div className="bg-gray-50/50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/home"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>

          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer">
              <Heart className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Main Property Image Header */}
        <div className="relative h-80 md:h-[420px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-sm mb-8">
          <img
            src={
              property.propertyImg ||
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800"
            }
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Property Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-2xs">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                {property.category && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Building2 className="w-3.5 h-3.5" />
                    {property.category.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Listing
                </span>
              </div>

              {/* Title & Address */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-500 text-sm md:text-base">
                <MapPin className="w-4 h-4 mr-1.5 text-emerald-600 flex-shrink-0" />
                <span>
                  {property.address}, {property.city}
                </span>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  About this property
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {property.description ||
                    "No detailed description provided for this property listing."}
                </p>
              </div>

              {/* Key Amenities Grid */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Amenities & Facilities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {features.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100/80"
                      >
                        <div className="p-2 bg-white rounded-xl shadow-2xs">
                          <Icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Listing Details Card */}
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-2xs">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Listing Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Date Posted
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(property.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <User className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      Property ID
                    </p>
                    <p className="text-xs font-mono font-semibold text-gray-800 truncate max-w-[180px]">
                      {property.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Booking Card */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm sticky top-6">
              <div className="mb-6">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Rental Price
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-emerald-600">
                    ৳15,000
                  </span>
                  <span className="text-sm text-gray-500">/ month</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Request Booking
                </button>
                <button className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-2xl border border-emerald-200 transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Owner
                </button>
              </div>

              {/* Owner Info Box */}
              <div className="pt-5 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  NO
                </div>
                <div>
                  <p className="text-xs text-gray-500">Listed by</p>
                  <p className="text-sm font-semibold text-gray-900">
                    Nestora Owner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}