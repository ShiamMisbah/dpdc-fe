import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

type Props = {
  handlePresetClick: (value: number) => void;
  selectedPreset: number | null;
  customAmount: string;
handleCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement, Element>) => void
};

const AMOUNT_PRESETS = [200, 500, 1000, 2000, 5000];

const RechargeAmmountSelectionPanel = ({
  handlePresetClick,
  selectedPreset,
  customAmount,
  handleCustomAmountChange,
}: Props) => {
  return (
    <div>
      <h2 className="mb-3 text-sm font-medium text-muted-foreground">
        Select Amount
      </h2>
      <div className="flex flex-wrap gap-2">
        {AMOUNT_PRESETS.map((preset) => (
          <Button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={cn(
              "h-10 rounded-full border px-5 text-sm font-medium transition-colors",
              selectedPreset === preset && customAmount === ""
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-card hover:bg-muted text-primary",
            )}
          >
            ৳{preset}
          </Button>
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
  );
};

export default RechargeAmmountSelectionPanel;
