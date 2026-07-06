"use client";

import { Clock, TicketCheck, TrainFront } from "lucide-react";
import { ModuleHero } from "@/app/components/booking/module-hero";
import { RailwaySearchForm } from "./railway-search-form";
import { TextInput } from "@/app/components/ui/field";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { moduleTheme } from "@/lib/module-theme";
import { trainResults } from "@/lib/mock-data";

const statusTone = {
  Available: "success",
  Waitlist: "danger",
  RAC: "warning",
} as const;

export default function RailwayPage() {
  return (
    <div>
      <ModuleHero
        icon={TrainFront}
        title="Railway Booking"
        subtitle="Search trains, check live availability and book tickets in seconds."
        gradient={moduleTheme.railway.gradient}
      >
        <RailwaySearchForm />
      </ModuleHero>

      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <TicketCheck size={16} className="text-teal-600" />
          Check PNR Status
        </h3>
        <p className="mt-1 text-xs text-slate-500">Enter a 10-digit PNR number to view booking status.</p>
        <form className="mt-4 flex max-w-md gap-2" onSubmit={(event) => event.preventDefault()}>
          <TextInput placeholder="e.g. 2456789012" maxLength={10} className="flex-1" />
          <Button type="submit" variant="outline">
            Check
          </Button>
        </form>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Available Trains</h2>
        <div className="space-y-4">
          {trainResults.map((train) => (
            <div key={train.trainNo} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {train.trainNo} · {train.trainName}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={12} /> {train.duration} · Runs daily
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">{train.departure}</p>
                    <p className="text-xs text-slate-400">{train.from}</p>
                  </div>
                  <span className="h-px w-10 bg-slate-300" />
                  <div className="text-center">
                    <p className="font-semibold text-slate-900">{train.arrival}</p>
                    <p className="text-xs text-slate-400">{train.to}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                {train.classes.map((cls) => (
                  <div key={cls.code} className="flex min-w-[120px] flex-1 flex-col gap-1.5 rounded-lg border border-slate-200 p-3 sm:flex-none sm:basis-40">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">{cls.code}</span>
                      <Badge tone={statusTone[cls.status]}>{cls.availability}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{cls.fare}</p>
                    <Button size="sm" className="mt-1 w-full">
                      Book
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
