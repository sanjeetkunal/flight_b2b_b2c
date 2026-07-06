import type { ReactNode } from "react";
import { TopNav } from "@/app/components/layout/top-nav";
import { Footer } from "@/app/components/layout/footer";

export function PortalShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-200">
      <TopNav />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-0 pb-6 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
      <Footer />
    </div>
  );
}
