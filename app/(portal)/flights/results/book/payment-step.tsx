"use client";

import { CreditCard, Landmark, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { Field, Select, TextInput } from "@/app/components/ui/field";
import { formatPrice } from "../../flight-utils";
import { cn } from "@/lib/cn";

export type PaymentMethod = "wallet" | "card" | "upi" | "netbanking";

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  wallet: "Agency Wallet",
  card: "Credit / Debit Card",
  upi: "UPI",
  netbanking: "Net Banking",
};

const banks = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank"];

export function PaymentStep({
  total,
  walletBalance,
  method,
  onMethodChange,
}: {
  total: number;
  walletBalance: number;
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}) {
  const walletSufficient = walletBalance >= total;

  const methods: { id: PaymentMethod; label: string; icon: typeof Wallet; disabled?: boolean; hint?: string }[] = [
    {
      id: "wallet",
      label: paymentMethodLabels.wallet,
      icon: Wallet,
      disabled: !walletSufficient,
      hint: walletSufficient ? `Balance ${formatPrice(walletBalance)}` : `Insufficient balance (${formatPrice(walletBalance)})`,
    },
    { id: "card", label: paymentMethodLabels.card, icon: CreditCard },
    { id: "upi", label: paymentMethodLabels.upi, icon: Smartphone },
    { id: "netbanking", label: paymentMethodLabels.netbanking, icon: Landmark },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Wallet size={14} />
        </span>
        Payment Method
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            disabled={m.disabled}
            onClick={() => onMethodChange(m.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-40",
              method === m.id ? "border-blue-500 bg-blue-50/60 ring-1 ring-blue-500/30" : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
            )}
          >
            <m.icon size={18} className={method === m.id ? "text-blue-600" : "text-slate-500"} />
            <span className="text-xs font-semibold text-slate-900">{m.label}</span>
            {m.hint && <span className={cn("text-[10px]", m.disabled ? "text-rose-500" : "text-slate-400")}>{m.hint}</span>}
          </button>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        {method === "wallet" && (
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3.5 py-3 text-sm">
            <span className="text-emerald-700">
              {formatPrice(total)} will be debited from your agency wallet.
            </span>
            <span className="font-semibold text-emerald-700">Bal. {formatPrice(walletBalance)}</span>
          </div>
        )}

        {method === "card" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Card Number" className="sm:col-span-2">
              <TextInput required inputMode="numeric" maxLength={19} placeholder="1234 5678 9012 3456" />
            </Field>
            <Field label="Name on Card" className="sm:col-span-2">
              <TextInput required placeholder="As printed on card" />
            </Field>
            <Field label="Expiry">
              <TextInput required placeholder="MM/YY" maxLength={5} />
            </Field>
            <Field label="CVV">
              <TextInput required inputMode="numeric" maxLength={3} placeholder="123" type="password" />
            </Field>
          </div>
        )}

        {method === "upi" && (
          <Field label="UPI ID">
            <TextInput required placeholder="yourname@upi" />
          </Field>
        )}

        {method === "netbanking" && (
          <Field label="Select Bank">
            <Select required defaultValue="">
              <option value="" disabled>
                Choose your bank
              </option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </Select>
          </Field>
        )}

        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck size={12} />
          Payments are encrypted and processed securely.
        </p>
      </div>
    </div>
  );
}
