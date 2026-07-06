import Link from "next/link";
import { CheckCircle2, Mail, PlaneTakeoff, Plus, Ticket, Users, Wallet } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { formatPrice } from "../../flight-utils";
import { paymentMethodLabels, type PaymentMethod } from "./payment-step";

export function BookingSuccess({
  reference,
  airline,
  flightNumber,
  fromCity,
  toCity,
  day,
  departure,
  total,
  email,
  travellerCount,
  paymentMethod,
  onViewBooking,
}: {
  reference: string;
  airline: string;
  flightNumber: string;
  fromCity: string;
  toCity: string;
  day: string;
  departure: string;
  total: number;
  email: string;
  travellerCount: number;
  paymentMethod: PaymentMethod;
  onViewBooking: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <span className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-emerald-100/60 blur-2xl" />
        <span className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-blue-100/60 blur-2xl" />

        <div className="relative">
          <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
            <CheckCircle2 size={32} className="relative text-emerald-600" />
          </span>

          <h2 className="mt-4 text-xl font-bold text-slate-900">Booking Confirmed!</h2>
          <p className="mt-1 text-sm text-slate-500">Your flight has been booked successfully.</p>

          <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Booking Reference</p>
            <p className="mt-0.5 text-2xl font-extrabold tracking-[0.15em] text-slate-900">{reference}</p>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-blue-50/70 p-3.5 text-left">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <PlaneTakeoff size={16} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {airline} · {flightNumber}
              </p>
              <p className="truncate text-xs text-slate-500">
                {fromCity} → {toCity} · {day}, {departure}
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-slate-100 bg-slate-50 py-2.5">
              <Users size={13} className="mx-auto text-slate-400" />
              <p className="mt-1 text-xs font-bold text-slate-900">{travellerCount}</p>
              <p className="text-[10px] text-slate-400">Travellers</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 py-2.5">
              <Wallet size={13} className="mx-auto text-slate-400" />
              <p className="mt-1 text-xs font-bold text-slate-900">{formatPrice(total)}</p>
              <p className="text-[10px] text-slate-400">Total Paid</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 py-2.5">
              <Ticket size={13} className="mx-auto text-slate-400" />
              <p className="mt-1 truncate px-1 text-xs font-bold text-slate-900">{paymentMethodLabels[paymentMethod]}</p>
              <p className="text-[10px] text-slate-400">Paid Via</p>
            </div>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Mail size={12} />
            E-ticket &amp; itinerary sent to <span className="font-medium text-slate-600">{email}</span>
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/flights" className="flex-1">
              <Button variant="outline" className="w-full justify-center gap-1.5">
                <Plus size={15} />
                Make New Booking
              </Button>
            </Link>
            <Button onClick={onViewBooking} className="flex-1 justify-center gap-1.5">
              <Ticket size={15} />
              View Your Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
