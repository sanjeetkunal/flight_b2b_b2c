import { Wallet, ClipboardList, TrendingUp, AlertCircle } from "lucide-react";
import { StatCard } from "@/app/components/ui/stat-card";
import { Sparkline } from "@/app/components/ui/sparkline";
import { agent, dashboardStats, recentBookings } from "@/lib/mock-data";
import { TicketBoard } from "./ticket-board";
import { BookingHistory } from "./booking-history";

const statIcons = [Wallet, ClipboardList, TrendingUp, AlertCircle] as const;
const statTones = ["emerald", "blue", "violet", "amber"] as const;

function parseAmount(value: string): number {
  return Number(value.replace(/[^\d.]/g, "")) || 0;
}

function getTopCustomers() {
  const totals = new Map<string, number>();
  recentBookings.forEach((booking) => {
    totals.set(booking.customer, (totals.get(booking.customer) ?? 0) + parseAmount(booking.amount));
  });
  const grandTotal = [...totals.values()].reduce((sum, value) => sum + value, 0) || 1;
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, amount]) => ({
      name,
      amount,
      pct: Math.round((amount / grandTotal) * 100),
    }));
}

export default function DashboardOverviewPage() {
  const topCustomers = getTopCustomers();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Welcome back, {agent.name.split(" ")[0]}</h1>
          <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening across your agency today.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} subtitle={agent.agencyName} icon={statIcons[index]} tone={statTones[index]} />
          ))}
        </div>

        <TicketBoard />

        <BookingHistory />
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Weekly Bookings</p>
            <span className="text-xs text-slate-400">This month</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{dashboardStats[1].value}</p>
          <Sparkline data={dashboardStats[1].sparkline} trend={dashboardStats[1].trend} className="mt-3 h-16 w-full" />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Weekly Revenue</p>
            <span className="text-xs text-slate-400">This month</span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">{dashboardStats[2].value}</p>
          <Sparkline data={dashboardStats[2].sparkline} trend={dashboardStats[2].trend} className="mt-3 h-16 w-full" />
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Top Active Customers</p>
          </div>
          <div className="space-y-3">
            {topCustomers.map((customer) => (
              <div key={customer.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{customer.name}</span>
                  <span className="text-slate-400">{customer.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${customer.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
