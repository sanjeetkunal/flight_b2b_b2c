import type { FlightSearchCriteria } from "./flight-search-form";

export function buildFlightResultsUrl(criteria: FlightSearchCriteria): string {
  const params = new URLSearchParams({
    from: criteria.from.code,
    to: criteria.to.code,
    date: criteria.departureDate,
    returnDate: criteria.returnDate,
    trip: criteria.tripType,
    adults: String(criteria.travellers.adults),
    children: String(criteria.travellers.children),
    infants: String(criteria.travellers.infants),
    cabin: criteria.travellers.cabinClass,
    fare: criteria.fareType,
    direct: String(criteria.directOnly),
  });
  return `/flights/results?${params.toString()}`;
}
