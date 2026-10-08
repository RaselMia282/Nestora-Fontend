"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-blue-700 bg-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
              Nestora<span className="text-blue-200">.</span>
            </Link>
            <p className="text-sm text-blue-100 leading-relaxed">
              Find your perfect home or roommate effortlessly. Safe, verified, and reliable housing solutions for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-blue-50">
              <li>
                <Link href="/rooms" className="transition-colors hover:text-white hover:underline">
                  Find Rooms
                </Link>
              </li>
              <li>
                <Link href="/categories" className="transition-colors hover:text-white hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition-colors hover:text-white hover:underline">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-white hover:underline">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Property Types
            </h3>
            <ul className="space-y-2 text-sm text-blue-50">
              <li>
                <Link href="/rooms?type=apartment" className="transition-colors hover:text-white hover:underline">
                  Full Apartment
                </Link>
              </li>
              <li>
                <Link href="/rooms?type=single" className="transition-colors hover:text-white hover:underline">
                  Single Room
                </Link>
              </li>
              <li>
                <Link href="/rooms?type=shared" className="transition-colors hover:text-white hover:underline">
                  Shared Sublet
                </Link>
              </li>
              <li>
                <Link href="/rooms?type=hostel" className="transition-colors hover:text-white hover:underline">
                  Hostel & Mess
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-blue-50">
              <li>
                <Link href="/faq" className="transition-colors hover:text-white hover:underline">
                  FAQ & Help
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 border-t border-blue-500 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-100 gap-4">
          <p>© {new Date().getFullYear()} Nestora. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white hover:underline transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white hover:underline transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white hover:underline transition-colors">
              Support
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}