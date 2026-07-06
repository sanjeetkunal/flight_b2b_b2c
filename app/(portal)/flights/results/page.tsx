import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { airports } from "@/lib/mock-data";
import { FlightResults } from "../flight-results";

export default async function FlightResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const fromCode = typeof params.from === "string" ? params.from : "";
  const toCode = typeof params.to === "string" ? params.to : "";
  const date = typeof params.date === "string" ? params.date : "";

  const fromAirport = airports.find((airport) => airport.code === fromCode);
  const toAirport = airports.find((airport) => airport.code === toCode);

  const fromCity = fromAirport ? `${fromAirport.city} (${fromAirport.code})` : fromCode;
  const toCity = toAirport ? `${toAirport.city} (${toAirport.code})` : toCode;

  return (
    <div>
      <Link href="/flights" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700">
        <ArrowLeft size={15} />
        Modify Search
      </Link>
      <FlightResults fromCity={fromCity} toCity={toCity} date={date} />
    </div>
  );
}
