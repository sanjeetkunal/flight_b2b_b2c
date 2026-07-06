import { Globe2 } from "lucide-react";
import { cn } from "@/lib/cn";

export function Logo({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
        <Globe2 className={cn("h-5 w-5", iconClassName)} />
      </span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">
        Orbit<span className="text-blue-600">Travel</span>
      </span>
    </div>
  );
}
