"use client";

import { useMemo, useState } from "react";
import { Armchair, CircleUserRound, MoveDiagonal, X } from "lucide-react";
import { generateSeatMap, seatTierLabels, type Seat, type SeatTier } from "@/lib/seat-meal-data";
import { formatPrice } from "../../flight-utils";
import { cn } from "@/lib/cn";
import type { MealTraveller } from "./meal-selection-step";

const tierOrder: SeatTier[] = ["extra-legroom", "business", "premium", "standard"];

const tierPresentation: Record<SeatTier, { swatch: string; icon: "diagonal" | "seat"; description: string }> = {
  business: { swatch: "bg-indigo-600", icon: "diagonal", description: "Wider seat with extra comfort and legroom" },
  "extra-legroom": { swatch: "bg-sky-950", icon: "diagonal", description: "Maximum legroom with these seats" },
  premium: { swatch: "bg-amber-400", icon: "seat", description: "Be first off the plane with these seats" },
  standard: { swatch: "bg-blue-500", icon: "seat", description: "Pick your favourite seat / avoid the middle one" },
};

const tierSeatClasses: Record<SeatTier, string> = {
  business: "border-indigo-600 bg-indigo-600 text-white hover:brightness-110",
  premium: "border-amber-400 bg-amber-400 text-amber-900 hover:brightness-105",
  "extra-legroom": "border-sky-950 bg-sky-950 text-white hover:brightness-125",
  standard: "border-blue-500 bg-blue-500 text-white hover:brightness-105",
};

export function SeatSelectionStep({
  travellers,
  selections,
  onSelect,
  flightNumber,
  cabinClass,
}: {
  travellers: MealTraveller[];
  selections: Record<number, string>;
  onSelect: (index: number, seatId: string, price: number) => void;
  flightNumber: string;
  cabinClass: string;
}) {
  const eligible = travellers.filter((t) => t.type !== "Infant");
  const infants = travellers.filter((t) => t.type === "Infant");
  const [activeIndex, setActiveIndex] = useState(eligible[0]?.index ?? 0);

  const seatRows = useMemo(() => generateSeatMap(flightNumber, cabinClass), [flightNumber, cabinClass]);
  const seatById = useMemo(() => {
    const map = new Map<string, Seat>();
    seatRows.forEach((row) => row.forEach((seat) => map.set(seat.id, seat)));
    return map;
  }, [seatRows]);

  const tierPrices = useMemo(() => {
    const map = new Map<SeatTier, number>();
    seatRows.forEach((row) =>
      row.forEach((seat) => {
        const current = map.get(seat.tier);
        if (current === undefined || seat.price < current) map.set(seat.tier, seat.price);
      })
    );
    return map;
  }, [seatRows]);

  const takenSeatIds = new Set(Object.values(selections));

  function handleSeatClick(seat: Seat) {
    if (!seat.available) return;
    if (takenSeatIds.has(seat.id) && selections[activeIndex] !== seat.id) return;
    onSelect(activeIndex, seat.id, seat.price);
    const nextTraveller = eligible.find((t) => t.index !== activeIndex && !selections[t.index]);
    if (nextTraveller) setActiveIndex(nextTraveller.index);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {eligible.map((traveller) => {
          const seatId = selections[traveller.index];
          const isActive = activeIndex === traveller.index;
          return (
            <button
              key={traveller.index}
              type="button"
              onClick={() => setActiveIndex(traveller.index)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isActive ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              <CircleUserRound size={13} />
              {traveller.name || `Traveller ${traveller.index + 1}`}
              <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-semibold", seatId ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400")}>
                {seatId ?? "No seat"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_260px]">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mx-auto mb-3 flex w-fit items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Front of aircraft
          </div>

          <div className="max-h-[440px] overflow-y-auto overflow-x-visible pt-2">
            <div className="space-y-1.5">
              {seatRows.map((row) => (
                <div key={row[0].row} className="flex items-center justify-center gap-1.5">
                  <span className="w-5 flex-none text-right text-[11px] font-medium text-slate-400">{row[0].row}</span>
                  <div className="flex items-center gap-1.5">
                    {row.map((seat, i) => {
                      const isSelected = selections[activeIndex] === seat.id;
                      const isTakenByOther = takenSeatIds.has(seat.id) && !isSelected;
                      const disabled = !seat.available || isTakenByOther;

                      let icon = seat.tier === "extra-legroom" || seat.tier === "business"
                        ? <MoveDiagonal size={12} />
                        : <Armchair size={12} />;
                      if (!seat.available) icon = <X size={13} />;
                      if (isSelected) icon = <CircleUserRound size={14} />;

                      return (
                        <span key={seat.id} className="group relative flex items-center">
                          {i > 0 && seat.col === "D" && <span className="mx-1.5 w-2" />}
                          <button
                            type="button"
                            aria-label={`${seat.id} ${seatTierLabels[seat.tier]}`}
                            disabled={disabled}
                            onClick={() => handleSeatClick(seat)}
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded border text-[9px] font-semibold transition-colors disabled:cursor-not-allowed",
                              !seat.available
                                ? "border-slate-300 bg-slate-200 text-slate-400"
                                : isSelected
                                  ? "border-emerald-600 bg-emerald-500 text-white"
                                  : isTakenByOther
                                    ? "border-slate-200 bg-slate-100 text-slate-300"
                                    : tierSeatClasses[seat.tier]
                            )}
                          >
                            {icon}
                          </button>
                          {seat.available && !isTakenByOther && (
                            <div className="pointer-events-none absolute -top-11 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center group-hover:flex group-focus-within:flex">
                              <div className="whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-center text-[10px] font-semibold leading-tight text-white shadow-lg">
                                <div>{seat.id} · {seatTierLabels[seat.tier]}</div>
                                {seat.price > 0 && <div className="font-normal text-slate-300">+{formatPrice(seat.price)}</div>}
                              </div>
                              <div className="-mt-1 h-2 w-2 rotate-45 bg-slate-900" />
                            </div>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">
            {tierOrder
              .filter((tier) => tierPrices.has(tier))
              .map((tier) => {
                const presentation = tierPresentation[tier];
                const price = tierPrices.get(tier) ?? 0;
                return (
                  <div key={tier} className="flex items-start gap-3 p-3">
                    <span className={cn("flex h-8 w-8 flex-none items-center justify-center rounded-md text-white", presentation.swatch)}>
                      {presentation.icon === "diagonal" ? <MoveDiagonal size={14} /> : <Armchair size={14} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-800">{seatTierLabels[tier]}</p>
                      <p className="text-[11px] leading-snug text-slate-500">{presentation.description}</p>
                    </div>
                    <div className="flex-none text-right">
                      <p className="text-[9px] uppercase tracking-wide text-slate-400">from</p>
                      <p className="text-sm font-bold text-slate-900">{price > 0 ? formatPrice(price) : "Free"}</p>
                    </div>
                  </div>
                );
              })}
            <div className="flex items-center gap-4 p-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-slate-200 text-slate-400">
                  <X size={11} />
                </span>
                Reserved
              </span>
              <span className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded border border-emerald-600 bg-emerald-500 text-white">
                  <CircleUserRound size={11} />
                </span>
                Selected Seat
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Your Seat Selections</p>
            <div className="mt-3 space-y-2">
              {eligible.map((traveller) => {
                const seatId = selections[traveller.index];
                const seat = seatId ? seatById.get(seatId) : undefined;
                return (
                  <div key={traveller.index} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                    <span className="font-medium text-slate-700">{traveller.name || `Traveller ${traveller.index + 1}`}</span>
                    {seat ? (
                      <span className="font-semibold text-slate-900">
                        {seat.id} {seat.price > 0 && <span className="text-blue-600">+{formatPrice(seat.price)}</span>}
                      </span>
                    ) : (
                      <span className="text-slate-400">Not selected</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {infants.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-500">
              {infants.length} infant{infants.length > 1 ? "s" : ""} travel on an adult&apos;s lap and don&apos;t require a seat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
