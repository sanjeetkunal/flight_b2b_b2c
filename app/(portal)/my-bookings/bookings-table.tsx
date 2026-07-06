"use client";

import { useMemo, useState } from "react";
import { Building2, Palmtree, Plane, Search, TrainFront, Zap } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { moduleTheme } from "@/lib/module-theme";
import { recentBookings, type BookingStatus, type BookingType } from "@/lib/mock-data";

const bookingTypeIcon: Record<BookingType, typeof Plane> = {
  Flight: Plane,
  Hotel: Building2,
  Holiday: Palmtree,
  Railway: TrainFront,
  Utility: Zap,
};

const bookingTypeModule: Record<BookingType, keyof typeof moduleTheme> = {
  Flight: "flights",
  Hotel: "hotels",
  Holiday: "holidays",
  Railway: "railway",
  Utility: "utility",
};

const statusTone: Record<BookingStatus, "success" | "warning" | "danger"> = {
  Confirmed: "success",
  Pending: "warning",
  Cancelled: "danger",
};

const statusFilters: (BookingStatus | "All")[] = ["All", "Confirmed", "Pending", "Cancelled"];

export function BookingsTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof statusFilters)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recentBookings.filter((booking) => {
      const matchesStatus = status === "All" || booking.status === status;
      const matchesQuery =
        !q ||
        booking.reference.toLowerCase().includes(q) ||
        booking.customer.toLowerCase().includes(q) ||
        booking.detail.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                status === option ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reference or customer"
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Reference</th>
              <th className="px-5 py-3 font-medium">Type</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Detail</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => {
              const Icon = bookingTypeIcon[booking.type];
              const theme = moduleTheme[bookingTypeModule[booking.type]];
              return (
                <tr key={booking.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{booking.reference}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-md ${theme.light} ${theme.text}`}>
                        <Icon size={13} />
                      </span>
                      {booking.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{booking.customer}</td>
                  <td className="px-5 py-3.5 text-slate-500">{booking.detail}</td>
                  <td className="px-5 py-3.5 text-slate-500">{booking.date}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{booking.amount}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone={statusTone[booking.status]}>{booking.status}</Badge>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">
                  No bookings match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
