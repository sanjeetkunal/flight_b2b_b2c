export type MealOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  tag: "None" | "Veg" | "Non-Veg" | "Vegan" | "Jain" | "Special";
};

export const mealOptions: MealOption[] = [
  { id: "none", name: "No Meal", description: "Skip meal service for this flight", price: 0, tag: "None" },
  { id: "veg-standard", name: "Veg Delight", description: "Seasonal vegetables, dal & steamed rice", price: 350, tag: "Veg" },
  { id: "nonveg-standard", name: "Chicken Curry Meal", description: "Chicken curry with rice & naan", price: 450, tag: "Non-Veg" },
  { id: "jain", name: "Jain Meal", description: "No onion, no garlic, no root vegetables", price: 380, tag: "Jain" },
  { id: "vegan", name: "Vegan Bowl", description: "Plant-based protein bowl with quinoa", price: 420, tag: "Vegan" },
  { id: "continental", name: "Continental Breakfast", description: "Bread, eggs, seasonal fruits & juice", price: 380, tag: "Veg" },
  { id: "diabetic", name: "Diabetic-Friendly Meal", description: "Low-sugar, low-carb balanced meal", price: 400, tag: "Special" },
];

export type SeatTier = "business" | "premium" | "extra-legroom" | "standard";

export type Seat = {
  id: string;
  row: number;
  col: string;
  tier: SeatTier;
  price: number;
  available: boolean;
  isAisle: boolean;
  isWindow: boolean;
};

export const seatTierLabels: Record<SeatTier, string> = {
  business: "Business",
  premium: "Premium",
  "extra-legroom": "Extra Legroom",
  standard: "Standard",
};

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function generateSeatMap(flightNumber: string, cabinClass: string): Seat[][] {
  const isPremiumCabin = cabinClass === "Business" || cabinClass === "First Class";
  const columns = isPremiumCabin ? ["A", "C", "D", "F"] : ["A", "B", "C", "D", "E", "F"];
  const totalRows = isPremiumCabin ? 6 : 22;
  const exitRows = isPremiumCabin ? [] : [12, 13];
  const frontRows = isPremiumCabin ? [] : [1, 2];

  const rows: Seat[][] = [];
  for (let row = 1; row <= totalRows; row++) {
    const seatRow: Seat[] = columns.map((col) => {
      const id = `${row}${col}`;
      let tier: SeatTier = "standard";
      let price = 0;

      if (isPremiumCabin) {
        tier = "business";
        price = 0;
      } else if (exitRows.includes(row)) {
        tier = "extra-legroom";
        price = 799;
      } else if (frontRows.includes(row)) {
        tier = "premium";
        price = 449;
      }

      const occupied = hashSeed(`${flightNumber}-${id}`) % 100 < 28;

      return {
        id,
        row,
        col,
        tier,
        price,
        available: !occupied,
        isAisle: col === "C" || col === "D",
        isWindow: col === "A" || col === "F",
      };
    });
    rows.push(seatRow);
  }
  return rows;
}
