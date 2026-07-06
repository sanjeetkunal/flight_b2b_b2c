export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9]/g, "")) || 0;
}

export function formatPrice(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function parseDurationMinutes(duration: string): number {
  const match = duration.match(/(\d+)h\s*(\d+)?m?/);
  const hours = match ? Number(match[1]) : 0;
  const minutes = match?.[2] ? Number(match[2]) : 0;
  return hours * 60 + minutes;
}

export function parseTimeMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function extractLayoverCode(stops: string): string | null {
  const match = stops.match(/([A-Z]{3})\s*$/);
  return match ? match[1] : null;
}

export const timeSlotBuckets = [
  { key: "night", label: "12:00 AM - 06:00 AM", startHour: 0, endHour: 6 },
  { key: "morning", label: "06:00 AM - 12:00 PM", startHour: 6, endHour: 12 },
  { key: "afternoon", label: "12:00 PM - 06:00 PM", startHour: 12, endHour: 18 },
  { key: "evening", label: "06:00 PM - 12:00 AM", startHour: 18, endHour: 24 },
] as const;

export type TimeSlotKey = (typeof timeSlotBuckets)[number]["key"];

export function timeSlotForDeparture(time: string): TimeSlotKey {
  const hour = Math.floor(parseTimeMinutes(time) / 60);
  return timeSlotBuckets.find((slot) => hour >= slot.startHour && hour < slot.endHour)?.key ?? "night";
}

export function addMinutesToTime(time: string, minutesToAdd: number): string {
  const normalized = ((parseTimeMinutes(time) + minutesToAdd) % 1440 + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function formatMinutesDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function parseCityLabel(label: string): { name: string; code: string } {
  const match = label.match(/^(.*?)\s*\(([A-Z]{3})\)\s*$/);
  return match ? { name: match[1], code: match[2] } : { name: label, code: "" };
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash;
}

const terminalPool = ["1", "2", "3", "A", "B", "C", "D"];
const aircraftPool = ["Airbus A320neo", "Boeing 737-800", "Airbus A321", "Boeing 787-8", "ATR 72-600"];
const seatLetters = "ABCDEF";

export type FlightLeg = {
  flightNumber: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departure: string;
  arrival: string;
  duration: string;
  terminal: string;
  gate: string;
  seat: string;
  cabinClass: string;
  mealAvailable: boolean;
  aircraft: string;
};

// Deterministic per-flight/leg placeholders for fields the mock dataset doesn't carry (terminal, gate, seat, aircraft).
function synthesizeLegExtras(seed: string) {
  const hash = hashString(seed);
  return {
    terminal: terminalPool[hash % terminalPool.length],
    gate: `${terminalPool[(hash >>> 3) % terminalPool.length]}${(hash % 30) + 1}`,
    seat: `${(hash % 32) + 1}${seatLetters[(hash >>> 5) % seatLetters.length]}`,
    mealAvailable: hash % 2 === 0,
    aircraft: aircraftPool[(hash >>> 7) % aircraftPool.length],
  };
}

export function buildFlightLegs(
  flight: { flightNumber: string; departure: string; arrival: string; duration: string; stops: string; classAvailability: string },
  fromCityLabel: string,
  toCityLabel: string,
  layoverCityName: string | null
): { legs: FlightLeg[]; layoverDuration: string | null } {
  const from = parseCityLabel(fromCityLabel);
  const to = parseCityLabel(toCityLabel);
  const cabinClass = flight.classAvailability.split("·")[0].trim();
  const layoverCode = extractLayoverCode(flight.stops);

  if (!layoverCode || !layoverCityName) {
    const extras = synthesizeLegExtras(flight.flightNumber);
    return {
      legs: [
        {
          flightNumber: flight.flightNumber,
          fromCode: from.code,
          fromCity: from.name,
          toCode: to.code,
          toCity: to.name,
          departure: flight.departure,
          arrival: flight.arrival,
          duration: flight.duration,
          cabinClass,
          ...extras,
        },
      ],
      layoverDuration: null,
    };
  }

  const depMinutes = parseTimeMinutes(flight.departure);
  const arrMinutesRaw = parseTimeMinutes(flight.arrival);
  const totalBlockMinutes = arrMinutesRaw > depMinutes ? arrMinutesRaw - depMinutes : arrMinutesRaw + 1440 - depMinutes;

  const hash = hashString(flight.flightNumber);
  const layoverMinutes = Math.max(45, Math.min(75, Math.round(totalBlockMinutes * 0.25), totalBlockMinutes - 60));
  const flyingMinutes = Math.max(totalBlockMinutes - layoverMinutes, 40);
  const leg1Minutes = Math.round(flyingMinutes * (0.4 + (hash % 20) / 100));
  const leg2Minutes = flyingMinutes - leg1Minutes;

  const leg1Arrival = addMinutesToTime(flight.departure, leg1Minutes);
  const leg2Departure = addMinutesToTime(leg1Arrival, layoverMinutes);

  const [airlineCode, numberPart] = flight.flightNumber.split("-");
  const connectingFlightNumber = numberPart ? `${airlineCode}-${Number(numberPart) + 1}` : `${flight.flightNumber}A`;

  return {
    legs: [
      {
        flightNumber: flight.flightNumber,
        fromCode: from.code,
        fromCity: from.name,
        toCode: layoverCode,
        toCity: layoverCityName,
        departure: flight.departure,
        arrival: leg1Arrival,
        duration: formatMinutesDuration(leg1Minutes),
        cabinClass,
        ...synthesizeLegExtras(`${flight.flightNumber}-1`),
      },
      {
        flightNumber: connectingFlightNumber,
        fromCode: layoverCode,
        fromCity: layoverCityName,
        toCode: to.code,
        toCity: to.name,
        departure: leg2Departure,
        arrival: flight.arrival,
        duration: formatMinutesDuration(leg2Minutes),
        cabinClass,
        ...synthesizeLegExtras(`${flight.flightNumber}-2`),
      },
    ],
    layoverDuration: formatMinutesDuration(layoverMinutes),
  };
}

type ShareableFlight = {
  airline: string;
  flightNumber: string;
  day: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
  classAvailability: string;
  passengers: string;
  displayPrice: number;
};

// Customer-facing message — deliberately excludes agent commission data.
export function buildWhatsAppShareMessage(flights: ShareableFlight[], fromCity: string, toCity: string, dateLabel: string): string {
  const lines: string[] = [`✈️ *Flight Options* — ${fromCity} → ${toCity}`, `📅 ${dateLabel}`, ""];

  flights.forEach((flight, index) => {
    lines.push(`${index + 1}) *${flight.airline} ${flight.flightNumber}*`);
    lines.push(`    🕐 ${flight.departure} → ${flight.arrival}  (${flight.duration}, ${flight.stops})`);
    lines.push(`    💺 ${flight.classAvailability}`);
    lines.push(`    💰 *${formatPrice(flight.displayPrice)}* · ${flight.passengers}`);
    lines.push("");
  });

  lines.push("Reply to this message to confirm your booking.");
  lines.push("_Shared via OrbitTravel Agent Portal_");
  return lines.join("\n");
}

export function buildWhatsAppShareUrl(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
