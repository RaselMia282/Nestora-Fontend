import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  FileText,
  CreditCard,
  Home,
  Users,
} from "lucide-react";
import { Role, SidebarItem } from "./interface";

export const SidebarItems: Record<Role, SidebarItem[]> = {
  ADMIN: [
    {
      title: "Overview",
      href: "/admin/overview",
      icon: LayoutDashboard,
    },
    {
      title: "NID Verifications",
      href: "/admin/verifications",
      icon: ShieldCheck,
    },
    {
      title: "Properties",
      href: "/admin/properties",
      icon: Building2,
    },
    {
      title: "Users Management",
      href: "/admin/users",
      icon: Users,
    },
  ],
  OWNER: [
    {
      title: "Overview",
      href: "/owner/overview",
      icon: LayoutDashboard,
    },
    // {
    //   title: "My Properties",
    //   href: "/owner/properties",
    //   icon: Home,
    // },
    // {
    //   title: "Booking Requests",
    //   href: "/owner/applications",
    //   icon: FileText,
    // },
  ],
  TENANT: [
    {
      title: "Overview",
      href: "/tenant/overview",
      icon: LayoutDashboard,
    },
    {
      title: "My Applications",
      href: "/tenant/application",
      icon: FileText,
    },
    {
      title: "Payment History",
      href: "/tenant/payments",
      icon: CreditCard,
    },
  ],
};
