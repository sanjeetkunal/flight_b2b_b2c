import { Bus, Building2, Landmark, Plane, Star, Zap, Train } from "lucide-react";
import { Logo } from "@/app/components/brand/logo";
import { moduleTheme } from "@/lib/module-theme";
import { LoginForm } from "../login-form";

const modules = [
  { label: "Flights", icon: Plane, theme: moduleTheme.flights },
  { label: "Hotels", icon: Building2, theme: moduleTheme.hotels },
  { label: "Holidays", icon: Landmark, theme: moduleTheme.holidays },
  { label: "Trains", icon: Train, theme: moduleTheme.railway },
  { label: "Buses", icon: Bus, theme: moduleTheme.bus },
  { label: "Utility", icon: Zap, theme: moduleTheme.utility },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 0%, rgba(37,99,235,0.08), transparent 45%), radial-gradient(circle at 90% 10%, rgba(37,99,235,0.06), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-8">
        <Logo />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
              B2B Travel Agent Portal
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Unlock Your Potential. <span className="text-blue-600">Supercharge Your Travel Business.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Access an extensive inventory of flights, hotels, holidays, trains, buses, and utility payments. Our enterprise-grade platform provides everything you need to manage and grow your travel agency.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {modules.map(({ label, icon: Icon, theme }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 rounded-full ${theme.light} px-3 py-1.5 text-xs font-semibold ${theme.text}`}
                >
                  <Icon size={14} />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-900">4.9 / 5</span> average rating from over 75,000+
                registered travel partners
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
