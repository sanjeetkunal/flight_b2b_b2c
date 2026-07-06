"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function MonthNav() {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  return (
    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
      <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">
        <Calendar size={13} />
        {months[monthIndex]}
      </span>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setMonthIndex((i) => (i - 1 + 12) % 12)}
          aria-label="Previous month"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          <ChevronLeft size={13} />
        </button>
        <button
          type="button"
          onClick={() => setMonthIndex((i) => (i + 1) % 12)}
          aria-label="Next month"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
