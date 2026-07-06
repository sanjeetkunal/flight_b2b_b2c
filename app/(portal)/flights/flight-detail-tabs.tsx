"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock3, FileText, IndianRupee, Plane, Receipt, UtensilsCrossed, Wallet, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { airlineLogos, airports, type flightSearchResults } from "@/lib/mock-data";
import { buildFlightLegs, extractLayoverCode, formatPrice } from "./flight-utils";

type Flight = (typeof flightSearchResults)[number] & { displayPrice: number };

const tabs = ["Flight Details", "Fare Details", "Baggage", "Cancellation"] as const;
type Tab = (typeof tabs)[number];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-50 py-1.5 last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}

function FareRow({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b border-slate-50 px-4 py-2.5 last:border-0",
        emphasize ? "bg-slate-50/80" : "hover:bg-slate-50/60"
      )}
    >
      <span className={cn("text-xs text-slate-500", emphasize && "text-sm font-bold text-slate-900")}>{label}</span>
      <span className={cn("text-xs font-semibold tabular-nums text-slate-900", emphasize && "text-sm font-extrabold")}>
        {value}
      </span>
    </div>
  );
}

type FareTone = "emerald" | "blue" | "violet";

const fareToneClasses: Record<FareTone, string> = {
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
};

function FareCard({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: LucideIcon;
  title: string;
  tone: FareTone;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
        <span className={cn("flex h-7 w-7 flex-none items-center justify-center rounded-lg", fareToneClasses[tone])}>
          <Icon size={14} />
        </span>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-600">{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

const fareTermsAndConditions = [
  "Penalty is subject to 4 hours prior to departure and no changes are allowed after that.",
  "The charges will be on per passenger per sector.",
  "Rescheduling Charges = Rescheduling/Change Penalty + Fare Difference (if applicable).",
  "Partial cancellation is not allowed on the flight tickets which are booked under special discounted fares.",
];

export function FlightDetailTabs({
  flight,
  fromCity,
  toCity,
  showCommission,
}: {
  flight: Flight;
  fromCity: string;
  toCity: string;
  showCommission: boolean;
}) {
  const [tab, setTab] = useState<Tab>("Flight Details");
  const baseFare = Math.round(flight.displayPrice * 0.82);
  const taxes = flight.displayPrice - baseFare;
  const commissionAmount = Math.round((flight.displayPrice * flight.commissionPercent) / 100);
  const paxMatch = flight.passengers.match(/^(\d+)\s+(.+)$/);
  const paxLabel = paxMatch ? `${paxMatch[1]} x ${paxMatch[2]}` : flight.passengers;

  const { legs, layoverDuration } = useMemo(() => {
    const layoverCode = extractLayoverCode(flight.stops);
    const layoverCityName = layoverCode ? (airports.find((a) => a.code === layoverCode)?.city ?? layoverCode) : null;
    return buildFlightLegs(flight, fromCity, toCity, layoverCityName);
  }, [flight, fromCity, toCity]);

  return (
    <div className="border-t border-slate-100">
      <div className="flex gap-1 overflow-x-auto px-4 pt-3">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "shrink-0 rounded-t-lg border-b-2 px-3 py-2 text-xs font-semibold transition-colors",
              tab === t ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-slate-50/60 p-4 text-sm">
        {tab === "Flight Details" && (
          <div className="space-y-3">
            {legs.map((leg, index) => (
              <div key={leg.flightNumber}>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{flight.day}</p>
                    <p className="text-[11px] italic text-slate-400">{flight.tag ?? "Standard Fare"}</p>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 flex-none items-center justify-center">
                        {airlineLogos[flight.airline] ? (
                          <img src={airlineLogos[flight.airline]} alt={flight.airline} className="h-8 w-8 object-contain" />
                        ) : (
                          <Plane size={18} className="text-slate-400" />
                        )}
                      </span>
                      <div>
                        <p className="text-xs text-slate-400">{leg.fromCity}</p>
                        <p className="text-lg font-bold text-slate-900">{leg.fromCode}</p>
                        <p className="text-sm font-semibold text-slate-700">{leg.departure}</p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col items-center px-2 text-[11px] text-slate-400">
                      <span>{leg.duration}</span>
                      <span className="my-1 flex w-full max-w-32 items-center gap-1 text-blue-500">
                        <span className="h-px flex-1 bg-slate-300" />
                        <ArrowRight size={12} />
                        <span className="h-px flex-1 bg-slate-300" />
                      </span>
                      <span>{leg.flightNumber}</span>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">{leg.toCity}</p>
                      <p className="text-lg font-bold text-slate-900">{leg.toCode}</p>
                      <p className="text-sm font-semibold text-slate-700">{leg.arrival}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-center sm:grid-cols-5 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0">
                      {[
                        { label: "Flight", value: leg.flightNumber },
                        { label: "Terminal", value: leg.terminal },
                        { label: "Gate", value: leg.gate },
                        { label: "Seat", value: leg.seat },
                        { label: "Class", value: leg.cabinClass },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">{item.label}</p>
                          <p className="text-xs font-semibold text-slate-900">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      {leg.mealAvailable && (
                        <span className="flex items-center gap-1">
                          <UtensilsCrossed size={12} />
                          Meal available
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Plane size={12} className="rotate-90" />
                        {leg.aircraft}
                      </span>
                    </div>
                    <span>{leg.duration} total</span>
                  </div>
                </div>

                {index < legs.length - 1 && layoverDuration && (
                  <div className="my-3 flex items-center gap-3 px-1">
                    <span className="h-px flex-1 border-t border-dashed border-slate-300" />
                    <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      <Clock3 size={12} />
                      {layoverDuration} layover in {leg.toCity}
                    </span>
                    <span className="h-px flex-1 border-t border-dashed border-slate-300" />
                  </div>
                )}
              </div>
            ))}

            <div className="grid grid-cols-1 gap-x-8 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
              <Row label="Total Duration" value={flight.duration} />
              <Row label="Stops" value={flight.stops} />
              <Row label="Baggage" value={flight.baggage} />
              <Row label="Passengers" value={flight.passengers} />
            </div>
          </div>
        )}

        {tab === "Fare Details" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-white shadow-sm">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-100">Fare Summary</p>
                <p className="text-xs text-blue-100">
                  {paxLabel} · {flight.airline} {flight.flightNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-100">Net Payable</p>
                <p className="text-xl font-extrabold tabular-nums">{formatPrice(flight.displayPrice)}</p>
              </div>
            </div>

            <div className={cn("grid grid-cols-1 gap-4", showCommission ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
              <FareCard icon={IndianRupee} title="Passenger Fare" tone="emerald">
                <FareRow label={paxLabel} value={formatPrice(baseFare)} />
                <FareRow label="Total Taxes & Fees" value={formatPrice(taxes)} />
                <FareRow label="Gross Total" value={formatPrice(flight.displayPrice)} emphasize />
                <FareRow label="Net Fare" value={formatPrice(flight.displayPrice)} emphasize />
              </FareCard>

              <FareCard icon={Receipt} title="Tax & Other Fees" tone="blue">
                <FareRow label="SGST Airline" value={formatPrice(0)} />
                <FareRow label="CGST Airline" value={formatPrice(0)} />
                <FareRow label="IGST Airline" value={formatPrice(0)} />
                <FareRow label="Fuel Surcharge" value={formatPrice(0)} />
                <FareRow label="Transaction Charge" value={formatPrice(0)} />
              </FareCard>

              {showCommission && (
                <FareCard icon={Wallet} title="Commission" tone="violet">
                  <FareRow label={`Commission (${flight.commissionPercent}%)`} value={formatPrice(commissionAmount)} emphasize />
                  <FareRow label="TDS" value={formatPrice(0)} />
                  <FareRow label="CGST Company" value={formatPrice(0)} />
                  <FareRow label="SGST Company" value={formatPrice(0)} />
                  <FareRow label="IGST Company" value={formatPrice(0)} />
                  <FareRow label="Transaction Charge" value={formatPrice(0)} />
                </FareCard>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <FileText size={14} />
                </span>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-600">Terms &amp; Conditions</p>
              </div>
              <ul className="space-y-2.5 p-4">
                {fareTermsAndConditions.map((term, index) => (
                  <li key={term} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-500">
                      {index + 1}
                    </span>
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === "Baggage" && (
          <div className="max-w-sm">
            <Row label="Cabin Baggage" value="7 Kg (1 piece)" />
            <Row label="Check-in Baggage" value={flight.baggage} />
            <p className="mt-2 text-xs text-slate-500">Excess baggage will be charged by the airline directly at the airport.</p>
          </div>
        )}

        {tab === "Cancellation" && (
          <ul className="list-disc space-y-1.5 pl-4 text-slate-600">
            {flight.refundable ? (
              <>
                <li>Free cancellation up to 24 hours before departure.</li>
                <li>Cancellation fee applies within 24 hours of departure.</li>
                <li>Date change permitted with a fee difference in fare, if any.</li>
              </>
            ) : (
              <>
                <li>This is a non-refundable fare — no cash refund on cancellation.</li>
                <li>Date change permitted with airline change fee plus fare difference.</li>
                <li>Airline-imposed cancellation charges may apply as per fare rules.</li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
