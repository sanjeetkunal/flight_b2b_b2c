import { ChevronRight } from "lucide-react";

const footerColumns: { title: string; expandable?: boolean; links: string[] }[] = [
  {
    title: "Quick Links",
    expandable: true,
    links: [
      "Popular Airlines",
      "Popular Flight Routes",
      "Top U.S. Destinations",
      "Top International Destinations",
      "Site Directories",
      "Stay Connected",
      "International Sites",
    ],
  },
  {
    title: "Book",
    links: ["Cheap Flights", "Cheap Hotels", "Car Rentals", "Vacation Packages", "Group Travel", "Save & Earn $"],
  },
  {
    title: "Traveler Tools",
    links: [
      "Gift Cards",
      "Check My Booking",
      "Customer Support",
      "Online Check-in",
      "Airline Baggage Fees",
      "Client Testimonial",
      "Check Flight Status",
      "Travel Blog",
      "Local Guides",
    ],
  },
  {
    title: "About OrbitTravel",
    links: ["About Us", "Press Room", "Careers", "Affiliate Program", "Advertise with Us", "Newsletter"],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
      "Cookie Policy",
      "Price Match Promise",
      "Terms & Conditions",
      "Taxes & Fees",
      "Our Service Fees",
      "Post-Ticketing Fees",
      "Compassion Exception Policy",
      "Connection Protection",
      "Consumer Health Data Notice",
    ],
  },
];

const cardBadges = ["VISA", "Mastercard", "UnionPay", "DISC VER", "AMEX", "Diners Club", "PayPal", "Affirm"];

const trustLogos = [
  { src: "/images/footer-logo/IATA_Accredited_Agent_Logo_og.png", alt: "IATA Accredited Agent" },
  { src: "/images/footer-logo/Authorized-E-Ticket-Agent-of-IRCTC_3-1.png", alt: "IRCTC Authorised Agent" },
];

export function Footer() {
  return (
    <footer className="bg-[#0b1a4d] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="flex items-center gap-1 text-sm font-semibold text-white">
                {column.title}
                {column.expandable && <ChevronRight size={14} className="text-slate-400" />}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-slate-300/90 hover:text-white hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6">
          {trustLogos.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto object-contain opacity-60 brightness-0 invert grayscale transition-opacity hover:opacity-90"
            />
          ))}
          <span className="h-6 w-px bg-white/15" />
          {cardBadges.map((badge) => (
            <span
              key={badge}
              className="rounded border border-white/15 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-900"
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-slate-400">
          © 2006-{new Date().getFullYear()} OrbitTravel, Inc. All rights reserved.{" "}
          <a href="#" className="hover:text-white hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="hover:text-white hover:underline">
            Terms &amp; Conditions
          </a>{" "}
          apply.
        </p>
      </div>
    </footer>
  );
}
