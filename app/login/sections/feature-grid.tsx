import { Blocks, Layers, RefreshCcw, ShieldCheck, Smartphone, Wallet, Zap } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Instant Wallet Top-Ups",
    description: "Enjoy seamless transactions with instant wallet top-ups via UPI, net banking, or cards, ensuring zero delays.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Platform",
    description: "Access our fully mobile-friendly console to manage bookings and serve customers from anywhere, at any time.",
  },
  {
    icon: Layers,
    title: "Centralized Booking Dashboard",
    description: "Monitor all your bookings, payments, and commissions in one place with our intuitive and unified dashboard.",
  },
  {
    icon: Blocks,
    title: "All-in-One Travel Services",
    description: "Gain access to flights, hotels, holidays, trains, buses, and utility payments with a single login.",
  },
  {
    icon: RefreshCcw,
    title: "Effortless Amendments",
    description: "Quickly edit, cancel, and re-issue bookings with just a few clicks using our guided online workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Supplier Network",
    description: "Benefit from our direct contracts with leading airlines, hotels, and rail services for the best inventory and margins.",
  },
  {
    icon: Zap,
    title: "24/7 Priority Support",
    description: "Our dedicated support team is available around the clock to assist you with any queries or issues.",
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Why Travel Agents Choose OrbitTravel</h2>
          <p className="mt-3 text-base text-slate-500">
            We provide everything you need to streamline your operations, enhance your sales, and grow your agency with confidence.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white p-7 transition-colors hover:bg-blue-50/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
