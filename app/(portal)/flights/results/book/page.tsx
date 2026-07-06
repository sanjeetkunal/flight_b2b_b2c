import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { airports, flightSearchResults } from "@/lib/mock-data";
import { parsePrice } from "../../flight-utils";
import { TravellerDetailsForm } from "./traveller-details-form";

export default async function BookFlightPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const get = (key: string) => (typeof params[key] === "string" ? (params[key] as string) : "");

  const fromAirport = airports.find((airport) => airport.code === get("from"));
  const toAirport = airports.find((airport) => airport.code === get("to"));
  const fromCity = fromAirport ? `${fromAirport.city} (${fromAirport.code})` : get("from");
  const toCity = toAirport ? `${toAirport.city} (${toAirport.code})` : get("to");

  const flight = flightSearchResults.find((f) => f.flightNumber === get("flightNumber")) ?? flightSearchResults[0];
  const price = get("price") ? Number(get("price")) : parsePrice(flight.price);

  const adults = Math.max(1, Number(get("adults")) || 1);
  const children = Math.max(0, Number(get("children")) || 0);
  const infants = Math.max(0, Number(get("infants")) || 0);

  return (
    <div>
      <Link
        href={`/flights/results?${new URLSearchParams(
          Object.fromEntries(Object.entries(params).filter(([, v]) => typeof v === "string")) as Record<string, string>
        ).toString()}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={15} />
        Back to Results
      </Link>

      <TravellerDetailsForm
        flight={flight}
        price={price}
        fromCity={fromCity}
        toCity={toCity}
        adults={adults}
        children={children}
        infants={infants}
        cabinClass={get("cabin") || "Economy"}
      />
    </div>
  );
}
