const supplyPartners = ["Amadeus", "Travelport", "Sabre", "TBO", "Hotelbeds", "Agoda", "Expedia TAAP", "RailYatri"];

export function PartnerLogos() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
          Backed by leading global supply partners
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {supplyPartners.map((partner) => (
            <span key={partner} className="text-sm font-semibold text-slate-400 transition-colors hover:text-slate-600">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
