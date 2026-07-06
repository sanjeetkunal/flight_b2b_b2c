import { Armchair, ClipboardCheck, Mail, Phone, Receipt, UtensilsCrossed } from "lucide-react";
import { mealOptions } from "@/lib/seat-meal-data";
import type { MealTraveller } from "./meal-selection-step";

export function ReviewStep({
  travellers,
  mealSelections,
  seatSelections,
  email,
  phone,
  gstSummary,
}: {
  travellers: MealTraveller[];
  mealSelections: Record<number, string>;
  seatSelections: Record<number, string>;
  email: string;
  phone: string;
  gstSummary?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <ClipboardCheck size={14} />
          </span>
          Review Your Booking
        </h2>

        <div className="mt-3 space-y-2.5">
          {travellers.map((traveller) => {
            const mealId = mealSelections[traveller.index] ?? "none";
            const meal = mealOptions.find((m) => m.id === mealId);
            const seatId = seatSelections[traveller.index];
            return (
              <div key={traveller.index} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">
                  {traveller.name || `Traveller ${traveller.index + 1}`} <span className="font-normal text-slate-400">({traveller.type})</span>
                </p>
                {traveller.type !== "Infant" && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <UtensilsCrossed size={12} /> {meal?.name ?? "No Meal"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Armchair size={12} /> {seatId ?? "Auto-assigned at check-in"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Mail size={14} />
          </span>
          Contact &amp; Invoice
        </h2>
        <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
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
    </div>
  );
}
