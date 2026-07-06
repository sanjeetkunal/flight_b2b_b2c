"use client";

import { useState } from "react";
import { Plane } from "lucide-react";
import { recentBookings, type BookingType } from "@/lib/mock-data";
import { bookingTypeIcon, bookingTypeModule } from "@/lib/booking-meta";
import { moduleTheme } from "@/lib/module-theme";
import { cn } from "@/lib/cn";

const tabs = ["All", "Flight", "Hotel"] as const;

const statusPillClasses: Record<string, string> = {
  Confirmed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-rose-50 text-rose-700",
};

function parseFlightRoute(detail: string): { from: string; to: string } | null {
  const arrowIndex = detail.indexOf("→");
  if (arrowIndex === -1) return null;
  const from = detail.slice(0, arrowIndex).trim();
  const rest = detail.slice(arrowIndex + 1).trim();
  const dotIndex = rest.indexOf("·");
  const to = (dotIndex === -1 ? rest : rest.slice(0, dotIndex)).trim();
  return { from, to };
}

export function TicketBoard() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All");

  const filtered = recentBookings.filter((booking) => activeTab === "All" || booking.type === (activeTab as BookingType));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <h2 className="text-sm font-semibold text-slate-900">Tickets</h2>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-400">
          No {activeTab.toLowerCase()} bookings yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((booking) => {
            const Icon = bookingTypeIcon[booking.type];
            const theme = moduleTheme[bookingTypeModule[booking.type]];
            const route = booking.type === "Flight" ? parseFlightRoute(booking.detail) : null;

            return (
              <div key={booking.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">#{booking.reference}</span>
                  <span className={cn("flex h-6 w-6 items-center justify-center rounded-md", theme.light, theme.text)}>
                    <Icon size={13} />
                  </span>
                </div>

                {route ? (
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">From</p>
                      <p className="text-lg font-bold text-slate-900">{route.from}</p>
                    </div>
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Plane size={13} />
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">To</p>
                      <p className="text-lg font-bold text-slate-900">{route.to}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 line-clamp-2 text-sm font-medium text-slate-700">{booking.detail}</p>
                )}

                <p className="mt-1.5 truncate text-xs text-slate-400">{booking.customer}</p>

                <div className="mt-3 flex items-center justify-between border-t border-dashed border-slate-200 pt-3 text-xs">
                  <div>
                    <p className="text-slate-400">Payment</p>
                    <span className={cn("mt-0.5 inline-flex rounded-full px-2 py-0.5 font-semibold", statusPillClasses[booking.status])}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400">Date</p>
                    <p className="font-medium text-slate-700">{booking.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
