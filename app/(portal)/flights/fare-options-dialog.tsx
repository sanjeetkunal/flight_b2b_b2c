"use client";

import { useEffect } from "react";
import { Check, Luggage, Plane, ShieldCheck, ShieldOff, Wallet, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/cn";
import { formatPrice } from "./flight-utils";

type PricedFareOption = {
  fareType: string;
  displayPrice: number;
  refundable: boolean;
  baggage: string;
  commissionPercent: number;
  seatsLeft: number;
};

export function FareOptionsDialog({
  airline,
  flightNumber,
  fromCode,
  toCode,
  day,
  departure,
  arrival,
  fareOptions,
  showCommission,
  onSelect,
  onClose,
}: {
  airline: string;
  flightNumber: string;
  fromCode: string;
  toCode: string;
  day: string;
  departure: string;
  arrival: string;
  fareOptions: PricedFareOption[];
  showCommission: boolean;
  onSelect: (fare: PricedFareOption) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const bestCommissionType = fareOptions.reduce(
    (best, fare) => (fare.commissionPercent > best.commissionPercent ? fare : best),
    fareOptions[0]
  ).fareType;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Fare options for ${airline} ${flightNumber}`}
        className="flex max-h-[85vh] w-full max-w-4xl flex-col rounded-xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-base font-semibold text-slate-900">Compare Fares</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500">
              <span className="font-medium text-slate-700">
                {fromCode}-{toCode}
              </span>
              <Plane size={11} className="text-slate-400" />
              <span>{airline}</span>
              <span>· {flightNumber}</span>
              <span>· {day}</span>
              <span>
                · Departs {departure} - Arrives {arrival}
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X size={15} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fareOptions.map((fare) => {
              const isBestCommission = showCommission && fare.fareType === bestCommissionType && fareOptions.length > 1;
              const commissionAmount = Math.round((fare.displayPrice * fare.commissionPercent) / 100);
              return (
                <div
                  key={fare.fareType}
                  className={cn(
                    "flex flex-col rounded-xl border bg-white",
                    isBestCommission ? "border-blue-300 shadow-md ring-1 ring-blue-200" : "border-slate-200"
                  )}
                >
                  {isBestCommission && (
                    <div className="rounded-t-[11px] bg-blue-600 px-3 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-white">
                      Best Commission
                    </div>
                  )}

                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-lg font-bold text-slate-900">{formatPrice(fare.displayPrice)}</p>
                    <p className="text-[11px] text-slate-400">per adult</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{fare.fareType}</p>
                  </div>

                  <div className="flex-1 space-y-3 px-4 py-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Luggage size={13} className="flex-none text-slate-400" />
                      <span>Checked baggage: {fare.baggage}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {fare.refundable ? (
                        <ShieldCheck size={13} className="flex-none text-emerald-600" />
                      ) : (
                        <ShieldOff size={13} className="flex-none text-slate-400" />
                      )}
                      <span className={fare.refundable ? "text-emerald-700" : "text-slate-500"}>
                        {fare.refundable ? "Refundable" : "Non-refundable"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={13} className="flex-none text-slate-400" />
                      <span>{fare.seatsLeft} seats left at this fare</span>
                    </div>
                  </div>

                  {showCommission && (
                    <div className="mx-4 mb-3 flex items-center justify-between gap-2 rounded-lg bg-violet-50 px-3 py-2 text-[11px] font-semibold text-violet-700">
                      <span className="flex items-center gap-1">
                        <Wallet size={12} />
                        Your commission
                      </span>
                      <span>
                        {formatPrice(commissionAmount)} ({fare.commissionPercent}%)
                      </span>
                    </div>
                  )}

                  <div className="px-4 pb-4">
                    <Button className="w-full" onClick={() => onSelect(fare)}>
                      Book Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
