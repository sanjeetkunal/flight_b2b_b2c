"use client";

import { useRouter } from "next/navigation";
import { Plane } from "lucide-react";
import { ModuleHero } from "@/app/components/booking/module-hero";
import { FlightSearchForm, type FlightSearchCriteria } from "./flight-search-form";
import { buildFlightResultsUrl } from "./build-search-url";
import { moduleTheme } from "@/lib/module-theme";
import { popularRoutes } from "@/lib/mock-data";

export default function FlightsPage() {
  const router = useRouter();

  function handleSearch(criteria: FlightSearchCriteria) {
    router.push(buildFlightResultsUrl(criteria));
  }

  return (
    <div>
      <ModuleHero
        icon={Plane}
        title="Flight Booking"
        subtitle="Search and book domestic & international flights for your customers."
        gradient={moduleTheme.flights.gradient}
      >
        <FlightSearchForm onSearch={handleSearch} />
      </ModuleHero>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Popular Routes</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {popularRoutes.map((route) => (
            <div key={`${route.from}-${route.to}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Plane size={16} />
                </span>
                <span className="text-xs font-medium text-slate-400">{route.stops}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-900">
                <span>{route.from}</span>
                <span className="mx-2 h-px flex-1 bg-slate-200" />
                <span>{route.to}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {route.airline} · {route.duration}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-slate-900">{route.price}</p>
                <span className="text-xs font-medium text-blue-600">Fares starting</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
