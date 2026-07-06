"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  Gauge,
  IndianRupee,
  Info,
  Layers,
  Luggage,
  Percent,
  Plane,
  Share2,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { airlineLogos, flightFareCalendar, flightSearchResults } from "@/lib/mock-data";
import { cn } from "@/lib/cn";
import { FlightFilters, type FlightFiltersState } from "./flight-filters";
import { FlightDetailTabs } from "./flight-detail-tabs";
import { FareOptionsDialog } from "./fare-options-dialog";
import {
  buildWhatsAppShareMessage,
  buildWhatsAppShareUrl,
  extractLayoverCode,
  formatPrice,
  parseCityLabel,
  parseDurationMinutes,
  parsePrice,
  parseTimeMinutes,
  timeSlotForDeparture,
} from "./flight-utils";

type SortKey = "earliest" | "fastest" | "cheapest";

const tagStyles: Record<string, string> = {
  "Super Deal": "bg-fuchsia-600 text-white",
  Recommended: "bg-blue-600 text-white",
  "Lowest Price": "bg-cyan-600 text-white",
};

const promoBanners = [
  { title: "FLAT 10% OFF", subtitle: "10% Discount for OrbitTravel Card Holder", gradient: "from-blue-600 to-blue-500" },
  { title: "FLAT 20% OFF", subtitle: "20% Discount for OrbitTravel Card Holder", gradient: "from-emerald-600 to-teal-500" },
  { title: "FLAT 20% OFF", subtitle: "20% Discount for OrbitTravel Card Holder", gradient: "from-violet-600 to-fuchsia-600" },
];

const baseDateIndex = Math.max(
  flightFareCalendar.findIndex((day) => day.selected),
  0
);
const basePrice = parsePrice(flightFareCalendar[baseDateIndex].price);

const rawPrices = flightSearchResults.map((flight) => parsePrice(flight.price));
const priceBounds = { min: Math.min(...rawPrices), max: Math.max(...rawPrices) };

const availableAirlines = Array.from(new Set(flightSearchResults.map((flight) => flight.airline))).map((name) => {
  const cheapest = Math.min(...flightSearchResults.filter((flight) => flight.airline === name).map((flight) => parsePrice(flight.price)));
  return { name, price: formatPrice(cheapest) };
});

const availableLayoverCities = Array.from(
  new Set(flightSearchResults.map((flight) => extractLayoverCode(flight.stops)).filter((code): code is string => Boolean(code)))
);

export function FlightResults({ fromCity, toCity }: { fromCity: string; toCity: string; date: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromCode = parseCityLabel(fromCity).code;
  const toCode = parseCityLabel(toCity).code;
  const [filters, setFilters] = useState<FlightFiltersState>({
    airlines: [],
    priceMin: priceBounds.min,
    priceMax: priceBounds.max,
    refundability: [],
    layover: [],
    timeSlots: [],
  });
  const [sortBy, setSortBy] = useState<SortKey>("fastest");
  const [dateIndex, setDateIndex] = useState(baseDateIndex);
  const [expandedFlight, setExpandedFlight] = useState<string | null>(null);
  const [selectedFlights, setSelectedFlights] = useState<Set<string>>(new Set());
  const [showCommission, setShowCommission] = useState(false);
  const [moreFaresFlight, setMoreFaresFlight] = useState<string | null>(null);
  const [showAllFares, setShowAllFares] = useState(false);

  function handleBookNow(flightNumber: string, displayPrice: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("flightNumber", flightNumber);
    params.set("price", String(displayPrice));
    router.push(`/flights/results/book?${params.toString()}`);
  }

  function toggleFlightSelection(flightNumber: string) {
    setSelectedFlights((prev) => {
      const next = new Set(prev);
      if (next.has(flightNumber)) next.delete(flightNumber);
      else next.add(flightNumber);
      return next;
    });
  }

  const priceRatio = parsePrice(flightFareCalendar[dateIndex].price) / (basePrice || 1);

  const priced = useMemo(
    () =>
      flightSearchResults.map((flight) => ({
        ...flight,
        displayPrice: Math.round(parsePrice(flight.price) * priceRatio),
        fareOptions: flight.fareOptions.map((fare) => ({
          ...fare,
          displayPrice: Math.round(parsePrice(fare.price) * priceRatio),
        })),
      })),
    [priceRatio]
  );

  const filtered = useMemo(
    () =>
      priced.filter((flight) => {
        if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false;
        if (flight.displayPrice < filters.priceMin || flight.displayPrice > filters.priceMax) return false;
        if (filters.refundability.length > 0) {
          const wantsNonRefundable = filters.refundability.includes("Non Refundable");
          const wantsRefundable = filters.refundability.includes("Partially Refundable") || filters.refundability.includes("Rules Wise");
          const matches = (flight.refundable && wantsRefundable) || (!flight.refundable && wantsNonRefundable);
          if (!matches) return false;
        }
        if (filters.layover.length > 0) {
          const code = extractLayoverCode(flight.stops);
          if (!code || !filters.layover.includes(code)) return false;
        }
        if (filters.timeSlots.length > 0 && !filters.timeSlots.includes(timeSlotForDeparture(flight.departure))) return false;
        return true;
      }),
    [priced, filters]
  );

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sortBy === "earliest") list.sort((a, b) => parseTimeMinutes(a.departure) - parseTimeMinutes(b.departure));
    if (sortBy === "fastest") list.sort((a, b) => parseDurationMinutes(a.duration) - parseDurationMinutes(b.duration));
    if (sortBy === "cheapest") list.sort((a, b) => a.displayPrice - b.displayPrice);
    return list;
  }, [filtered, sortBy]);

  const earliestFlight = [...priced].sort((a, b) => parseTimeMinutes(a.departure) - parseTimeMinutes(b.departure))[0];
  const fastestFlight = [...priced].sort((a, b) => parseDurationMinutes(a.duration) - parseDurationMinutes(b.duration))[0];
  const cheapestFlight = [...priced].sort((a, b) => a.displayPrice - b.displayPrice)[0];

  const sortOptions: { key: SortKey; icon: typeof Clock3; label: string; sublabel: string }[] = [
    { key: "earliest", icon: Clock3, label: earliestFlight.departure, sublabel: "Earliest" },
    { key: "fastest", icon: Gauge, label: fastestFlight.duration, sublabel: "Fastest" },
    { key: "cheapest", icon: IndianRupee, label: formatPrice(cheapestFlight.displayPrice), sublabel: "Cheapest" },
  ];

  const allSelected = sorted.length > 0 && sorted.every((flight) => selectedFlights.has(flight.flightNumber));

  function toggleSelectAll() {
    setSelectedFlights(allSelected ? new Set() : new Set(sorted.map((flight) => flight.flightNumber)));
  }

  function handleShareWhatsApp() {
    const flightsToShare = selectedFlights.size > 0 ? sorted.filter((flight) => selectedFlights.has(flight.flightNumber)) : sorted;
    if (flightsToShare.length === 0) return;
    const dateLabel = `${flightFareCalendar[dateIndex].day}, ${flightFareCalendar[dateIndex].date}`;
    const message = buildWhatsAppShareMessage(flightsToShare, fromCity, toCity, dateLabel);
    window.open(buildWhatsAppShareUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <FlightFilters
        state={filters}
        onChange={setFilters}
        priceBounds={priceBounds}
        countdownLabel="30:00"
        availableAirlines={availableAirlines}
        availableLayoverCities={availableLayoverCities}
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">{sorted.length} Flight results</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {fromCity} → {toCity} · {flightFareCalendar[dateIndex].day}, {flightFareCalendar[dateIndex].date} · Price includes VAT &amp; Tax
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {sortOptions.map(({ key, icon: Icon, label, sublabel }) => {
              const active = sortBy === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSortBy(key)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-left transition-colors",
                    active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                  )}
                >
                  <Icon size={15} className={active ? "text-white" : "text-blue-600"} />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wide opacity-80">{sublabel}</span>
                    <span className="block text-xs font-semibold">{label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
            />
            Select All
            {selectedFlights.size > 0 && <span className="text-blue-600">({selectedFlights.size} selected)</span>}
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCommission((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium",
                showCommission ? "border-violet-300 bg-violet-50 text-violet-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              {showCommission ? <EyeOff size={13} /> : <Eye size={13} />}
              {showCommission ? "Hide Commission" : "Show Commission"}
            </button>
            <button
              type="button"
              onClick={() => setShowAllFares((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium",
                showAllFares ? "border-amber-300 bg-amber-50 text-amber-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              <Layers size={13} />
              {showAllFares ? "Hide All Fares" : "Show All Fares"}
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1fbd5a]"
            >
              <Share2 size={13} />
              {selectedFlights.size > 0 ? `Share Selected (${selectedFlights.size})` : "Share All on WhatsApp"}
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2">
          <button
            type="button"
            aria-label="Previous dates"
            disabled={dateIndex === 0}
            onClick={() => setDateIndex((i) => Math.max(0, i - 1))}
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 disabled:opacity-30"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex flex-1 justify-between gap-1 overflow-x-auto">
            {flightFareCalendar.map((day, index) => (
              <button
                key={day.date}
                type="button"
                onClick={() => setDateIndex(index)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-center",
                  index === dateIndex ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <span className="text-[11px] font-medium">
                  {day.day}, {day.date}
                </span>
                <span className={cn("text-xs font-semibold", index === dateIndex && "underline underline-offset-4")}>{day.price}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next dates"
            disabled={dateIndex === flightFareCalendar.length - 1}
            onClick={() => setDateIndex((i) => Math.min(flightFareCalendar.length - 1, i + 1))}
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-slate-400 hover:bg-slate-50 disabled:opacity-30"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {sorted.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              No flights match your filters. Try clearing a few filters.
            </div>
          )}

          {sorted.map((flight, index) => {
            const expanded = expandedFlight === flight.flightNumber;
            return (
              <div key={flight.flightNumber}>
                <div className="relative rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  {flight.tag && (
                    <span className={cn("absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold", tagStyles[flight.tag])}>
                      {flight.tag}
                    </span>
                  )}

                  <div className="flex flex-col gap-4 p-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 sm:w-40">
                      <input
                        type="checkbox"
                        aria-label={`Select ${flight.airline} ${flight.flightNumber}`}
                        checked={selectedFlights.has(flight.flightNumber)}
                        onChange={() => toggleFlightSelection(flight.flightNumber)}
                        className="h-4 w-4 flex-none rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                      />
                      <span className="flex h-10 w-10 flex-none items-center justify-center">
                        {airlineLogos[flight.airline] ? (
                          <img src={airlineLogos[flight.airline]} alt={flight.airline} className="h-9 w-9 object-contain" />
                        ) : (
                          <Plane size={20} className="text-slate-400" />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{flight.airline}</p>
                        <p className="text-xs text-slate-400">{flight.flightNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm sm:gap-6">
                      <div>
                        <p className="text-lg font-bold text-slate-900">{fromCode}</p>
                        <p className="text-xs text-slate-400">{flight.day}</p>
                        <p className="font-semibold text-slate-900">{flight.departure}</p>
                      </div>
                      <div className="flex flex-col items-center text-xs text-slate-800">
                        <span>Duration</span>
                        <span className="my-1 flex w-32 items-center gap-1 text-blue-500 sm:w-40">
                          <span className="h-px flex-1 bg-slate-300" />
                          <Plane size={11} className="rotate-90" />
                          <span className="h-px flex-1 bg-slate-300" />
                        </span>
                        <span>
                          {flight.duration} · {flight.stops}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900">{toCode}</p>
                        <p className="text-xs text-slate-400">{flight.day}</p>
                        <p className="font-semibold text-slate-900">{flight.arrival}</p>
                      </div>
                    </div>

                    <div className="text-left sm:w-36 sm:text-right">
                      <p className="text-xs text-slate-400">Start From</p>
                      <p className="text-lg font-bold text-slate-800">{formatPrice(flight.displayPrice)}</p>
                      <p className="text-xs text-slate-800">{flight.passengers}</p>
                      {flight.fareOptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setMoreFaresFlight(flight.flightNumber)}
                          className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 sm:justify-end"
                        >
                          <Layers size={12} />
                          More Fares ({flight.fareOptions.length - 1})
                        </button>
                      )}
                    </div>
                  </div>

                  {showAllFares && flight.fareOptions.length > 0 && (
                    <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3">
                      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        <Layers size={12} />
                        All Fares
                      </p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {flight.fareOptions.map((fare) => (
                          <div
                            key={fare.fareType}
                            className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-slate-900">{fare.fareType}</p>
                              <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[10px] text-slate-500">
                                <span className="flex items-center gap-0.5">
                                  <Luggage size={10} />
                                  {fare.baggage}
                                </span>
                                {fare.refundable && <span className="text-emerald-600">Refundable</span>}
                                {showCommission && (
                                  <span className="font-semibold text-violet-700">
                                    +{formatPrice(Math.round((fare.displayPrice * fare.commissionPercent) / 100))}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-none flex-col items-end gap-1">
                              <span className="text-sm font-bold text-amber-600">{formatPrice(fare.displayPrice)}</span>
                              <button
                                type="button"
                                onClick={() => handleBookNow(flight.flightNumber, fare.displayPrice)}
                                className="text-[11px] font-medium text-blue-600 hover:text-blue-700"
                              >
                                Book
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-2.5">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Luggage size={13} />
                        {flight.baggage}
                      </span>
                      {flight.refundable && (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <ShieldCheck size={13} />
                          Refundable
                        </span>
                      )}
                      {showCommission && (
                        <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 font-semibold text-violet-700">
                          <Wallet size={13} />
                          Commission: {formatPrice(Math.round((flight.displayPrice * flight.commissionPercent) / 100))} (
                          {flight.commissionPercent}%)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setExpandedFlight(expanded ? null : flight.flightNumber)}
                        className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                      >
                        <Info size={13} />
                        View Details
                        <ChevronRight size={13} className={cn("transition-transform", expanded && "rotate-90")} />
                      </button>
                      <Button size="sm" onClick={() => handleBookNow(flight.flightNumber, flight.displayPrice)}>
                        Book Now
                      </Button>
                    </div>
                  </div>

                  {expanded && (
                    <FlightDetailTabs flight={flight} fromCity={fromCity} toCity={toCity} showCommission={showCommission} />
                  )}
                </div>

                {index === 2 && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {promoBanners.map((promo) => (
                      <div
                        key={promo.title + promo.gradient}
                        className={cn("flex items-center gap-3 rounded-xl bg-gradient-to-r p-3 text-white", promo.gradient)}
                      >
                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/20">
                          <Percent size={15} />
                        </span>
                        <div>
                          <p className="text-sm font-bold">{promo.title}</p>
                          <p className="text-[11px] text-white/85">{promo.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {moreFaresFlight &&
        (() => {
          const flight = priced.find((f) => f.flightNumber === moreFaresFlight);
          if (!flight || flight.fareOptions.length === 0) return null;
          return (
            <FareOptionsDialog
              airline={flight.airline}
              flightNumber={flight.flightNumber}
              fromCode={fromCode}
              toCode={toCode}
              day={flight.day}
              departure={flight.departure}
              arrival={flight.arrival}
              fareOptions={flight.fareOptions}
              showCommission={showCommission}
              onSelect={(fare) => {
                setMoreFaresFlight(null);
                handleBookNow(flight.flightNumber, fare.displayPrice);
              }}
              onClose={() => setMoreFaresFlight(null)}
            />
          );
        })()}
    </div>
  );
}
