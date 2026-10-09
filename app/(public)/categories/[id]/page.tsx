"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { useGetSingleCategory } from "@/src/feature/property-categories/api/singlecategories";


export default function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { data: categoryResponse, isLoading, isError } = useGetSingleCategory(id);

  // Extracting data based on API response: categoryResponse.data
  const categoryData = categoryResponse?.data;
  const properties = categoryData?.properties || [];

  const categoryTitle = categoryData?.name || "Category Properties";
  const categoryDescription =
    categoryData?.description ||
    "Explore all verified properties listed under this category.";

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        Failed to load category properties. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/categories"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Categories
      </Link>

      {/* Category Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          <Building2 className="w-3.5 h-3.5" />
          {categoryTitle}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Residences in {categoryTitle}
        </h1>
        <p className="text-gray-600 max-w-2xl">{categoryDescription}</p>
      </div>

      {/* Properties Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <div
              key={property.id}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                <img
                  src={
                    property.propertyImg ||
                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {property.address}, {property.city}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {property.description}
                </p>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/property/${property.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-3xl p-12 text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No properties found
          </h3>
          <p className="text-sm text-gray-500">
            There are currently no active properties listed in this category.
          </p>
        </div>
      )}
    </div>
  );
}