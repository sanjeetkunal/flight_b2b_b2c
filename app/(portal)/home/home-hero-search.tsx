"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroShell } from "@/app/components/booking/hero-shell";
import { FlightSearchForm, type FlightSearchCriteria } from "../flights/flight-search-form";
import { buildFlightResultsUrl } from "../flights/build-search-url";
import { HotelSearchForm } from "../hotels/hotel-search-form";
import { HolidaySearchForm } from "../holidays/holiday-search-form";
import { RailwaySearchForm } from "../railway/railway-search-form";
import { UtilityQuickTiles } from "../utility/utility-quick-tiles";
import { navItems } from "@/lib/nav";
import { moduleKeyByHref, moduleTheme } from "@/lib/module-theme";
import { cn } from "@/lib/cn";

const tabs = navItems.filter((item) => item.href !== "/home");

export function HomeHeroSearch({ agentFirstName }: { agentFirstName: string }) {
  const [activeHref, setActiveHref] = useState(tabs[0].href);
  const router = useRouter();

  function handleFlightSearch(criteria: FlightSearchCriteria) {
    router.push(buildFlightResultsUrl(criteria));
  }

  return (
    <HeroShell
      gradient="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500"
      top={
        <div className="pb-10 sm:pb-12">
          <p className="text-sm font-medium text-blue-100">Welcome back, {agentFirstName}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Where are we booking today?
          </h1>
          <p className="mt-2 max-w-xl text-sm text-blue-100">
            Search flights, hotels, holidays, railway tickets or pay a utility bill for your customers.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeHref === tab.href;
              const theme = moduleTheme[moduleKeyByHref[tab.href]];
              return (
                <button
                  key={tab.href}
                  onClick={() => setActiveHref(tab.href)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive ? cn("bg-white shadow-sm", theme.text) : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  <tab.icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      }
    >
      {activeHref === "/flights" && <FlightSearchForm onSearch={handleFlightSearch} />}
      {activeHref === "/hotels" && <HotelSearchForm />}
      {activeHref === "/holidays" && <HolidaySearchForm />}
      {activeHref === "/railway" && <RailwaySearchForm />}
      {activeHref === "/utility" && <UtilityQuickTiles />}
    </HeroShell>
  );
}
