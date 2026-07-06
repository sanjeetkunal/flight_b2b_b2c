import { ArrowDownRight, ArrowUpRight, MoreVertical, type LucideIcon } from "lucide-react";
import { Sparkline } from "@/app/components/ui/sparkline";
import { MonthNav } from "@/app/components/ui/month-nav";
import { cn } from "@/lib/cn";

type StatTone = "emerald" | "blue" | "violet" | "amber";

const toneClasses: Record<StatTone, string> = {
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  violet: "bg-violet-50 text-violet-600",
  amber: "bg-amber-50 text-amber-600",
};

export function StatCard({
  label,
  value,
  previous,
  change,
  trend,
  subtitle,
  icon: Icon,
  tone = "blue",
  sparkline,
}: {
  label: string;
  value: string;
  previous: string;
  change: string;
  trend: "up" | "down";
  subtitle: string;
  icon: LucideIcon;
  tone?: StatTone;
  sparkline: number[];
}) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon size={18} />
        </span>
        <button type="button" className="text-slate-300 hover:text-slate-500" aria-label="More options">
          <MoreVertical size={16} />
        </button>
      </div>

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>

      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">{value}</span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold",
            trend === "up" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          )}
        >
          {trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
      </div>

      <p className="mt-1 text-xs text-slate-400">
        <span className="font-medium text-slate-500">{subtitle}</span> · {previous} last month
      </p>

      <Sparkline data={sparkline} trend={trend} className="mt-3 h-9 w-full" />

      <MonthNav />
    </div>
  );
}
