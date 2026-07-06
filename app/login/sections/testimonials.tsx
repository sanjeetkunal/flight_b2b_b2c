import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohit Sharma",
    agency: "Sharma Travels & Tours, New Delhi",
    quote:
      "Running flights, hotels and railway bookings from one wallet has cut our daily reconciliation work in half.",
    initials: "RS",
    color: "bg-blue-600",
  },
  {
    name: "Vikas Mulchandani",
    agency: "Treebo Business Head, Mumbai",
    quote:
      "The commission visibility is exactly what our counter staff needed — no more calling support to check payouts.",
    initials: "VM",
    color: "bg-emerald-600",
  },
  {
    name: "Palak Dogra",
    agency: "Travolution Travels, Delhi",
    quote: "Amendments used to take a full day over email. Now our agents resolve them in minutes on OrbitTravel.",
    initials: "PD",
    color: "bg-fuchsia-600",
  },
  {
    name: "Pravin Eshwari",
    agency: "Eshwari Travels Pvt. Ltd., Bengaluru",
    quote: "Reliable is the word we'd use for OrbitTravel. Confirmations are fast even during peak season.",
    initials: "PE",
    color: "bg-amber-600",
  },
];

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Agents across India trust OrbitTravel</h2>
          <p className="mt-3 text-base text-slate-500">Over 60,000 travel businesses rely on us for seamless bookings.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-semibold text-white ${testimonial.color}`}>
                  {testimonial.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="truncate text-xs text-slate-400">{testimonial.agency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
