"use client";

import { useMemo, useState, type SubmitEvent } from "react";
import {
  Armchair,
  BadgePercent,
  Clock,
  Headset,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  Plane,
  Receipt,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Field, Select, TextInput } from "@/app/components/ui/field";
import { Button } from "@/app/components/ui/button";
import { agent, flightCoupons, savedGstProfiles, type flightSearchResults } from "@/lib/mock-data";
import { mealOptions } from "@/lib/seat-meal-data";
import { formatPrice } from "../../flight-utils";
import { MealSelectionStep, type MealTraveller } from "./meal-selection-step";
import { SeatSelectionStep } from "./seat-selection-step";
import { ReviewStep } from "./review-step";
import { PaymentStep, type PaymentMethod } from "./payment-step";
import { BookingSuccess } from "./booking-success";
import { BookingTicket } from "./booking-ticket";

type Flight = (typeof flightSearchResults)[number];
type TravellerType = "Adult" | "Child" | "Infant";

type Traveller = {
  type: TravellerType;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
};

type WizardStep = 1 | 2;

const stepLabels = ["Traveller Details", "Payment"];

const titleOptionsByType: Record<TravellerType, string[]> = {
  Adult: ["Mr", "Mrs", "Ms"],
  Child: ["Master", "Miss"],
  Infant: ["Master", "Miss"],
};

function buildTravellers(adults: number, children: number, infants: number): Traveller[] {
  const groups: TravellerType[] = [
    ...Array(adults).fill("Adult" as const),
    ...Array(children).fill("Child" as const),
    ...Array(infants).fill("Infant" as const),
  ];
  return groups.map((type) => ({ type, title: titleOptionsByType[type][0], firstName: "", lastName: "", gender: "Male", age: "" }));
}

export function TravellerDetailsForm({
  flight,
  price,
  fromCity,
  toCity,
  adults,
  children,
  infants,
  cabinClass,
}: {
  flight: Flight;
  price: number;
  fromCity: string;
  toCity: string;
  adults: number;
  children: number;
  infants: number;
  cabinClass: string;
}) {
  const [step, setStep] = useState<WizardStep>(1);
  const [travellers, setTravellers] = useState<Traveller[]>(() => buildTravellers(adults, children, infants));
  const [email, setEmail] = useState(agent.email);
  const [phone, setPhone] = useState(agent.phone);

  const [gstEnabled, setGstEnabled] = useState(false);
  const [gstMode, setGstMode] = useState<"existing" | "new">(savedGstProfiles.length > 0 ? "existing" : "new");
  const [selectedGstId, setSelectedGstId] = useState(savedGstProfiles[0]?.id ?? "");
  const [newGstin, setNewGstin] = useState("");
  const [newBusinessName, setNewBusinessName] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const [mealSelections, setMealSelections] = useState<Record<number, string>>({});
  const [seatIdByTraveller, setSeatIdByTraveller] = useState<Record<number, string>>({});
  const [seatPriceByTraveller, setSeatPriceByTraveller] = useState<Record<number, number>>({});

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<(typeof flightCoupons)[number] | null>(null);
  const [couponError, setCouponError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("wallet");

  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<"success" | "ticket">("success");
  const [reference, setReference] = useState("");

  function updateTraveller(index: number, patch: Partial<Traveller>) {
    setTravellers((prev) => prev.map((t, i) => (i === index ? { ...t, ...patch } : t)));
  }

  function handleSelectMeal(index: number, mealId: string) {
    setMealSelections((prev) => ({ ...prev, [index]: mealId }));
  }

  function handleSelectSeat(index: number, seatId: string, seatPrice: number) {
    setSeatIdByTraveller((prev) => {
      const next: Record<number, string> = {};
      for (const [key, value] of Object.entries(prev)) {
        if (value !== seatId) next[Number(key)] = value;
      }
      next[index] = seatId;
      return next;
    });
    setSeatPriceByTraveller((prev) => ({ ...prev, [index]: seatPrice }));
  }

  function handleApplyCoupon() {
    const match = flightCoupons.find((c) => c.code.toLowerCase() === couponInput.trim().toLowerCase());
    if (!match) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(match);
    setCouponError("");
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  }

  function handleBack() {
    setStep(1);
  }

  const baseFare = Math.round(price * 0.82);
  const taxes = price - baseFare;
  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "flat") return appliedCoupon.value;
    const computed = Math.round((price * appliedCoupon.value) / 100);
    return appliedCoupon.maxDiscount ? Math.min(computed, appliedCoupon.maxDiscount) : computed;
  }, [appliedCoupon, price]);

  const mealAddon = useMemo(
    () =>
      travellers.reduce((sum, _t, index) => {
        const mealId = mealSelections[index] ?? "none";
        return sum + (mealOptions.find((m) => m.id === mealId)?.price ?? 0);
      }, 0),
    [travellers, mealSelections]
  );
  const seatAddon = useMemo(
    () => Object.entries(seatIdByTraveller).reduce((sum, [key]) => sum + (seatPriceByTraveller[Number(key)] ?? 0), 0),
    [seatIdByTraveller, seatPriceByTraveller]
  );

  const total = Math.max(price - discount, 0) + mealAddon + seatAddon;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) {
      if (agent.walletBalance < total) setPaymentMethod("card");
      setStep(2);
      return;
    }
    setReference(`OT-${flight.flightNumber.replace(/[^0-9]/g, "")}${Math.floor(Math.random() * 900 + 100)}`);
    setSubmitted(true);
  }

  const mealTravellers: MealTraveller[] = travellers.map((t, index) => ({
    index,
    type: t.type,
    name: `${t.firstName} ${t.lastName}`.trim(),
  }));

  const gstSummary = gstEnabled
    ? gstMode === "existing" && savedGstProfiles.length > 0
      ? `GST invoice · ${savedGstProfiles.find((p) => p.id === selectedGstId)?.businessName ?? ""}`
      : newGstin
        ? `GST invoice · ${newGstin}`
        : undefined
    : undefined;

  if (submitted) {
    if (viewMode === "ticket") {
      return (
        <BookingTicket
          reference={reference}
          airline={flight.airline}
          flightNumber={flight.flightNumber}
          fromCity={fromCity}
          toCity={toCity}
          day={flight.day}
          departure={flight.departure}
          arrival={flight.arrival}
          cabinClass={cabinClass}
          travellers={mealTravellers.map((t, index) => ({
            ...t,
            title: travellers[index].title,
            gender: travellers[index].gender,
            age: travellers[index].age,
          }))}
          mealSelections={mealSelections}
          seatSelections={seatIdByTraveller}
          baseFare={baseFare}
          taxes={taxes}
          mealAddon={mealAddon}
          seatAddon={seatAddon}
          discount={discount}
          total={total}
          email={email}
          phone={phone}
          gstSummary={gstSummary}
          paymentMethod={paymentMethod}
          onBack={() => setViewMode("success")}
        />
      );
    }

    return (
      <BookingSuccess
        reference={reference}
        airline={flight.airline}
        flightNumber={flight.flightNumber}
        fromCity={fromCity}
        toCity={toCity}
        day={flight.day}
        departure={flight.departure}
        total={total}
        email={email}
        travellerCount={travellers.length}
        paymentMethod={paymentMethod}
        onViewBooking={() => setViewMode("ticket")}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-start">
      <div className="lg:col-span-2">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px]">✓</span>
            Flight Selected
          </span>
          {stepLabels.map((label, i) => {
            const stageStep = (i + 1) as WizardStep;
            const isDone = step > stageStep;
            const isCurrent = step === stageStep;
            return (
              <span key={label} className="flex items-center gap-2">
                <span className="h-px w-6 bg-slate-200" />
                <span className={`flex items-center gap-1.5 ${isDone ? "text-emerald-600" : isCurrent ? "text-blue-600" : "text-slate-400"}`}>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                      isDone
                        ? "bg-emerald-100"
                        : isCurrent
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isDone ? "✓" : stageStep}
                  </span>
                  {label}
                </span>
              </span>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600" />
          <div className="flex items-center gap-3 pl-2">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <Plane size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {flight.airline} · {flight.flightNumber}
              </p>
              <p className="truncate text-xs text-slate-500">
                {fromCity} → {toCity} · {flight.day}, {flight.departure} - {flight.arrival} · {cabinClass}
              </p>
            </div>
            <p className="flex-none text-right text-base font-bold text-slate-900">{formatPrice(price)}</p>
          </div>
        </div>

        {step === 1 && (
          <>
            <div className="mt-5">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Users size={14} />
                </span>
                Traveller Details
              </h2>
              <div className="mt-3 space-y-3">
                {travellers.map((traveller, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {index + 1}
                      </span>
                      Traveller {index + 1} <span className="font-normal text-slate-400">({traveller.type})</span>
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                      <Field label="Title">
                        <Select
                          required
                          value={traveller.title}
                          onChange={(e) => updateTraveller(index, { title: e.target.value })}
                        >
                          {titleOptionsByType[traveller.type].map((title) => (
                            <option key={title} value={title}>
                              {title}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="First Name" className="col-span-2 sm:col-span-1">
                        <TextInput
                          required
                          value={traveller.firstName}
                          onChange={(e) => updateTraveller(index, { firstName: e.target.value })}
                          placeholder="First name"
                        />
                      </Field>
                      <Field label="Last Name" className="col-span-2 sm:col-span-1">
                        <TextInput
                          required
                          value={traveller.lastName}
                          onChange={(e) => updateTraveller(index, { lastName: e.target.value })}
                          placeholder="Last name"
                        />
                      </Field>
                      <Field label="Gender">
                        <Select required value={traveller.gender} onChange={(e) => updateTraveller(index, { gender: e.target.value })}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Select>
                      </Field>
                      <Field label={traveller.type === "Adult" ? "Age" : "Age (Years)"}>
                        <TextInput
                          required
                          type="number"
                          min={traveller.type === "Adult" ? 12 : 0}
                          max={traveller.type === "Adult" ? 120 : 11}
                          value={traveller.age}
                          onChange={(e) => updateTraveller(index, { age: e.target.value })}
                          placeholder="Age"
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <UtensilsCrossed size={14} />
                </span>
                Meal Preferences
              </h2>
              <div className="mt-3">
                <MealSelectionStep travellers={mealTravellers} selections={mealSelections} onSelect={handleSelectMeal} />
              </div>
            </div>

            <div className="mt-5">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Armchair size={14} />
                </span>
                Seat Selection
              </h2>
              <div className="mt-3">
                <SeatSelectionStep
                  travellers={mealTravellers}
                  selections={seatIdByTraveller}
                  onSelect={handleSelectSeat}
                  flightNumber={flight.flightNumber}
                  cabinClass={cabinClass}
                />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Mail size={14} />
                </span>
                Contact Details
              </h2>
              <p className="mt-1 text-xs text-slate-500">Your e-ticket and booking updates will be sent here.</p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Email" icon={<Mail size={12} />}>
                  <TextInput required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="agent@email.com" />
                </Field>
                <Field label="Mobile Number" icon={<Phone size={12} />}>
                  <TextInput required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" />
                </Field>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <label className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={gstEnabled}
                  onChange={(e) => setGstEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30"
                />
                <span className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Receipt size={14} />
                  </span>
                  Claim GST Invoice for this Booking
                </span>
              </label>

              {gstEnabled && (
                <div className="mt-4 space-y-3">
                  {savedGstProfiles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setGstMode("existing")}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                          gstMode === "existing" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
                        }`}
                      >
                        Use Existing GSTIN
                      </button>
                      <button
                        type="button"
                        onClick={() => setGstMode("new")}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                          gstMode === "new" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600"
                        }`}
                      >
                        + Add New GSTIN
                      </button>
                    </div>
                  )}

                  {gstMode === "existing" && savedGstProfiles.length > 0 ? (
                    <div className="space-y-2">
                      {savedGstProfiles.map((profile) => (
                        <label
                          key={profile.id}
                          className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-slate-200 p-3 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50"
                        >
                          <input
                            type="radio"
                            name="gst-profile"
                            checked={selectedGstId === profile.id}
                            onChange={() => setSelectedGstId(profile.id)}
                            className="mt-0.5 h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500/30"
                          />
                          <span>
                            <span className="block text-sm font-semibold text-slate-900">{profile.businessName}</span>
                            <span className="block text-xs text-slate-500">
                              GSTIN: {profile.gstin} · {profile.address}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="GSTIN">
                        <TextInput
                          required={gstEnabled}
                          value={newGstin}
                          onChange={(e) => setNewGstin(e.target.value.toUpperCase())}
                          placeholder="22AAAAA0000A1Z5"
                          maxLength={15}
                        />
                      </Field>
                      <Field label="Registered Business Name">
                        <TextInput
                          required={gstEnabled}
                          value={newBusinessName}
                          onChange={(e) => setNewBusinessName(e.target.value)}
                          placeholder="Business name"
                        />
                      </Field>
                      <Field label="Registered Address" className="sm:col-span-2">
                        <TextInput
                          required={gstEnabled}
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="Address on GST certificate"
                        />
                      </Field>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="mt-5 space-y-5">
            <ReviewStep
              travellers={mealTravellers}
              mealSelections={mealSelections}
              seatSelections={seatIdByTraveller}
              email={email}
              phone={phone}
              gstSummary={gstSummary}
            />
            <PaymentStep
              total={total}
              walletBalance={agent.walletBalance}
              method={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>
        )}

        {step > 1 && (
          <div className="mt-5">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 lg:sticky lg:top-20">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <User size={14} />
            </span>
            Price Details
          </h2>

          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span>{formatPrice(baseFare)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes &amp; Fees</span>
              <span>{formatPrice(taxes)}</span>
            </div>
            {mealAddon > 0 && (
              <div className="flex justify-between">
                <span>Meals</span>
                <span>{formatPrice(mealAddon)}</span>
              </div>
            )}
            {seatAddon > 0 && (
              <div className="flex justify-between">
                <span>Seat Selection</span>
                <span>{formatPrice(seatAddon)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-100 pt-2 font-medium text-slate-900">
              <span>Subtotal</span>
              <span>{formatPrice(price + mealAddon + seatAddon)}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <BadgePercent size={13} />
              Coupon Code
            </p>
            {appliedCoupon ? (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                <span className="font-medium">{appliedCoupon.code} applied</span>
                <button type="button" onClick={handleRemoveCoupon} className="font-semibold underline">
                  Remove
                </button>
              </div>
            ) : (
              <>
                <div className="mt-2 flex gap-2">
                  <input
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError("");
                    }}
                    placeholder="Enter coupon code"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm uppercase focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <Button type="button" size="sm" variant="outline" onClick={handleApplyCoupon} disabled={!couponInput.trim()}>
                    Apply
                  </Button>
                </div>
                {couponError && <p className="mt-1.5 text-xs text-rose-600">{couponError}</p>}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {flightCoupons.map((coupon) => (
                    <button
                      key={coupon.code}
                      type="button"
                      onClick={() => {
                        setCouponInput(coupon.code);
                        setAppliedCoupon(coupon);
                        setCouponError("");
                      }}
                      className="rounded-full border border-dashed border-blue-300 px-2.5 py-1 text-[11px] font-medium text-blue-600 hover:bg-blue-50"
                      title={coupon.description}
                    >
                      {coupon.code}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {discount > 0 && (
            <div className="mt-3 flex justify-between text-sm font-medium text-emerald-600">
              <span>Coupon Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-sm font-bold text-slate-900">Total Payable</span>
            <span className="text-xl font-extrabold text-slate-900">{formatPrice(total)}</span>
          </div>

          <Button type="submit" className="mt-4 w-full justify-center" size="lg">
            {step === 2 ? "Confirm & Book" : "Continue"}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <Lock size={11} />
            100% secure booking · agent-verified payout
          </p>
        </div>

        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <Headset size={14} />
            </span>
            Need Help?
          </h2>
          <p className="mt-1 text-xs text-slate-500">Our agent support desk is available round the clock for booking assistance.</p>

          <div className="mt-3 space-y-2.5">
            <a href="tel:+911800123456" className="flex items-center gap-2.5 rounded-lg bg-white/70 px-3 py-2 text-xs hover:bg-white">
              <PhoneCall size={14} className="text-blue-600" />
              <span>
                <span className="block font-semibold text-slate-900">1800-123-456</span>
                <span className="block text-slate-500">Agent Support Line</span>
              </span>
            </a>
            <a
              href="mailto:agentsupport@orbittravel.com"
              className="flex items-center gap-2.5 rounded-lg bg-white/70 px-3 py-2 text-xs hover:bg-white"
            >
              <Mail size={14} className="text-blue-600" />
              <span>
                <span className="block font-semibold text-slate-900">agentsupport@orbittravel.com</span>
                <span className="block text-slate-500">Booking &amp; billing queries</span>
              </span>
            </a>
            <button type="button" className="flex w-full items-center gap-2.5 rounded-lg bg-white/70 px-3 py-2 text-xs hover:bg-white">
              <MessageCircle size={14} className="text-blue-600" />
              <span>
                <span className="block font-semibold text-slate-900">Chat with Support</span>
                <span className="block text-slate-500">Avg. response time under 2 mins</span>
              </span>
            </button>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock size={11} />
            Available 24x7, all days of the week
          </p>
        </div>
      </div>
    </form>
  );
}
