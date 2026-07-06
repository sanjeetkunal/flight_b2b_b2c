import Link from "next/link";
import { Zap } from "lucide-react";
import { utilityCategoryStyles } from "@/lib/utility-theme";
import { utilityBillers } from "@/lib/mock-data";

export function UtilityQuickTiles() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {utilityBillers.map((biller) => {
        const style = utilityCategoryStyles[biller.category];
        const Icon = style?.icon ?? Zap;
        return (
          <Link
            key={biller.category}
            href="/utility"
            className="flex flex-col items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:shadow-md"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${style?.iconBg}`}>
              <Icon size={18} />
            </span>
            <p className="text-sm font-semibold text-slate-900">{biller.category}</p>
            <p className="text-xs text-slate-500">{biller.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
