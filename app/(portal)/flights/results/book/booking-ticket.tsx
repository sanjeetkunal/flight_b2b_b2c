import Link from "next/link";
import { ArrowLeft, Armchair, Mail, Phone, Plane, Plus, Printer, Receipt, UtensilsCrossed } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { mealOptions } from "@/lib/seat-meal-data";
import { formatPrice } from "../../flight-utils";
import { paymentMethodLabels, type PaymentMethod } from "./payment-step";
import type { MealTraveller } from "./meal-selection-step";

type FullTraveller = MealTraveller & { title: string; gender: string; age: string };

export function BookingTicket({
  reference,
  airline,
  flightNumber,
  fromCity,
  toCity,
  day,
  departure,
  arrival,
  cabinClass,
  travellers,
  mealSelections,
  seatSelections,
  baseFare,
  taxes,
  mealAddon,
  seatAddon,
  discount,
  total,
  email,
  phone,
  gstSummary,
  paymentMethod,
  onBack,
}: {
  reference: string;
  airline: string;
  flightNumber: string;
  fromCity: string;
  toCity: string;
  day: string;
  departure: string;
  arrival: string;
  cabinClass: string;
  travellers: FullTraveller[];
  mealSelections: Record<number, string>;
  seatSelections: Record<number, string>;
  baseFare: number;
  taxes: number;
  mealAddon: number;
  seatAddon: number;
  discount: number;
  total: number;
  email: string;
  phone: string;
  gstSummary?: string;
  paymentMethod: PaymentMethod;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={15} />
        Back to Confirmation
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-100">Booking Reference (PNR)</p>
            <p className="text-lg font-extrabold tracking-widest text-white">{reference}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">Confirmed</span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              onClick={() => window.print()}
            >
              <Printer size={13} />
              Print
            </Button>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4">
            <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600" />
            <div className="flex items-center gap-3 pl-2">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Plane size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {airline} · {flightNumber}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {fromCity} → {toCity} · {day}, {departure} - {arrival} · {cabinClass}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Traveller Itinerary</h3>
            <div className="mt-2.5 space-y-2">
              {travellers.map((traveller) => {
                const mealId = mealSelections[traveller.index] ?? "none";
                const meal = mealOptions.find((m) => m.id === mealId);
                const seatId = seatSelections[traveller.index];
                return (
                  <div key={traveller.index} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {traveller.title} {traveller.name || `Traveller ${traveller.index + 1}`}{" "}
                        <span className="font-normal text-slate-400">
                          ({traveller.type}
                          {traveller.age ? `, ${traveller.age} yrs` : ""})
                        </span>
                      </p>
                      {traveller.type !== "Infant" && (
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <UtensilsCrossed size={12} /> {meal?.name ?? "No Meal"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Armchair size={12} /> {seatId ?? "Auto-assigned at check-in"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Mail size={14} className="text-blue-600" />
                Contact &amp; Invoice
              </h3>
              <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-1.5">
                  <Mail size={12} className="text-slate-400" /> {email}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone size={12} className="text-slate-400" /> {phone}
                </p>
                {gstSummary && (
                  <p className="flex items-center gap-1.5">
                    <Receipt size={12} className="text-slate-400" /> {gstSummary}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="text-sm font-bold text-slate-900">Fare Summary</h3>
              <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>{formatPrice(baseFare)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes &amp; Fees</span>
                  <span>{formatPrice(taxes)}</span>
                </div>
                {mealAddon > 0 && (
                  <div className="flex justify-between">
                    <span>Meals</span>
                    <span>{formatPrice(mealAddon)}</span>
                  </div>
                )}
                {seatAddon > 0 && (
                  <div className="flex justify-between">
                    <span>Seat Selection</span>
                    <span>{formatPrice(seatAddon)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-1.5 text-sm font-bold text-slate-900">
                  <span>Total Paid</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="pt-0.5 text-[11px] text-slate-400">Paid via {paymentMethodLabels[paymentMethod]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <Link href="/flights">
          <Button variant="outline" className="gap-1.5">
            <Plus size={15} />
            Make New Booking
          </Button>
        </Link>
      </div>
    </div>
  );
}
