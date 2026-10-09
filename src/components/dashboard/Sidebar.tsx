"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Role } from '@/src/constants/interface';
import { SidebarItems } from '@/src/constants/sidebarItems';


interface SidebarProps {
  role: Role;
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const navItems = SidebarItems[role] || [];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4 flex flex-col justify-between min-h-screen">
      <div>
        {/* Brand Logo */}
        <div className="mb-8 px-2">
          <Link href="/" className="text-xl font-bold text-emerald-600">
            Nestora
          </Link>
          <span className="ml-2 text-xs font-semibold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            {role}
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Role Footer */}
      <div className="border-t border-slate-100 pt-4 px-2">
        <p className="text-xs text-slate-400">Logged in as</p>
        <p className="text-sm font-bold text-slate-700 capitalize">{role?.toLowerCase()}</p>
      </div>
    </aside>
  );
};

export default Sidebar;