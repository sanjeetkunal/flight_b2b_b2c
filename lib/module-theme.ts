export type ModuleKey = "flights" | "hotels" | "holidays" | "railway" | "utility" | "bus";

export const moduleTheme: Record<
  ModuleKey,
  { gradient: string; light: string; text: string; solid: string }
> = {
  flights: {
    gradient: "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800",
    light: "bg-blue-50",
    text: "text-blue-600",
    solid: "bg-blue-600",
  },
  hotels: {
    gradient: "bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-700",
    light: "bg-fuchsia-50",
    text: "text-fuchsia-600",
    solid: "bg-fuchsia-600",
  },
  holidays: {
    gradient: "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500",
    light: "bg-orange-50",
    text: "text-orange-600",
    solid: "bg-orange-500",
  },
  railway: {
    gradient: "bg-gradient-to-br from-cyan-500 via-teal-600 to-emerald-700",
    light: "bg-teal-50",
    text: "text-teal-600",
    solid: "bg-teal-600",
  },
  utility: {
    gradient: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700",
    light: "bg-emerald-50",
    text: "text-emerald-600",
    solid: "bg-emerald-600",
  },
  bus: {
    gradient: "bg-gradient-to-br from-lime-500 via-lime-600 to-green-700",
    light: "bg-lime-50",
    text: "text-lime-600",
    solid: "bg-lime-600",
  },
};

export const moduleKeyByHref: Record<string, ModuleKey> = {
  "/flights": "flights",
  "/hotels": "hotels",
  "/holidays": "holidays",
  "/railway": "railway",
  "/utility": "utility",
  "/bus": "bus",
};
