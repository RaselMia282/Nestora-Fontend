import { ElementType } from "react";

export type Role = "ADMIN" | "OWNER" | "TENANT";

export interface SidebarItem {
  title: string;
  href: string;
  icon: ElementType;
}