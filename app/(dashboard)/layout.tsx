// import Sidebar from "@/src/components/dashboard/Sidebar";
// import { Role } from "@/src/constants/interface";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const userRole: Role = "TENANT";
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Role-based Dynamic Sidebar */}
//       <Sidebar role={userRole} />

//       {/* Dashboard Page Content */}
//       <main className="flex-1 p-8 overflow-y-auto">{children}</main>
//     </div>
//   );
// }



"use client";

import Sidebar from "@/src/components/dashboard/Sidebar";
import { useAuthStore } from "@/src/store/authStore";
// import { useAuthStore } from "@/src/store/auth-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">
          Please log in to access your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role={user.role} />

      <main className="min-w-0 flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}