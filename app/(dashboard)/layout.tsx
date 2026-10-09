import Sidebar from "@/src/components/dashboard/Sidebar";
import { Role } from "@/src/constants/interface";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole: Role = "TENANT";
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Role-based Dynamic Sidebar */}
      <Sidebar role={userRole} />

      {/* Dashboard Page Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
