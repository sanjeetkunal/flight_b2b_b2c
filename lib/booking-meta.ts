import { Plane, Building2, Palmtree, TrainFront, Zap, type LucideIcon } from "lucide-react";
import type { BookingStatus, BookingType } from "@/lib/mock-data";
import type { ModuleKey } from "@/lib/module-theme";

export const bookingTypeIcon: Record<BookingType, LucideIcon> = {
  Flight: Plane,
  Hotel: Building2,
  Holiday: Palmtree,
  Railway: TrainFront,
  Utility: Zap,
};

export const bookingTypeModule: Record<BookingType, ModuleKey> = {
  Flight: "flights",
  Hotel: "hotels",
  Holiday: "holidays",
  Railway: "railway",
  Utility: "utility",
};

export const bookingStatusTone: Record<BookingStatus, "success" | "warning" | "danger"> = {
  Confirmed: "success",
  Pending: "warning",
  Cancelled: "danger",
};
