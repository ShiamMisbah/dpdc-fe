import { cn } from "@/lib/utils";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import React from "react";

type Props = {
  paymentMethod: PaymentMethodId | null;
  setPaymentMethod: React.Dispatch<
    React.SetStateAction<PaymentMethodId | null>
  >;
};

export const PAYMENT_METHODS = [
  { id: "bkash", label: "bKash", icon: Smartphone, accent: "bg-[#E2136E]" },
  { id: "nagad", label: "Nagad", icon: Smartphone, accent: "bg-[#F6921E]" },
  { id: "card", label: "Card", icon: CreditCard, accent: "bg-primary" },
  {
    id: "bank",
    label: "Bank Transfer",
    icon: Landmark,
    accent: "bg-foreground/70",
  },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

const RechargePaymentMethod = ({paymentMethod, setPaymentMethod}: Props) => {
  return (
    <div>
      <h2 className="mb-3 text-sm font-medium text-muted-foreground">
        Payment Method
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = paymentMethod === method.id;
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors",
                isSelected
                  ? "border-primary ring-1 ring-primary"
                  : "border-input bg-card hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-white",
                  method.accent,
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-xs font-medium">{method.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RechargePaymentMethod;
