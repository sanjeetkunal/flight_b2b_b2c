"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { cn } from "@/lib/cn";

const operations = [
  {
    title: "Unified booking & servicing",
    description: "Search, book and service travel inventory through one platform — built for daily agent operations.",
  },
  {
    title: "Fast confirmations, fewer failures",
    description: "High-volume booking infrastructure designed for peak demand, with reliable confirmations and stable performance.",
  },
  {
    title: "Manage bookings end-to-end",
    description: "Track every booking from creation to completion — including amendments, cancellations, ticketing and re-issue.",
  },
  {
    title: "Partner-ready distribution",
    description: "Built to support distributor and supplier operations with structured inventory access and scalable workflows.",
  },
];

const amendmentActions = ["SSR", "Cancellation Quotation", "Cancellation", "Full Refund", "Re-Issue Quotation"];

export function OperationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Powerful tools to manage operations at scale</h2>
          <p className="mt-3 text-base text-slate-500">
            OrbitTravel brings bookings, inventory access and operational workflows into one B2B platform.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-1">
            {operations.map((operation, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={operation.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-full border-l-2 px-5 py-4 text-left transition-colors",
                    isActive ? "border-blue-600 bg-blue-50/50" : "border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <p className={cn("text-sm font-semibold", isActive ? "text-blue-700" : "text-slate-900")}>{operation.title}</p>
                  {isActive && <p className="mt-1.5 text-sm leading-6 text-slate-500">{operation.description}</p>}
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ClipboardList size={15} />
              </span>
              <p className="text-sm font-semibold text-slate-900">Update Amendment Status</p>
            </div>
            <p className="mt-1 text-xs text-slate-500">Update amendment status to reflect booking changes.</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">From (Created At)</p>
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">FL88213453467</div>
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Select Date</p>
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">Select date</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {amendmentActions.map((action, index) => (
                <span
                  key={action}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    index === activeIndex % amendmentActions.length ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-inset ring-slate-200"
                  )}
                >
                  {action}
                </span>
              ))}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">Cancel</span>
              <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Update</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
