"use client";

import { Leaf, Sparkles, UtensilsCrossed } from "lucide-react";
import { mealOptions, type MealOption } from "@/lib/seat-meal-data";
import { formatPrice } from "../../flight-utils";
import { cn } from "@/lib/cn";

const tagClasses: Record<MealOption["tag"], string> = {
  None: "bg-slate-100 text-slate-500",
  Veg: "bg-emerald-100 text-emerald-700",
  "Non-Veg": "bg-rose-100 text-rose-700",
  Vegan: "bg-teal-100 text-teal-700",
  Jain: "bg-amber-100 text-amber-700",
  Special: "bg-indigo-100 text-indigo-700",
};

export type MealTraveller = {
  index: number;
  type: "Adult" | "Child" | "Infant";
  name: string;
};

export function MealSelectionStep({
  travellers,
  selections,
  onSelect,
}: {
  travellers: MealTraveller[];
  selections: Record<number, string>;
  onSelect: (index: number, mealId: string) => void;
}) {
  const eligible = travellers.filter((t) => t.type !== "Infant");
  const infants = travellers.filter((t) => t.type === "Infant");

  return (
    <div>
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
          <UtensilsCrossed size={16} />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">Pre-book your in-flight meals</p>
          <p className="mt-0.5 text-xs text-slate-500">Choose a meal for each traveller, or skip for complimentary standard service.</p>
        </div>
      </div>

      <div className="space-y-5">
        {eligible.map((traveller) => {
          const selected = selections[traveller.index] ?? "none";
          return (
            <div key={traveller.index} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                  {traveller.index + 1}
                </span>
                {traveller.name || `Traveller ${traveller.index + 1}`}
                <span className="font-normal text-slate-400">({traveller.type})</span>
              </p>

              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {mealOptions.map((meal) => {
                  const isSelected = selected === meal.id;
                  return (
                    <button
                      key={meal.id}
                      type="button"
                      onClick={() => onSelect(traveller.index, meal.id)}
                      className={cn(
                        "flex flex-col items-start rounded-lg border p-3 text-left transition-all",
                        isSelected
                          ? "border-blue-500 bg-blue-50/60 ring-1 ring-blue-500/30"
                          : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                      )}
                    >
                      <span className="flex w-full items-center justify-between gap-2">
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", tagClasses[meal.tag])}>{meal.tag}</span>
                        <span className="text-xs font-bold text-slate-900">{meal.price > 0 ? formatPrice(meal.price) : "Free"}</span>
                      </span>
                      <span className="mt-1.5 text-sm font-semibold text-slate-900">{meal.name}</span>
                      <span className="mt-0.5 text-xs leading-snug text-slate-500">{meal.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {infants.length > 0 && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-500">
          <Leaf size={14} className="flex-none text-slate-400" />
          {infants.length} infant{infants.length > 1 ? "s" : ""} travel on an adult&apos;s lap and don&apos;t require a separate meal selection.
        </div>
      )}

      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-dashed border-slate-200 p-3.5 text-xs text-slate-400">
        <Sparkles size={14} className="mt-0.5 flex-none" />
        Meal preferences can be changed up to 24 hours before departure from &quot;My Bookings&quot;.
      </div>
    </div>
  );
}
