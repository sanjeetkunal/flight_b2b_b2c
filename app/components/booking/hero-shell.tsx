import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const HERO_IMAGE_URL = "/images/hero-bg.jpg";

export function HeroShell({
  gradient,
  top,
  children,
}: {
  gradient: string;
  top: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative mb-8">
      <div className="relative left-[calc(50%-50vw)] w-screen overflow-hidden rounded-b-[50%_40px] py-14 text-white sm:rounded-b-[50%_60px] sm:py-20 lg:rounded-b-[50%_80px] lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
        />
        {/* brand color tint blended with the photo so detail still shows through */}
        <div className={cn("absolute inset-0 mix-blend-multiply opacity-80")} />
        {/* dark scrim, strongest behind the text corner, fading out so the image reads clearly elsewhere */}
        {/* <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(115deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.05) 70%)",
          }}
        /> */}
        {/* <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.55), transparent 40%), radial-gradient(circle at 88% 15%, rgba(255,255,255,0.3), transparent 35%), radial-gradient(circle at 85% 95%, rgba(255,255,255,0.35), transparent 45%)",
          }}
        /> */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{top}</div>
      </div>
      <div className="relative -mt-16 rounded-2xl bg-white p-4 shadow-[0_-8px_20px_-12px_rgba(15,23,42,0.15)] sm:-mt-24 sm:p-6 lg:-mt-28">
        {children}
      </div>
    </div>
  );
}
