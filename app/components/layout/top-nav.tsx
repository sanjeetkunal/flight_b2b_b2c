"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, LogOut, Menu, User, X } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Logo } from "@/app/components/brand/logo";
import { topNavItems } from "@/lib/nav";
import { agent } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {topNavItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon size={16} className={isActive ? "text-blue-600" : "text-slate-400"} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden flex items-center gap-2 px-3 py-1.5 sm:flex relative">
            <DotLottieReact
              src="https://lottie.host/5c7e2639-f7bd-40b1-a0e7-34b46a125395/DQepUDpynf.lottie"
              loop
              autoplay
              className="h-15 w-20"
            />
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Wallet</p>
              <p className="text-sm font-semibold text-slate-900">₹{agent.walletBalance.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications">
            <Bell size={19} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((value) => !value)}
              className="flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-2.5 hover:bg-slate-50"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <User size={15} />
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-xs font-semibold text-slate-800">{agent.name}</span>
                <span className="block text-[10px] text-slate-400">{agent.agentId}</span>
              </span>
              <ChevronDown size={14} className="text-slate-400" />
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
                    <LogOut size={15} />
                    Sign out
                  </Link>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="space-y-1 border-t border-slate-100 px-4 py-3 lg:hidden">
          {topNavItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <item.icon size={17} className={isActive ? "text-blue-600" : "text-slate-400"} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
