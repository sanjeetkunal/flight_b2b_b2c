import Link from "next/link";
import { ArrowRight, ClipboardList, TrendingUp, Wallet, AlertCircle, Sparkles } from "lucide-react";
import { StatCard } from "@/app/components/ui/stat-card";
import { Badge } from "@/app/components/ui/badge";
import { HomeHeroSearch } from "./home-hero-search";
import { moduleTheme } from "@/lib/module-theme";
import { bookingTypeIcon, bookingTypeModule, bookingStatusTone } from "@/lib/booking-meta";
import { agent, dashboardStats, recentBookings } from "@/lib/mock-data";

const statIcons = [Wallet, ClipboardList, TrendingUp, AlertCircle] as const;
const statTones = ["emerald", "blue", "violet", "amber"] as const;

export default function DashboardPage() {
  return (
    <div>
      <HomeHeroSearch agentFirstName={agent.name.split(" ")[0]} />

      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Your Business Snapshot</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} subtitle={agent.agencyName} icon={statIcons[index]} tone={statTones[index]} />
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 p-6 text-white shadow-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.5), transparent 35%), radial-gradient(circle at 90% 100%, rgba(255,255,255,0.35), transparent 40%)",
          }}
        />
        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/15">
              <Sparkles size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold">Monsoon Holiday Payout Boost</p>
              <p className="mt-1 max-w-xl text-sm text-white/85">
                Earn an extra 1.5% commission on international holiday packages booked this week.
              </p>
            </div>
          </div>
          <Link
            href="/holidays"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-fuchsia-700 hover:bg-fuchsia-50"
          >
            Explore Packages <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Recent Bookings</h2>
          <Link href="/my-bookings" className="text-xs font-medium text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-medium">Reference</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Detail</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => {
                const Icon = bookingTypeIcon[booking.type];
                const theme = moduleTheme[bookingTypeModule[booking.type]];
                return (
                  <tr key={booking.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/70">
                    <td className="px-5 py-3.5 font-medium text-slate-800">{booking.reference}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-md ${theme.light} ${theme.text}`}>
                          <Icon size={13} />
                        </span>
                        {booking.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{booking.customer}</td>
                    <td className="px-5 py-3.5 text-slate-500">{booking.detail}</td>
                    <td className="px-5 py-3.5 text-slate-500">{booking.date}</td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">{booking.amount}</td>
                    <td className="px-5 py-3.5">
                      <Badge tone={bookingStatusTone[booking.status]}>{booking.status}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
