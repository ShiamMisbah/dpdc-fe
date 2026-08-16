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
import RechargenowHeader from "@/components/recharge-now/RechargenowHeader";
import Accountcard from "@/components/recharge-now/RechargeAccountCard";
import RechargeAccountCard from "@/components/recharge-now/RechargeAccountCard";
import RechargeAmmountSelectionPanel from "@/components/recharge-now/RechargeAmmountSelectionPanel";
import RechargePaymentMethod, { PAYMENT_METHODS, PaymentMethodId } from "@/components/recharge-now/RechargePaymentMethod";
import RechargeOrderSummary from "@/components/recharge-now/RechargeOrderSummary";

type Props = {};

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
    <div className="mx-auto w-full">
      {/* Header */}
      <RechargenowHeader currentBalance={CURRENT_BALANCE} />

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        {/* Left column — meter card + amount + payment */}
        <div className="flex flex-col gap-6 md:col-span-2">
          {/* Signature element: styled after a real prepaid meter card —
              a perforated split card rather than a generic "account info"
              panel. Right stub now signals live/automatic top-up instead
              of a manual token, since this system syncs automatically. */}
          <RechargeAccountCard meterId={METER_ID} accountName={ACCOUNT_NAME} />

          {/* Amount selection */}
          <RechargeAmmountSelectionPanel
            customAmount={customAmount}
            handleCustomAmountChange={handleCustomAmountChange}
            handlePresetClick={handlePresetClick}
            selectedPreset={selectedPreset}
          />

          {/* Payment method */}
          <RechargePaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        </div>

        {/* Right column — order summary */}
        <RechargeOrderSummary amount={amount} canRecharge={canRecharge} handleRecharge={handleRecharge} />
      </div>
    </div>
  );
};

export default page;
