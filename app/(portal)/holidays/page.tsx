"use client";

import { useMemo, useState } from "react";
import { MapPin, Palmtree, Star } from "lucide-react";
import { ModuleHero } from "@/app/components/booking/module-hero";
import { HolidaySearchForm } from "./holiday-search-form";
import { Button } from "@/app/components/ui/button";
import { moduleTheme } from "@/lib/module-theme";
import { holidayPackages } from "@/lib/mock-data";

const categories = ["All", "Domestic", "International"];

export default function HolidaysPage() {
  const [category, setCategory] = useState("All");

  const packages = useMemo(
    () => (category === "All" ? holidayPackages : holidayPackages.filter((item) => item.category === category)),
    [category]
  );

  return (
    <div>
      <ModuleHero
        icon={Palmtree}
        title="Holiday Packages"
        subtitle="Curated domestic & international holiday packages, ready to customise."
        gradient={moduleTheme.holidays.gradient}
      >
        <HolidaySearchForm />
      </ModuleHero>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Popular Packages</h2>
          <div className="flex gap-2">
            {categories.map((option) => (
              <button
                key={option}
                onClick={() => setCategory(option)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  category === option ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <div key={pkg.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 text-amber-400">
                <Palmtree size={40} />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{pkg.title}</p>
                  <span className="flex flex-none items-center gap-0.5 rounded bg-emerald-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                    <Star size={11} className="fill-white" /> {pkg.rating}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin size={12} /> {pkg.destination}
                </p>
                <p className="mt-1 text-xs font-medium text-orange-600">{pkg.duration}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pkg.inclusions.map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Starting from</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {pkg.price} <span className="text-xs font-normal text-slate-400">/ person</span>
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Itinerary
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
