"use client";

import { useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useClickOutside } from "@/lib/use-click-outside";
import { formatDayName, formatDisplayDate, parseISODate, startOfDay, toISODate } from "@/lib/date";
import { cn } from "@/lib/cn";

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({
  label,
  value,
  onChange,
  minDate,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (iso: string) => void;
  minDate?: string;
  disabled?: boolean;
}) {
  const selected = value ? parseISODate(value) : null;
  const min = startOfDay(minDate ? parseISODate(minDate) : new Date());
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => selected ?? min);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const days = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const startOffset = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = Array.from({ length: startOffset }, () => null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [viewDate]);

  return (
    <div ref={ref} className="relative">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <CalendarDays size={12} />
        {label}
      </span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setViewDate(selected ?? min);
          setOpen((v) => !v);
        }}
        className={cn(
          "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          disabled ? "cursor-not-allowed bg-slate-50" : "hover:border-blue-300"
        )}
      >
        <span className={cn("block text-sm font-semibold", disabled ? "text-slate-400" : "text-slate-900")}>
          {selected ? formatDisplayDate(value) : "Select date"}
        </span>
        <span className="block truncate text-xs text-slate-400">{selected ? formatDayName(value) : " "}</span>
      </button>

      {open && !disabled && (
        <div className="absolute z-30 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          <div className="flex items-center justify-between px-1 pb-2">
            <button
              type="button"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
              className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="text-sm font-semibold text-slate-800">
              {viewDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </p>
            <button
              type="button"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
              className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 px-1 pb-1 text-center text-[11px] font-medium text-slate-400">
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 px-1">
            {days.map((date, index) => {
              if (!date) return <span key={`empty-${index}`} />;
              const isDisabled = startOfDay(date) < min;
              const isSelected = selected !== null && toISODate(date) === toISODate(selected);
              const isToday = toISODate(date) === toISODate(new Date());
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onChange(toISODate(date));
                    setOpen(false);
                  }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
                    isDisabled && "cursor-not-allowed text-slate-300",
                    !isDisabled && !isSelected && "text-slate-700 hover:bg-blue-50",
                    isSelected && "bg-blue-600 font-semibold text-white",
                    !isSelected && isToday && !isDisabled && "ring-1 ring-inset ring-blue-300"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
