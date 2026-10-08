/* eslint-disable @next/next/no-img-element */
"use client"
import { useCategories } from "@/src/feature/property-categories/api/categories";
import { ArrowUpRight } from "lucide-react";

const Categories = () => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-red-500 font-medium">
        Something went wrong while fetching categories.
      </p>
    );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
          Explore Choices
        </span>
        <h2 className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Popular Categories
        </h2>
        <p className="mt-2 text-sm text-gray-500 max-w-xl">
          Find the best rooms and spaces suited to your needs.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.data?.map((category: any) => (
          <div
            key={ category.id}
            className="group relative h-80 w-full overflow-hidden rounded-2xl bg-gray-900 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={
                category.categoryImg
                
              }
              alt={category.name || "Category"}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-85 group-hover:opacity-95"
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />

            {/* Top Right Action Icon */}
            <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition-all duration-300 group-hover:bg-emerald-600 group-hover:scale-110">
              <ArrowUpRight className="h-5 w-5" />
            </div>

            {/* Bottom Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
              <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                {category.name}
              </h3>

              {category.description && (
                <p className="mt-2 text-xs leading-relaxed text-gray-300 line-clamp-2 opacity-90">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;