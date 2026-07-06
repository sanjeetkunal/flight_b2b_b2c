"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { recentBookings } from "@/lib/mock-data";
import { bookingTypeIcon, bookingTypeModule, bookingStatusTone } from "@/lib/booking-meta";
import { moduleTheme } from "@/lib/module-theme";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/cn";

const perPageOptions = [3, 5, 10];

export function BookingHistory() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const totalPages = Math.max(1, Math.ceil(recentBookings.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paged = recentBookings.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-slate-900">Booking History</h2>
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
            {paged.map((booking) => {
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
                    <Badge tone={bookingStatusTone[booking.status]}>{booking.status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
        <label className="flex items-center gap-2">
          Result per page:
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-md border border-slate-200 px-2 py-1 text-slate-700 focus:border-blue-400 focus:outline-none"
          >
            {perPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={cn(
                "h-7 w-7 rounded-full text-xs font-semibold",
                p === currentPage ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100"
              )}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
