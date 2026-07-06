"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plane,
  Building2,
  Palmtree,
  TrainFront,
  Zap,
  ClipboardList,
  Bell,
  Search,
  Settings,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Moon,
  Gift,
  User,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/app/components/brand/logo";
import { agent } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string }[];
};

function reportLinks(moduleHref: string, labels: string[]) {
  return labels.map((label) => ({
    label,
    href: `${moduleHref}?report=${label.toLowerCase().replace(/\s+/g, "-")}`,
  }));
}

const sidebarNavItems: SidebarNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Flights",
    href: "/flights",
    icon: Plane,
    children: reportLinks("/flights", [
      "Ticket Report",
      "Travel Calendar",
      "Refund Report",
      "Reissue Report",
      "Hold Pnr Report",
      "Ticket Status Report",
      "Import PNR",
      "Offline Request",
      "Offline Status",
    ]),
  },
  {
    label: "Hotels",
    href: "/hotels",
    icon: Building2,
    children: reportLinks("/hotels", [
      "Booking Report",
      "Cancellation Report",
      "Refund Report",
      "Voucher Status",
      "Offline Request",
      "Offline Status",
    ]),
  },
  {
    label: "Holidays",
    href: "/holidays",
    icon: Palmtree,
    children: reportLinks("/holidays", [
      "Package Report",
      "Itinerary Report",
      "Payment Report",
      "Refund Report",
      "Offline Request",
      "Offline Status",
    ]),
  },
  {
    label: "Railway",
    href: "/railway",
    icon: TrainFront,
    children: reportLinks("/railway", [
      "PNR Status Report",
      "Ticket Report",
      "Cancellation Report",
      "Refund Report",
      "TDR Status",
      "Offline Request",
    ]),
  },
  {
    label: "Utility",
    href: "/utility",
    icon: Zap,
    children: reportLinks("/utility", [
      "Recharge Report",
      "Bill Payment Report",
      "Failed Transaction Report",
      "Refund Report",
      "Commission Report",
    ]),
  },
  { label: "My Bookings", href: "/my-bookings", icon: ClipboardList },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [today, setToday] = useState("");
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }));
  }, []);

  useEffect(() => {
    const match = sidebarNavItems.find(
      (item) => item.children?.length && (pathname === item.href || pathname?.startsWith(`${item.href}/`))
    );
    if (match) setOpenLabel(match.label);
  }, [pathname]);

  const sidebar = (
    <div className="flex h-full w-64 flex-none flex-col overflow-y-auto border-r border-slate-200 bg-white px-4 py-5">
      <Logo className="px-2" />

      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const hasChildren = !!item.children?.length;
          const isOpen = openLabel === item.label;

          return (
            <div key={item.label}>
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => setOpenLabel(isOpen ? null : item.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform", isOpen && "rotate-180", isActive ? "text-white" : "text-slate-400")}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                  {item.label}
                </Link>
              )}

              {hasChildren && isOpen && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-100 pl-4">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                    >
                      <span className="h-1.5 w-1.5 flex-none rounded-sm bg-amber-500" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="space-y-4 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between rounded-xl px-3 py-2 text-sm">
          <span className="flex items-center gap-2 font-medium text-slate-600">
            <Moon size={16} className="text-slate-400" /> Dark Mode
          </span>
          <button
            type="button"
            onClick={() => setDarkMode((v) => !v)}
            aria-pressed={darkMode}
            aria-label="Toggle dark mode"
            className={cn("relative h-5 w-9 flex-none rounded-full transition-colors", darkMode ? "bg-blue-600" : "bg-slate-200")}
          >
            <span
              className={cn(
                "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                darkMode ? "translate-x-4" : "translate-x-0.5"
              )}
            />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-slate-900 p-4 text-white">
          <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Gift size={16} />
          </span>
          <p className="mt-2.5 text-sm font-semibold leading-snug">Unlock {agent.tier} Plus perks</p>
          <p className="mt-1 text-xs text-slate-300">Higher commissions & priority support</p>
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-gradient-to-r from-fuchsia-500 to-blue-500 py-2 text-xs font-semibold hover:opacity-90"
          >
            Upgrade Now
          </button>
        </div>

        <Link href="/login" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
          <LogOut size={17} /> Logout
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:block">{sidebar}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileOpen(false)} />
          <div className="relative">{sidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 flex-none items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search bookings, customers..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {today && (
              <span className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 sm:inline-flex">
                {today}
              </span>
            )}

            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Settings">
              <Settings size={18} />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full p-1 hover:bg-slate-100"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <User size={16} />
                </span>
                <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
                    <div className="border-b border-slate-100 px-3 py-2">
                      <p className="text-sm font-medium text-slate-900">{agent.name}</p>
                      <p className="text-xs text-slate-400">{agent.email}</p>
                      <p className="mt-1 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        {agent.tier}
                      </p>
                    </div>
                    <Link
                      href="/login"
                      className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut size={15} /> Sign out
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
