import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { HeroShell } from "@/app/components/booking/hero-shell";

export function ModuleHero({
  icon: Icon,
  title,
  subtitle,
  gradient,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  gradient: string;
  children: ReactNode;
}) {
  return (
    <HeroShell
      gradient={gradient}
      top={
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25">
            <Icon size={24} />
          </span>
          <div>
            <h1 className="text-xl font-semibold sm:text-2xl">{title}</h1>
            <p className="mt-1 text-sm text-white/80">{subtitle}</p>
          </div>
        </div>
      }
    >
      {children}
    </HeroShell>
  );
}
