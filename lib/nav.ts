import {
  ClipboardList,
  Home,
  LayoutDashboard,
  Plane,
  Building2,
  Palmtree,
  Zap,
  TrainFront,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

// Module list backing the home page's hero search tabs (Flights/Hotels/Holidays/Railway/Utility).
export const navItems: NavItem[] = [
  { label: "Home", href: "/home", icon: LayoutDashboard, description: "Overview & insights" },
  { label: "Flights", href: "/flights", icon: Plane, description: "Search & book flights" },
  { label: "Hotels", href: "/hotels", icon: Building2, description: "Domestic & international stays" },
  { label: "Holidays", href: "/holidays", icon: Palmtree, description: "Curated holiday packages" },
  { label: "Railway", href: "/railway", icon: TrainFront, description: "Train search & PNR status" },
  { label: "Utility", href: "/utility", icon: Zap, description: "Bill payments & recharges" },
];

// Primary links shown in the header.
export const topNavItems: NavItem[] = [
  { label: "Home", href: "/home", icon: Home, description: "Overview & insights" },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Analytics & booking activity" },
  { label: "My Bookings", href: "/my-bookings", icon: ClipboardList, description: "All your bookings in one place" },
];
