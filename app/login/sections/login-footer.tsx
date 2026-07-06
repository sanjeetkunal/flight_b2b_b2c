import { Headset } from "lucide-react";
import { Logo } from "@/app/components/brand/logo";

export function LoginFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">
        <Logo className="scale-90" />
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Headset size={14} />
          24x7 Partner Support · partners@orbittravel.example
        </div>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} OrbitTravel. All rights reserved.</p>
      </div>
    </footer>
  );
}
