"use client";

import type { ReactNode } from "react";
import { ChevronDown, Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { formatPrice, timeSlotBuckets, type TimeSlotKey } from "./flight-utils";
import { cn } from "@/lib/cn";

export type FlightFiltersState = {
  airlines: string[];
  priceMin: number;
  priceMax: number;
  refundability: string[];
  layover: string[];
  timeSlots: TimeSlotKey[];
};

const refundabilityOptions = ["Non Refundable", "Partially Refundable", "Rules Wise"];

const slotIcons: Record<TimeSlotKey, typeof Sunrise> = {
  night: Moon,
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <ChevronDown size={15} className="text-slate-400" />
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function FlightFilters({
  state,
  onChange,
  priceBounds,
  countdownLabel,
  availableAirlines,
  availableLayoverCities,
}: {
  state: FlightFiltersState;
  onChange: (next: FlightFiltersState) => void;
  priceBounds: { min: number; max: number };
  countdownLabel: string;
  availableAirlines: { name: string; price: string }[];
  availableLayoverCities: string[];
}) {
  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
        <p className="text-xs font-medium text-amber-700">Time Remaining</p>
        <p className="mt-0.5 text-xl font-bold tabular-nums text-amber-900">{countdownLabel}</p>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4">
        <FilterSection title="Price Range">
          <p className="text-xs text-slate-500">
            Start from {formatPrice(priceBounds.min)} - {formatPrice(priceBounds.max)} against your search. Choose your price.
          </p>
          <div className="relative mt-5 h-1.5 rounded-full bg-slate-100">
            <div
              className="absolute inset-y-0 rounded-full bg-blue-600"
              style={{
                left: `${((state.priceMin - priceBounds.min) / (priceBounds.max - priceBounds.min || 1)) * 100}%`,
                right: `${100 - ((state.priceMax - priceBounds.min) / (priceBounds.max - priceBounds.min || 1)) * 100}%`,
              }}
            />
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={50}
              value={state.priceMin}
              onChange={(e) => onChange({ ...state, priceMin: Math.min(Number(e.target.value), state.priceMax) })}
              className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow"
            />
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={50}
              value={state.priceMax}
              onChange={(e) => onChange({ ...state, priceMax: Math.max(Number(e.target.value), state.priceMin) })}
              className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-600 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow"
            />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700">
              {formatPrice(state.priceMin)}
            </span>
            <span className="text-xs text-slate-400">to</span>
            <span className="flex-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700">
              {formatPrice(state.priceMax)}
            </span>
          </div>
        </FilterSection>

        <FilterSection title="Airlines">
          <div className="space-y-2.5">
            {availableAirlines.map((airline) => (
              <label key={airline.name} className="flex cursor-pointer items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state.airlines.includes(airline.name)}
                    onChange={() => onChange({ ...state, airlines: toggle(state.airlines, airline.name) })}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  />
                  <span className="text-sm text-slate-600">{airline.name}</span>
                </span>
                <span className="text-xs text-slate-400">{airline.price}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Departure Time">
          <div className="grid grid-cols-4 gap-2">
            {timeSlotBuckets.map((slot) => {
              const Icon = slotIcons[slot.key];
              const active = state.timeSlots.includes(slot.key);
              return (
                <button
                  key={slot.key}
                  type="button"
                  onClick={() => onChange({ ...state, timeSlots: toggle(state.timeSlots, slot.key) })}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border py-2.5",
                    active ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
                  )}
                  aria-label={slot.label}
                  title={slot.label}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Refundability">
          <div className="space-y-2.5">
            {refundabilityOptions.map((label) => (
              <label key={label} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={state.refundability.includes(label)}
                  onChange={() => onChange({ ...state, refundability: toggle(state.refundability, label) })}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                />
                <span className="text-sm text-slate-600">{label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {availableLayoverCities.length > 0 && (
          <div className="pb-1 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Layover City</h3>
              <ChevronDown size={15} className="text-slate-400" />
            </div>
            <div className="mt-3 space-y-2.5">
              {availableLayoverCities.map((city) => (
                <label key={city} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state.layover.includes(city)}
                    onChange={() => onChange({ ...state, layover: toggle(state.layover, city) })}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                  />
                  <span className="text-sm text-slate-600">{city}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {(state.airlines.length > 0 ||
          state.refundability.length > 0 ||
          state.layover.length > 0 ||
          state.timeSlots.length > 0 ||
          state.priceMin > priceBounds.min ||
          state.priceMax < priceBounds.max) && (
          <div className="border-t border-slate-100 py-3">
            <button
              type="button"
              onClick={() =>
                onChange({ airlines: [], priceMin: priceBounds.min, priceMax: priceBounds.max, refundability: [], layover: [], timeSlots: [] })
              }
              className="text-xs font-medium text-rose-600 hover:text-rose-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
