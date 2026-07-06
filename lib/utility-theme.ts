import { Car, Droplet, Flame, Shield, Smartphone, Tv, Wifi, Zap, type LucideIcon } from "lucide-react";

export const utilityCategoryStyles: Record<
  string,
  { icon: LucideIcon; iconBg: string; activeBorder: string; activeIconBg: string }
> = {
  "Mobile Recharge": {
    icon: Smartphone,
    iconBg: "bg-blue-50 text-blue-600",
    activeBorder: "border-blue-500 bg-blue-50/60 ring-1 ring-blue-500",
    activeIconBg: "bg-blue-600 text-white",
  },
  "DTH Recharge": {
    icon: Tv,
    iconBg: "bg-purple-50 text-purple-600",
    activeBorder: "border-purple-500 bg-purple-50/60 ring-1 ring-purple-500",
    activeIconBg: "bg-purple-600 text-white",
  },
  "Electricity Bill": {
    icon: Zap,
    iconBg: "bg-amber-50 text-amber-600",
    activeBorder: "border-amber-500 bg-amber-50/60 ring-1 ring-amber-500",
    activeIconBg: "bg-amber-600 text-white",
  },
  "Water Bill": {
    icon: Droplet,
    iconBg: "bg-cyan-50 text-cyan-600",
    activeBorder: "border-cyan-500 bg-cyan-50/60 ring-1 ring-cyan-500",
    activeIconBg: "bg-cyan-600 text-white",
  },
  "Broadband / Landline": {
    icon: Wifi,
    iconBg: "bg-indigo-50 text-indigo-600",
    activeBorder: "border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-500",
    activeIconBg: "bg-indigo-600 text-white",
  },
  "LPG Booking": {
    icon: Flame,
    iconBg: "bg-orange-50 text-orange-600",
    activeBorder: "border-orange-500 bg-orange-50/60 ring-1 ring-orange-500",
    activeIconBg: "bg-orange-600 text-white",
  },
  "FASTag Recharge": {
    icon: Car,
    iconBg: "bg-teal-50 text-teal-600",
    activeBorder: "border-teal-500 bg-teal-50/60 ring-1 ring-teal-500",
    activeIconBg: "bg-teal-600 text-white",
  },
  "Insurance Premium": {
    icon: Shield,
    iconBg: "bg-emerald-50 text-emerald-600",
    activeBorder: "border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500",
    activeIconBg: "bg-emerald-600 text-white",
  },
};
