import { Building2, Globe2, Plane, Users } from "lucide-react";
import { StatCard } from "@/app/components/ui/stat-card";
import { dashboardStats } from "@/lib/mock-data";

const platformStats = [
  { icon: Plane, label: "Airlines", value: "750+" },
  { icon: Building2, label: "Hotels Worldwide", value: "80,000+" },
  { icon: Users, label: "Registered Travel Partners", value: "60,000+" },
  { icon: Globe2, label: "Businesses on one login", value: "5" },
];

const statIcons = { "Wallet Balance": Users, "Bookings this month": Plane, "Total sales (MTD)": Building2, "Pending approvals": Globe2 } as const;
const statTones = ["blue", "emerald", "violet", "amber"] as const;

export function StatsSection() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">One platform. Massive inventory. Better deals.</h2>
            <p className="mt-3 max-w-md text-base text-slate-400">
              Everything a travel agency needs to search, book and manage flights, hotels and more —
              in one seamless dashboard.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-8">
              {platformStats.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                    <Icon size={16} />
                  </span>
                  <dd className="mt-3 text-2xl font-bold text-white">{value}</dd>
                  <dt className="mt-0.5 text-xs text-slate-400">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dashboardStats.map((stat, index) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                previous={stat.previous}
                change={stat.change}
                trend={stat.trend}
                subtitle="Your agency"
                icon={statIcons[stat.label as keyof typeof statIcons]}
                tone={statTones[index % statTones.length]}
                sparkline={stat.sparkline}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
