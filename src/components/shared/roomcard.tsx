/* eslint-disable @next/next/no-img-element */
<div className="group overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)]">
  {/* Image */}
  <div className="relative h-64 overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
      alt="Modern Living Room"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
    />

    {/* Image Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

    {/* Availability */}
    <div className="absolute left-5 top-5">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-green-600 shadow-sm backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Available
      </span>
    </div>

    {/* Favorite */}
    <button
      type="button"
      className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-red-500"
    >
      ♡
    </button>

    {/* Room Type */}
    <div className="absolute bottom-5 left-5">
      <span className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
        Premium Room
      </span>
    </div>
  </div>

  {/* Content */}
  <div className="p-6">
    {/* Title */}
    <div>
      <h3 className="text-xl font-bold tracking-tight text-gray-900">
        Modern Single Room
      </h3>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
        <span className="text-blue-600">⌖</span>
        Bashundhara R/A, Dhaka
      </p>
    </div>

    {/* Features */}
    <div className="mt-5 flex items-center gap-5 border-y border-gray-100 py-4 text-sm text-gray-600">
      <span>🛏 1 Bed</span>
      <span>🚿 1 Bath</span>
      <span>📐 450 sqft</span>
    </div>

    {/* Bottom */}
    <div className="mt-5 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-400">Monthly Rent</p>

        <p className="mt-1 text-2xl font-bold text-blue-600">
          ৳12,000
          <span className="text-sm font-normal text-gray-400"> /mo</span>
        </p>
      </div>

      <button
        type="button"
        className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600"
      >
        View Details →
      </button>
    </div>
  </div>
</div>