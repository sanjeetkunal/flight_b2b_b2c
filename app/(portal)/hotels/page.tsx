import { Building2, MapPin, Star } from "lucide-react";
import { ModuleHero } from "@/app/components/booking/module-hero";
import { HotelSearchForm } from "./hotel-search-form";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { moduleTheme } from "@/lib/module-theme";
import { featuredHotels } from "@/lib/mock-data";

export default function HotelsPage() {
  return (
    <div>
      <ModuleHero
        icon={Building2}
        title="Hotel Booking"
        subtitle="Search domestic & international hotels with real-time availability."
        gradient={moduleTheme.hotels.gradient}
      >
        <HotelSearchForm />
      </ModuleHero>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Featured Hotels</h2>
          <span className="text-xs text-slate-400">{featuredHotels.length} properties</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featuredHotels.map((hotel) => (
            <div key={hotel.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-32 items-center justify-center bg-gradient-to-br from-fuchsia-50 to-purple-100 text-fuchsia-300">
                <Building2 size={40} />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{hotel.name}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin size={12} /> {hotel.city}
                    </p>
                  </div>
                  <Badge tone="info">{hotel.tag}</Badge>
                </div>

                <div className="mt-2 flex items-center gap-1.5">
                  <span className="flex items-center gap-0.5 rounded bg-emerald-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                    <Star size={11} className="fill-white" /> {hotel.rating}
                  </span>
                  <span className="text-xs text-slate-400">({hotel.reviews.toLocaleString("en-IN")} reviews)</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {hotel.amenities.map((amenity) => (
                    <span key={amenity} className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-slate-400 line-through">{hotel.originalPrice}</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {hotel.price} <span className="text-xs font-normal text-slate-400">/ night</span>
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View Rooms
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
