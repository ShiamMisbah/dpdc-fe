"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, Smartphone, CreditCard, Landmark } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ArrowLinkButton from "@/components/shared/ArrowLinkButton";

type Props = {};

const AMOUNT_PRESETS = [200, 500, 1000, 2000, 5000];

const PAYMENT_METHODS = [
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

type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

// Placeholder account context — swap for real session/meter data once
// available. Mirrors the ৳1200 balance shown on BalanceCard.
const CURRENT_BALANCE = 1200;
const METER_ID = "DPDC-4821-0073";
const ACCOUNT_NAME = "Rahim Uddin";

const page = (props: Props) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId | null>(
    null,
  );

  const amount = useMemo(() => {
    if (customAmount.trim() !== "") {
      const parsed = Number(customAmount);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    return selectedPreset ?? 0;
  }, [customAmount, selectedPreset]);

  const canRecharge = amount > 0 && paymentMethod !== null;

  const handlePresetClick = (value: number) => {
    setSelectedPreset(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset(null);
    setCustomAmount(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleRecharge = () => {
    if (!canRecharge) return;
    // TODO: wire up to the real recharge/payment API once available.
    console.log("Recharge requested:", { amount, paymentMethod });
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ArrowLinkButton
            targetLink="/dashboard"
            ariaLabel="Back to dashboard"
            direction="backword"
          />
          <div>
            <h1 className="font-heading text-xl font-semibold">
              Recharge Balance
            </h1>
            <p className="text-sm text-muted-foreground">
              Top up your prepaid meter
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Current Balance</p>
          <p className="text-lg font-semibold">TK {CURRENT_BALANCE}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        {/* Left column — meter card + amount + payment */}
        <div className="flex flex-col gap-6 md:col-span-2">
          {/* Signature element: styled after a real prepaid meter card —
              a perforated split card rather than a generic "account info"
              panel. Right stub now signals live/automatic top-up instead
              of a manual token, since this system syncs automatically. */}
          <Card className="overflow-hidden p-0 ring-1 ring-foreground/10">
            <div className="flex">
              <div
                className="relative flex-1 p-5 text-primary-foreground"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
                  backgroundSize: "16px 16px",
                  backgroundColor: "var(--primary)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="size-4" />
                  <span className="text-xs font-medium tracking-wide uppercase opacity-80">
                    Prepaid Meter
                  </span>
                </div>
                <p className="mt-3 font-mono text-lg tracking-widest">
                  {METER_ID}
                </p>
                <p className="mt-1 text-sm opacity-80">{ACCOUNT_NAME}</p>
              </div>

              {/* Perforated stub divider */}
              <div className="relative w-20 shrink-0 border-l border-dashed border-foreground/15 bg-muted/40">
                <div className="absolute -top-2 -left-2 size-4 rounded-full bg-background" />
                <div className="absolute -bottom-2 -left-2 size-4 rounded-full bg-background" />
                <div className="flex h-full flex-col items-center justify-center gap-1.5 px-2 text-center">
                  {/* <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span> */}
                </div>
              </div>
            </div>
          </Card>

          {/* Amount selection */}
          <div>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">
              Select Amount
            </h2>
            <div className="flex flex-wrap gap-2">
              {AMOUNT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={cn(
                    "h-10 rounded-full border px-5 text-sm font-medium transition-colors",
                    selectedPreset === preset && customAmount === ""
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-card hover:bg-muted",
                  )}
                >
                  ৳{preset}
                </button>
              ))}
            </div>

            <div className="mt-3 max-w-56">
              <label className="mb-1 block text-xs text-muted-foreground">
                Or enter a custom amount
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  ৳
                </span>
                <Input
                  inputMode="numeric"
                  placeholder="0"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="pl-6"
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
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
        </div>

        {/* Right column — order summary */}
        <Card className="md:sticky md:top-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review before you confirm</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Recharge amount</span>
              <span className="font-medium">৳{amount || 0}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Service fee</span>
              <Badge variant="secondary" className="font-normal">
                Free
              </Badge>
            </div>
            <div className="my-1 border-t" />
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold">৳{amount || 0}</span>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-stretch gap-2">
            <Button
              className="w-full rounded-full py-5"
              disabled={!canRecharge}
              onClick={handleRecharge}
            >
              Recharge ৳{amount || 0}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Your balance updates automatically after a successful recharge.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;
