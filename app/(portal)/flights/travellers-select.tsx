"use client";

import { useRef, useState } from "react";
import { ChevronDown, Minus, Plus, Users } from "lucide-react";
import { useClickOutside } from "@/lib/use-click-outside";
import { cn } from "@/lib/cn";

const cabinClasses = ["Economy", "Premium Economy", "Business", "First Class"];

export type TravellersValue = {
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
};

function CounterRow({
  label,
  sub,
  count,
  min,
  max,
  onDecrement,
  onIncrement,
}: {
  label: string;
  sub: string;
  count: number;
  min: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={count <= min}
          onClick={onDecrement}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
          aria-label={`Decrease ${label}`}
        >
          <Minus size={13} />
        </button>
        <span className="w-4 text-center text-sm font-medium text-slate-800">{count}</span>
        <button
          type="button"
          disabled={count >= max}
          onClick={onIncrement}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30"
          aria-label={`Increase ${label}`}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

export function TravellersSelect({ value, onChange }: { value: TravellersValue; onChange: (value: TravellersValue) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  const totalTravellers = value.adults + value.children + value.infants;

  return (
    <div ref={ref} className="relative">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Users size={12} />
        Travellers & Class
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-slate-900">
            {totalTravellers} Traveller{totalTravellers > 1 ? "s" : ""}
          </span>
          <span className="block truncate text-xs text-slate-400">{value.cabinClass}</span>
        </span>
        <ChevronDown size={14} className="flex-none text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          <div className="divide-y divide-slate-100">
            <CounterRow
              label="Adults"
              sub="12 yrs & above"
              count={value.adults}
              min={1}
              max={9}
              onDecrement={() =>
                onChange({ ...value, adults: value.adults - 1, infants: Math.min(value.infants, value.adults - 1) })
              }
              onIncrement={() => onChange({ ...value, adults: value.adults + 1 })}
            />
            <CounterRow
              label="Children"
              sub="2 - 12 yrs"
              count={value.children}
              min={0}
              max={8}
              onDecrement={() => onChange({ ...value, children: value.children - 1 })}
              onIncrement={() => onChange({ ...value, children: value.children + 1 })}
            />
            <CounterRow
              label="Infants"
              sub="Below 2 yrs"
              count={value.infants}
              min={0}
              max={value.adults}
              onDecrement={() => onChange({ ...value, infants: value.infants - 1 })}
              onIncrement={() => onChange({ ...value, infants: value.infants + 1 })}
            />
          </div>

          <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Cabin Class</p>
          <div className="grid grid-cols-2 gap-2">
            {cabinClasses.map((cabinClass) => (
              <button
                key={cabinClass}
                type="button"
                onClick={() => onChange({ ...value, cabinClass })}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium",
                  value.cabinClass === cabinClass ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                )}
              >
                {cabinClass}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
