export const agent = {
  name: "Rohit Sharma",
  agentId: "AG-10234",
  agencyName: "Sharma Travels & Tours",
  tier: "Gold Partner",
  email: "rohit.sharma@sharmatravels.in",
  phone: "+91 98765 43210",
  walletBalance: 128450,
  creditLimit: 500000,
  city: "New Delhi",
};

export type Trend = "up" | "down";

export const dashboardStats: {
  label: string;
  value: string;
  previous: string;
  change: string;
  trend: Trend;
  sparkline: number[];
}[] = [
  { label: "Wallet Balance", value: "₹1,28,450", previous: "₹1,14,270", change: "+12.4%", trend: "up", sparkline: [40, 38, 45, 42, 50, 48, 55, 60, 58, 65, 72, 80] },
  { label: "Bookings this month", value: "186", previous: "172", change: "+8.2%", trend: "up", sparkline: [50, 48, 52, 55, 50, 58, 62, 60, 66, 70, 68, 75] },
  { label: "Total sales (MTD)", value: "₹42.6L", previous: "₹40.5L", change: "+5.1%", trend: "up", sparkline: [45, 50, 48, 55, 52, 60, 58, 65, 70, 68, 74, 82] },
  { label: "Pending approvals", value: "4", previous: "6", change: "-2", trend: "down", sparkline: [70, 68, 72, 65, 68, 60, 62, 55, 58, 50, 48, 40] },
];

export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";
export type BookingType = "Flight" | "Hotel" | "Holiday" | "Railway" | "Utility";

export const recentBookings: {
  id: string;
  type: BookingType;
  reference: string;
  customer: string;
  detail: string;
  date: string;
  amount: string;
  status: BookingStatus;
}[] = [
  { id: "1", type: "Flight", reference: "FL-88213", customer: "Ankit Verma", detail: "DEL → BOM · IndiGo 6E-204", date: "01 Jul 2026", amount: "₹6,240", status: "Confirmed" },
  { id: "2", type: "Hotel", reference: "HT-44190", customer: "Priya Nair", detail: "Taj Lands End, Mumbai · 2N", date: "01 Jul 2026", amount: "₹18,500", status: "Confirmed" },
  { id: "3", type: "Holiday", reference: "HP-10932", customer: "The Malhotra Family", detail: "Bali 5N/6D Package", date: "30 Jun 2026", amount: "₹1,84,000", status: "Pending" },
  { id: "4", type: "Railway", reference: "RL-77201", customer: "Suresh Iyer", detail: "12951 Mumbai Rajdhani · 2A", date: "30 Jun 2026", amount: "₹3,415", status: "Confirmed" },
  { id: "5", type: "Utility", reference: "UT-30044", customer: "Neha Gupta", detail: "Electricity Bill · BSES Delhi", date: "29 Jun 2026", amount: "₹2,180", status: "Confirmed" },
  { id: "6", type: "Flight", reference: "FL-88099", customer: "Karan Mehta", detail: "BLR → DEL · Air India AI-505", date: "29 Jun 2026", amount: "₹8,120", status: "Cancelled" },
];

export const popularCities = [
  "Delhi (DEL)",
  "Mumbai (BOM)",
  "Bengaluru (BLR)",
  "Hyderabad (HYD)",
  "Chennai (MAA)",
  "Kolkata (CCU)",
  "Pune (PNQ)",
  "Goa (GOI)",
  "Jaipur (JAI)",
  "Ahmedabad (AMD)",
  "Kochi (COK)",
  "Lucknow (LKO)",
];

export const popularRoutes: {
  from: string;
  to: string;
  airline: string;
  duration: string;
  price: string;
  stops: string;
}[] = [
  { from: "Delhi", to: "Mumbai", airline: "IndiGo", duration: "2h 10m", price: "₹4,599", stops: "Non-stop" },
  { from: "Bengaluru", to: "Delhi", airline: "Air India", duration: "2h 45m", price: "₹5,899", stops: "Non-stop" },
  { from: "Mumbai", to: "Goa", airline: "Vistara", duration: "1h 20m", price: "₹3,299", stops: "Non-stop" },
  { from: "Delhi", to: "Bengaluru", airline: "SpiceJet", duration: "2h 50m", price: "₹4,999", stops: "Non-stop" },
  { from: "Chennai", to: "Hyderabad", airline: "IndiGo", duration: "1h 15m", price: "₹2,899", stops: "Non-stop" },
  { from: "Kolkata", to: "Delhi", airline: "Air India", duration: "2h 20m", price: "₹5,299", stops: "Non-stop" },
];

export const flightFareTypes = ["Regular", "Student", "Senior Citizen", "Armed Forces"];

export type Airport = { city: string; code: string; name: string; country: string };

export const airports: Airport[] = [
  { city: "Delhi", code: "DEL", name: "Indira Gandhi International Airport", country: "India" },
  { city: "Mumbai", code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", country: "India" },
  { city: "Bengaluru", code: "BLR", name: "Kempegowda International Airport", country: "India" },
  { city: "Hyderabad", code: "HYD", name: "Rajiv Gandhi International Airport", country: "India" },
  { city: "Chennai", code: "MAA", name: "Chennai International Airport", country: "India" },
  { city: "Kolkata", code: "CCU", name: "Netaji Subhas Chandra Bose International Airport", country: "India" },
  { city: "Pune", code: "PNQ", name: "Pune Airport", country: "India" },
  { city: "Goa", code: "GOI", name: "Manohar International Airport", country: "India" },
  { city: "Jaipur", code: "JAI", name: "Jaipur International Airport", country: "India" },
  { city: "Ahmedabad", code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", country: "India" },
  { city: "Kochi", code: "COK", name: "Cochin International Airport", country: "India" },
  { city: "Lucknow", code: "LKO", name: "Chaudhary Charan Singh International Airport", country: "India" },
  { city: "Dubai", code: "DXB", name: "Dubai International Airport", country: "UAE" },
  { city: "Singapore", code: "SIN", name: "Changi Airport", country: "Singapore" },
  { city: "Bangkok", code: "BKK", name: "Suvarnabhumi Airport", country: "Thailand" },
];

export const airlineLogos: Record<string, string> = {
  IndiGo: "/images/flight-logo/6E_IndiGo_India_Dec2022_v3.png",
  Vistara: "/images/flight-logo/Vistara_Airlines.png",
  AirAsia: "/images/flight-logo/AirAsia-300x230.png",
  "All Nippon Airways": "/images/flight-logo/All_Nippon_Air-300x230.png",
  "Asiana Airlines": "/images/flight-logo/Asiana_Airlines-300x230.png",
  "British Airways": "/images/flight-logo/British_Airways-300x230.png",
  KLM: "/images/flight-logo/KLM-300x230.png",
  "Qatar Airways": "/images/flight-logo/Qatar_Airways-300x230.png",
  "SriLankan Airlines": "/images/flight-logo/SriLankan_Airlines-300x230.png",
  Swissair: "/images/flight-logo/Swissair-300x230.png",
  "Turkish Airlines": "/images/flight-logo/Turkish_Airlines-300x230.png",
};

export type FlightFareOption = {
  fareType: string;
  price: string;
  refundable: boolean;
  baggage: string;
  commissionPercent: number;
  seatsLeft: number;
};

export const flightSearchResults: {
  airline: string;
  flightNumber: string;
  day: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
  price: string;
  classAvailability: string;
  tag: "Super Deal" | "Recommended" | "Lowest Price" | null;
  passengers: string;
  refundable: boolean;
  baggage: string;
  commissionPercent: number;
  fareOptions: FlightFareOption[];
}[] = [
  {
    airline: "IndiGo", flightNumber: "6E-204", day: "Monday", departure: "06:15", arrival: "08:25", duration: "2h 10m", stops: "Non-stop", price: "₹4,599", classAvailability: "Economy · 12 seats left", tag: "Super Deal", passengers: "1 Adult", refundable: true, baggage: "15 Kg", commissionPercent: 5,
    fareOptions: [
      { fareType: "Published Fare", price: "₹4,599", refundable: true, baggage: "15 Kg", commissionPercent: 5, seatsLeft: 12 },
      { fareType: "SME Fare", price: "₹4,450", refundable: true, baggage: "15 Kg", commissionPercent: 6, seatsLeft: 8 },
      { fareType: "Corporate Fare", price: "₹4,720", refundable: true, baggage: "20 Kg", commissionPercent: 4, seatsLeft: 5 },
    ],
  },
  {
    airline: "Air India", flightNumber: "AI-505", day: "Monday", departure: "09:40", arrival: "11:55", duration: "2h 15m", stops: "Non-stop", price: "₹5,899", classAvailability: "Economy · 6 seats left", tag: "Recommended", passengers: "1 Adult", refundable: true, baggage: "20 Kg", commissionPercent: 6,
    fareOptions: [
      { fareType: "Published Fare", price: "₹5,899", refundable: true, baggage: "20 Kg", commissionPercent: 6, seatsLeft: 6 },
      { fareType: "Flexi Fare", price: "₹6,150", refundable: true, baggage: "20 Kg", commissionPercent: 7, seatsLeft: 4 },
      { fareType: "Corporate Fare", price: "₹5,750", refundable: false, baggage: "20 Kg", commissionPercent: 5, seatsLeft: 3 },
    ],
  },
  {
    airline: "Vistara", flightNumber: "UK-955", day: "Monday", departure: "13:20", arrival: "15:35", duration: "2h 15m", stops: "Non-stop", price: "₹6,250", classAvailability: "Premium Economy · 9 seats left", tag: "Lowest Price", passengers: "1 Adult", refundable: false, baggage: "20 Kg", commissionPercent: 4.5,
    fareOptions: [
      { fareType: "Published Fare", price: "₹6,250", refundable: false, baggage: "20 Kg", commissionPercent: 4.5, seatsLeft: 9 },
      { fareType: "SME Fare", price: "₹6,100", refundable: false, baggage: "20 Kg", commissionPercent: 5.5, seatsLeft: 6 },
      { fareType: "Flexi Plus Fare", price: "₹6,980", refundable: true, baggage: "25 Kg", commissionPercent: 4, seatsLeft: 2 },
    ],
  },
  {
    airline: "SpiceJet", flightNumber: "SG-8169", day: "Monday", departure: "17:05", arrival: "19:45", duration: "2h 40m", stops: "1 Stop · BLR", price: "₹4,150", classAvailability: "Economy · 20 seats left", tag: null, refundable: false, passengers: "1 Adult", baggage: "15 Kg", commissionPercent: 7,
    fareOptions: [
      { fareType: "Published Fare", price: "₹4,150", refundable: false, baggage: "15 Kg", commissionPercent: 7, seatsLeft: 20 },
      { fareType: "SME Fare", price: "₹4,020", refundable: false, baggage: "15 Kg", commissionPercent: 8, seatsLeft: 14 },
      { fareType: "Corporate Fare", price: "₹4,310", refundable: true, baggage: "20 Kg", commissionPercent: 6, seatsLeft: 5 },
    ],
  },
  {
    airline: "Air India", flightNumber: "AI-661", day: "Monday", departure: "20:30", arrival: "22:40", duration: "2h 10m", stops: "Non-stop", price: "₹7,499", classAvailability: "Business · 4 seats left", tag: null, passengers: "1 Adult", refundable: true, baggage: "25 Kg", commissionPercent: 8,
    fareOptions: [
      { fareType: "Published Fare", price: "₹7,499", refundable: true, baggage: "25 Kg", commissionPercent: 8, seatsLeft: 4 },
      { fareType: "Flexi Fare", price: "₹7,850", refundable: true, baggage: "25 Kg", commissionPercent: 9, seatsLeft: 2 },
      { fareType: "Corporate Fare", price: "₹7,320", refundable: true, baggage: "30 Kg", commissionPercent: 7, seatsLeft: 3 },
    ],
  },
];

export const flightFareCalendar = [
  { day: "Tue", date: "28 May", price: "₹4,599" },
  { day: "Wed", date: "29 May", price: "₹4,150" },
  { day: "Thu", date: "30 May", price: "₹4,899" },
  { day: "Fri", date: "31 May", price: "₹4,150", selected: true },
  { day: "Sat", date: "01 Jun", price: "₹4,899" },
  { day: "Sun", date: "02 Jun", price: "₹5,250" },
  { day: "Mon", date: "03 Jun", price: "₹4,899" },
];

export const savedGstProfiles: { id: string; gstin: string; businessName: string; address: string }[] = [
  { id: "gst-1", gstin: "07ABCDE1234F1Z5", businessName: "Sharma Travels & Tours", address: "Connaught Place, New Delhi - 110001" },
  { id: "gst-2", gstin: "07XYZAB5678K1Z9", businessName: "Sharma Corporate Travel Desk", address: "Nehru Place, New Delhi - 110019" },
];

export const flightCoupons: { code: string; type: "flat" | "percent"; value: number; maxDiscount?: number; description: string }[] = [
  { code: "FIRST100", type: "flat", value: 100, description: "Flat ₹100 off on this booking" },
  { code: "SAVE5", type: "percent", value: 5, maxDiscount: 500, description: "5% off, up to ₹500" },
];

export const hotelCities = [
  "Mumbai",
  "Goa",
  "Jaipur",
  "Udaipur",
  "Manali",
  "Shimla",
  "Kerala (Munnar)",
  "Rishikesh",
  "Andaman",
  "Darjeeling",
];

export const featuredHotels: {
  name: string;
  city: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice: string;
  amenities: string[];
  tag: string;
}[] = [
  { name: "Taj Lands End", city: "Mumbai", rating: 4.7, reviews: 2140, price: "₹9,250", originalPrice: "₹11,500", amenities: ["Free WiFi", "Pool", "Spa", "Sea View"], tag: "Luxury" },
  { name: "The Leela Palace", city: "Udaipur", rating: 4.8, reviews: 1860, price: "₹14,800", originalPrice: "₹18,000", amenities: ["Lake View", "Free Breakfast", "Pool"], tag: "Premium" },
  { name: "Novotel Goa Resort", city: "Goa", rating: 4.4, reviews: 3210, price: "₹6,400", originalPrice: "₹8,100", amenities: ["Beachfront", "Free WiFi", "Bar"], tag: "Best Seller" },
  { name: "ITC Rajputana", city: "Jaipur", rating: 4.6, reviews: 1490, price: "₹7,900", originalPrice: "₹9,600", amenities: ["Free WiFi", "Spa", "Airport Pickup"], tag: "Popular" },
  { name: "Wildflower Hall", city: "Shimla", rating: 4.9, reviews: 980, price: "₹16,200", originalPrice: "₹19,500", amenities: ["Mountain View", "Spa", "Free Breakfast"], tag: "Luxury" },
  { name: "Vivanta Munnar", city: "Kerala (Munnar)", rating: 4.5, reviews: 1120, price: "₹8,600", originalPrice: "₹10,400", amenities: ["Tea Estate View", "Free WiFi"], tag: "Popular" },
];

export const holidayPackages: {
  title: string;
  destination: string;
  duration: string;
  price: string;
  category: string;
  rating: number;
  inclusions: string[];
}[] = [
  { title: "Magical Bali Escape", destination: "Bali, Indonesia", duration: "5N / 6D", price: "₹36,999", category: "International", rating: 4.6, inclusions: ["Flights", "4★ Hotel", "Breakfast", "Sightseeing"] },
  { title: "Royal Rajasthan Trail", destination: "Jaipur - Udaipur - Jodhpur", duration: "6N / 7D", price: "₹24,499", category: "Domestic", rating: 4.5, inclusions: ["Hotel", "Cab", "Breakfast"] },
  { title: "Swiss Alps Wonder", destination: "Zurich - Interlaken - Lucerne", duration: "7N / 8D", price: "₹1,42,000", category: "International", rating: 4.8, inclusions: ["Flights", "Visa", "4★ Hotel", "Eurail Pass"] },
  { title: "Kerala Backwaters Bliss", destination: "Munnar - Alleppey - Kochi", duration: "5N / 6D", price: "₹21,999", category: "Domestic", rating: 4.7, inclusions: ["Houseboat", "Hotel", "Breakfast"] },
  { title: "Dubai Delight", destination: "Dubai, UAE", duration: "4N / 5D", price: "₹48,500", category: "International", rating: 4.4, inclusions: ["Flights", "Visa", "Desert Safari"] },
  { title: "Kashmir Paradise", destination: "Srinagar - Gulmarg - Pahalgam", duration: "5N / 6D", price: "₹27,999", category: "Domestic", rating: 4.6, inclusions: ["Houseboat", "Hotel", "Cab", "Breakfast"] },
];

export const utilityBillers: {
  category: string;
  description: string;
  commission: string;
}[] = [
  { category: "Mobile Recharge", description: "Prepaid & postpaid, all operators", commission: "2.5%" },
  { category: "DTH Recharge", description: "Tata Play, Dish TV, Airtel Digital", commission: "2.0%" },
  { category: "Electricity Bill", description: "500+ boards across India", commission: "1.2%" },
  { category: "Water Bill", description: "Municipal water bill payments", commission: "1.0%" },
  { category: "Broadband / Landline", description: "BSNL, Airtel, Jio Fiber & more", commission: "1.8%" },
  { category: "LPG Booking", description: "Indane, Bharat Gas, HP Gas", commission: "0.8%" },
  { category: "FASTag Recharge", description: "All NHAI approved banks", commission: "1.5%" },
  { category: "Insurance Premium", description: "Life, health & motor renewals", commission: "3.0%" },
];

export const railwayStations = [
  "New Delhi (NDLS)",
  "Mumbai Central (MMCT)",
  "Bengaluru City (SBC)",
  "Chennai Central (MAS)",
  "Howrah Jn (HWH)",
  "Pune Jn (PUNE)",
  "Ahmedabad Jn (ADI)",
  "Lucknow Jn (LKO)",
  "Jaipur Jn (JP)",
  "Patna Jn (PNBE)",
];

export const trainResults: {
  trainNo: string;
  trainName: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  classes: { code: string; fare: string; availability: string; status: "Available" | "Waitlist" | "RAC" }[];
}[] = [
  {
    trainNo: "12951",
    trainName: "Mumbai Rajdhani",
    from: "NDLS",
    to: "MMCT",
    departure: "16:25",
    arrival: "08:35",
    duration: "16h 10m",
    classes: [
      { code: "3A", fare: "₹2,845", availability: "AVL 42", status: "Available" },
      { code: "2A", fare: "₹4,120", availability: "AVL 18", status: "Available" },
      { code: "1A", fare: "₹6,995", availability: "AVL 6", status: "Available" },
    ],
  },
  {
    trainNo: "12301",
    trainName: "Howrah Rajdhani",
    from: "NDLS",
    to: "HWH",
    departure: "16:55",
    arrival: "10:05",
    duration: "17h 10m",
    classes: [
      { code: "3A", fare: "₹2,690", availability: "WL 12", status: "Waitlist" },
      { code: "2A", fare: "₹3,940", availability: "AVL 9", status: "Available" },
    ],
  },
  {
    trainNo: "12259",
    trainName: "Sealdah Duronto",
    from: "NDLS",
    to: "SDAH",
    departure: "10:55",
    arrival: "05:20",
    duration: "18h 25m",
    classes: [
      { code: "SL", fare: "₹865", availability: "RAC 4", status: "RAC" },
      { code: "3A", fare: "₹2,315", availability: "AVL 27", status: "Available" },
    ],
  },
];
