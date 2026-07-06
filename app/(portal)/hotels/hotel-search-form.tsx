"use client";

import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { Field, Select, TextInput } from "@/app/components/ui/field";
import { Button } from "@/app/components/ui/button";
import { hotelCities } from "@/lib/mock-data";

export function HotelSearchForm() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Field label="Destination" icon={<MapPin size={12} />}>
          <input
            list="hero-hotel-cities"
            defaultValue="Mumbai"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <datalist id="hero-hotel-cities">
            {hotelCities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:col-span-4">
        <Field label="Check-in" icon={<CalendarDays size={12} />}>
          <TextInput type="date" defaultValue="2026-07-12" />
        </Field>
        <Field label="Check-out" icon={<CalendarDays size={12} />}>
          <TextInput type="date" defaultValue="2026-07-14" />
        </Field>
      </div>
      <div className="lg:col-span-2">
        <Field label="Rooms & Guests" icon={<Users size={12} />}>
          <Select defaultValue="1-2">
            <option value="1-1">1 Room, 1 Guest</option>
            <option value="1-2">1 Room, 2 Guests</option>
            <option value="2-4">2 Rooms, 4 Guests</option>
            <option value="3-6">3 Rooms, 6 Guests</option>
          </Select>
        </Field>
      </div>
      <div className="flex items-end lg:col-span-2">
        <Button size="lg" className="w-full gap-2">
          <Search size={16} />
          Search
        </Button>
      </div>
    </div>
  );
}
