"use client";

import { useState, type SubmitEvent } from "react";
import { ArrowLeftRight, Search } from "lucide-react";
import { CitySelect } from "./city-select";
import { DatePicker } from "@/app/components/ui/date-picker";
import { TravellersSelect, type TravellersValue } from "./travellers-select";
import { Button } from "@/app/components/ui/button";
import { airports, flightFareTypes, type Airport } from "@/lib/mock-data";
import { isoDaysFromNow } from "@/lib/date";
import { cn } from "@/lib/cn";

export type TripType = "oneway" | "roundtrip" | "multicity";

export type FlightSearchCriteria = {
  tripType: TripType;
  from: Airport;
  to: Airport;
  departureDate: string;
  returnDate: string;
  travellers: TravellersValue;
  fareType: string;
  directOnly: boolean;
};

const tripTypes: { value: TripType; label: string }[] = [
  { value: "oneway", label: "One Way" },
  { value: "roundtrip", label: "Round Trip" },
  { value: "multicity", label: "Multi-City" },
];

export function FlightSearchForm({ onSearch }: { onSearch?: (criteria: FlightSearchCriteria) => void }) {
  const [tripType, setTripType] = useState<TripType>("oneway");
  const [from, setFrom] = useState<Airport>(airports[0]);
  const [to, setTo] = useState<Airport>(airports[1]);
  const [departureDate, setDepartureDate] = useState(isoDaysFromNow(7));
  const [returnDate, setReturnDate] = useState(isoDaysFromNow(12));
  const [travellers, setTravellers] = useState<TravellersValue>({ adults: 1, children: 0, infants: 0, cabinClass: "Economy" });
  const [fareType, setFareType] = useState(flightFareTypes[0]);
  const [directOnly, setDirectOnly] = useState(false);

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onSearch?.({ tripType, from, to, departureDate, returnDate, travellers, fareType, directOnly });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-2">
        {tripTypes.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTripType(option.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold transition-all",
              tripType === option.value
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        <div className="relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:col-span-5">
          <CitySelect label="From" value={from} onChange={setFrom} exclude={to.code} />
          <CitySelect label="To" value={to} onChange={setTo} exclude={from.code} />
          <button
            type="button"
            onClick={handleSwap}
            aria-label="Swap origin and destination"
            className="absolute left-1/2 top-[3.0rem] hidden h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-all hover:scale-105 hover:border-blue-300 hover:text-blue-600 sm:flex"
          >
            <ArrowLeftRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:col-span-4">
          <DatePicker label="Departure" value={departureDate} onChange={setDepartureDate} />
          <DatePicker
            label="Return"
            value={returnDate}
            onChange={setReturnDate}
            minDate={departureDate}
            disabled={tripType !== "roundtrip"}
          />
        </div>

        <div className="p-4 lg:col-span-3">
          <TravellersSelect value={travellers} onChange={setTravellers} />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fare Type</p>
          <div className="flex flex-wrap gap-2">
            {flightFareTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFareType(type)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                  fareType === type
                    ? "border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-600/20"
                    : "border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/50"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-slate-600">
          Direct flights only
          <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
            <input
              type="checkbox"
              checked={directOnly}
              onChange={(e) => setDirectOnly(e.target.checked)}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-full bg-slate-200 transition-colors peer-checked:bg-blue-600" />
            <span className="absolute left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
          </span>
        </label>
      </div>

      <div className="-mb-10 mt-6 flex justify-center sm:-mb-12">
        <Button
          type="submit"
          size="lg"
          className="group gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-10 shadow-lg shadow-blue-600/30 transition-transform hover:scale-[1.02] hover:from-blue-500 hover:to-indigo-500"
        >
          <Search size={16} className="transition-transform group-hover:scale-110" />
          Search Flights
        </Button>
      </div>
    </form>
  );
}
