"use client";

import { CalendarDays, MapPin, Search } from "lucide-react";
import { Field, Select, TextInput } from "@/app/components/ui/field";
import { Button } from "@/app/components/ui/button";

export function HolidaySearchForm() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Field label="Destination" icon={<MapPin size={12} />}>
          <TextInput placeholder="e.g. Bali, Kerala, Dubai" />
        </Field>
      </div>
      <div className="lg:col-span-3">
        <Field label="Travel Month" icon={<CalendarDays size={12} />}>
          <TextInput type="month" defaultValue="2026-08" />
        </Field>
      </div>
      <div className="lg:col-span-2">
        <Field label="Package Type">
          <Select defaultValue="All">
            <option value="All">All</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
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
