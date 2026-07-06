"use client";

import { useState } from "react";
import { Building2, Landmark, Plane, TrainFront, Zap, type LucideIcon, Bus } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { moduleTheme, type ModuleKey } from "@/lib/module-theme";
import { recentBookings, type BookingType } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const tabs: { key: ModuleKey; bookingType: BookingType | "Bus"; label: string; icon: LucideIcon; checklist: string[] }[] = [
  {
    key: "flights",
    bookingType: "Flight",
    label: "Flights",
    icon: Plane,
    checklist: [
      "Access over 750 airlines, including NDC and offshore fares",
      "Book various fare types, including corporate, SME, and instant offers",
      "Enjoy complimentary seat and meal add-ons on eligible fares",
      "Take advantage of bulk and group fare deals for large parties",
    ],
  },
  {
    key: "hotels",
    bookingType: "Hotel",
    label: "Hotels",
    icon: Building2,
    checklist: [
      "Explore a vast network of 80,000+ properties worldwide",
      "Benefit from free cancellation on our flexible rate plans",
      "Access exclusive corporate negotiated and net rates",
      "Experience real-time inventory and price synchronization",
    ],
  },
  {
    key: "holidays",
    bookingType: "Holiday",
    label: "Holidays",
    icon: Landmark,
    checklist: [
      "Discover our expertly curated domestic and international packages",
      "Create custom itineraries tailored to every budget and preference",
      "Offer flexible EMI options to make travel more affordable",
      "Receive dedicated support from our holiday desk for a seamless experience",
    ],
  },
  {
    key: "railway",
    bookingType: "Railway",
    label: "Railway",
    icon: TrainFront,
    checklist: [
      "Become an IRCTC-authorized e-ticketing agent",
      "Check live PNR status and seat availability in real-time",
      "Book Tatkal and Premium Tatkal tickets with ease",
      "Receive instant refunds on all cancelled tickets",
    ],
  },
  {
    key: "bus",
    bookingType: "Bus",
    label: "Buses",
    icon: Bus,
    checklist: [
      "Access a vast network of over 3,000 bus operators across India",
      "Book seats on more than 100,000 bus routes nationwide",
      "Enjoy a simple and intuitive booking process for all major routes",
      "Receive 24/7 support for all your bus booking inquiries",
    ],
  },
  {
    key: "utility",
    bookingType: "Utility",
    label: "Utility",
    icon: Zap,
    checklist: [
      "Pay for mobile, DTH, electricity, and broadband bills",
      "Access a network of over 500 billers across India",
      "Benefit from automatic reconciliation against your wallet balance",
      "Earn a commission on every utility transaction you make",
    ],
  },
];

const statusTone = { Confirmed: "success", Pending: "warning", Cancelled: "danger" } as const;

export function ModuleShowcase() {
  const [activeKey, setActiveKey] = useState<ModuleKey>("flights");
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];
  const theme = moduleTheme[active.key];
  const previewBookings = recentBookings.filter((booking) => booking.type === active.bookingType).slice(0, 3);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">A Complete Travel Ecosystem for Your Business</h2>
          <p className="mt-3 text-base text-slate-500">
            OrbitTravel provides agencies with integrated access to flights, hotels, and more, offering a seamless, scalable, and competitively priced solution.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive ? cn(moduleTheme[tab.key].solid, "text-white") : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                <tab.icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <ul className="space-y-4">
            {active.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <span className={cn("mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-bold", theme.light, theme.text)}>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Recent {active.label} Bookings</p>
              <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", theme.light, theme.text)}>
                <active.icon size={15} />
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {previewBookings.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-6 text-center text-xs text-slate-400">
                  New bookings for this module will appear here.
                </p>
              )}
              {previewBookings.map((booking) => (
                <div key={booking.id} className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{booking.customer}</p>
                    <Badge tone={statusTone[booking.status]}>{booking.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{booking.detail}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>{booking.reference}</span>
                    <span className="font-semibold text-slate-700">{booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
