"use client";

import { useState } from "react";
import { CheckCircle2, Percent, Zap } from "lucide-react";
import { ModuleHero } from "@/app/components/booking/module-hero";
import { Field, Select, TextInput } from "@/app/components/ui/field";
import { Button } from "@/app/components/ui/button";
import { moduleTheme } from "@/lib/module-theme";
import { utilityCategoryStyles } from "@/lib/utility-theme";
import { utilityBillers } from "@/lib/mock-data";

export default function UtilityPage() {
  const [selected, setSelected] = useState(utilityBillers[0].category);
  const [paid, setPaid] = useState(false);
  const active = utilityBillers.find((biller) => biller.category === selected) ?? utilityBillers[0];

  return (
    <div>
      <ModuleHero
        icon={Zap}
        title="Utility Payments"
        subtitle="Bill payments & recharges for your customers, with instant commission credit."
        gradient={moduleTheme.utility.gradient}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {utilityBillers.map((biller) => {
            const style = utilityCategoryStyles[biller.category];
            const Icon = style?.icon ?? Zap;
            const isActive = selected === biller.category;
            return (
              <button
                key={biller.category}
                onClick={() => {
                  setSelected(biller.category);
                  setPaid(false);
                }}
                className={`flex flex-col items-start gap-2.5 rounded-xl border p-4 text-left transition-colors ${
                  isActive ? style?.activeBorder : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${isActive ? style?.activeIconBg : style?.iconBg}`}>
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{biller.category}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{biller.description}</p>
                </div>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  <Percent size={10} /> {biller.commission} commission
                </span>
              </button>
            );
          })}
        </div>
      </ModuleHero>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-900">{active.category}</h2>
          <p className="mt-1 text-xs text-slate-500">{active.description}</p>

          {paid ? (
            <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-6 py-10 text-center">
              <CheckCircle2 className="text-emerald-600" size={36} />
              <p className="text-sm font-semibold text-emerald-800">Payment successful</p>
              <p className="text-xs text-emerald-700">
                Your {active.category.toLowerCase()} transaction has been processed and commission credited to wallet.
              </p>
              <Button size="sm" variant="outline" onClick={() => setPaid(false)}>
                Make another payment
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setPaid(true);
              }}
              className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field label="Operator / Provider">
                <Select defaultValue="">
                  <option value="" disabled>
                    Select provider
                  </option>
                  <option value="provider-1">Provider One</option>
                  <option value="provider-2">Provider Two</option>
                  <option value="provider-3">Provider Three</option>
                </Select>
              </Field>
              <Field label="Customer / Consumer Number">
                <TextInput placeholder="Enter number" required />
              </Field>
              <Field label="Customer Name">
                <TextInput placeholder="Full name" required />
              </Field>
              <Field label="Amount (₹)">
                <TextInput type="number" placeholder="0.00" min={1} required />
              </Field>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Pay Now
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-sm font-semibold text-slate-900">Why use OrbitTravel Utility?</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
              Instant transaction confirmation & digital receipt
            </li>
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
              Commission credited directly to your wallet
            </li>
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
              500+ billers supported across India
            </li>
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="mt-0.5 flex-none text-emerald-600" />
              Zero customer login required
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
