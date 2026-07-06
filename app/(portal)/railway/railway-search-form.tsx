"use client";

import { useState } from "react";
import { ArrowLeftRight, CalendarDays, Search, TrainFront } from "lucide-react";
import { Field, Select, TextInput } from "@/app/components/ui/field";
import { Button } from "@/app/components/ui/button";
import { railwayStations } from "@/lib/mock-data";

export function RailwaySearchForm() {
  const [from, setFrom] = useState(railwayStations[0]);
  const [to, setTo] = useState(railwayStations[1]);

  return (
    <div>
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="From Station" icon={<TrainFront size={12} />}>
          <input
            list="hero-stations"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </Field>
        <Field label="To Station" icon={<TrainFront size={12} />}>
          <input
            list="hero-stations"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </Field>
        <datalist id="hero-stations">
          {railwayStations.map((station) => (
            <option key={station} value={station} />
          ))}
        </datalist>
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          aria-label="Swap stations"
          className="absolute left-1/2 top-8 hidden h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-blue-600 sm:flex"
        >
          <ArrowLeftRight size={14} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Journey Date" icon={<CalendarDays size={12} />}>
          <TextInput type="date" defaultValue="2026-07-14" />
        </Field>
        <Field label="Class">
          <Select defaultValue="all">
            <option value="all">All Classes</option>
            <option value="sl">Sleeper (SL)</option>
            <option value="3a">AC 3 Tier (3A)</option>
            <option value="2a">AC 2 Tier (2A)</option>
            <option value="1a">AC First Class (1A)</option>
          </Select>
        </Field>
        <Field label="Quota">
          <Select defaultValue="general">
            <option value="general">General</option>
            <option value="tatkal">Tatkal</option>
            <option value="ladies">Ladies</option>
            <option value="senior">Senior Citizen</option>
          </Select>
        </Field>
      </div>

      <Button size="lg" className="mt-5 w-full gap-2 sm:w-auto">
        <Search size={16} />
        Search Trains
      </Button>
    </div>
  );
}
