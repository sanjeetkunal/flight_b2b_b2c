"use client";

import { useMemo, useRef, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useClickOutside } from "@/lib/use-click-outside";
import { airports, type Airport } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export function CitySelect({
  label,
  value,
  onChange,
  exclude,
}: {
  label: string;
  value: Airport;
  onChange: (airport: Airport) => void;
  exclude?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setOpen(false);
    setQuery("");
  });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return airports.filter((airport) => {
      if (airport.code === exclude) return false;
      if (!q) return true;
      return (
        airport.city.toLowerCase().includes(q) ||
        airport.code.toLowerCase().includes(q) ||
        airport.name.toLowerCase().includes(q)
      );
    });
  }, [query, exclude]);

  return (
    <div ref={containerRef} className="relative">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <MapPin size={12} />
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <span className="block font-semibold text-slate-900">
          {value.city} <span className="font-normal text-slate-400">({value.code})</span>
        </span>
        <span className="block truncate text-xs text-slate-400">{value.name}</span>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or airport"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <p className="mb-1.5 mt-3 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            {query ? `Results (${results.length})` : "Popular Cities"}
          </p>
          <div className="max-h-64 overflow-y-auto">
            {results.length === 0 && <p className="px-2 py-4 text-center text-xs text-slate-400">No cities found</p>}
            {results.map((airport) => (
              <button
                key={airport.code}
                type="button"
                onClick={() => {
                  onChange(airport);
                  setOpen(false);
                  setQuery("");
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-blue-50",
                  value.code === airport.code && "bg-blue-50"
                )}
              >
                <span>
                  <span className="block text-sm font-medium text-slate-800">
                    {airport.city}, {airport.country}
                  </span>
                  <span className="block text-xs text-slate-400">{airport.name}</span>
                </span>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-600">{airport.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
