"use client";

import { useEffect, useMemo, useState } from "react";
import { BatteryCharging, BatteryWarning, Sparkles } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

type Props = {};

// Mirrors PastBillChart's chartData for now. If/when that data moves to a
// shared source (API route, hook, context), swap this out for the same one
// so the two cards can't drift out of sync.
const chartData = [
  { month: "January", bill: 186 },
  { month: "February", bill: 305 },
  { month: "March", bill: 237 },
  { month: "April", bill: 73 },
  { month: "May", bill: 209 },
  { month: "June", bill: 500 },
];

const balance = 1200;
const lookbackMonths = 3;
const daysPerMonth = 30;

const AIUsageForecastCard = (props: Props) => {
  const [isThinking, setIsThinking] = useState(true);

  // Simple, auditable math — no black box. Average daily cost over the last
  // few months, divided into the current balance.
  const { daysLeft, avgDailyCost, recentMonths } = useMemo(() => {
    const recent = chartData.slice(-lookbackMonths);
    const totalSpend = recent.reduce((sum, m) => sum + m.bill, 0);
    const totalDays = recent.length * daysPerMonth;
    const dailyCost = totalDays > 0 ? totalSpend / totalDays : 0;
    const days = dailyCost > 0 ? Math.floor(balance / dailyCost) : 0;
    return { daysLeft: days, avgDailyCost: dailyCost, recentMonths: recent };
  }, []);

  // Brief "thinking" delay so the AI badge reads as live work rather than a
  // static number that happened to render.
  useEffect(() => {
    setIsThinking(true);
    const t = setTimeout(() => setIsThinking(false), 700);
    return () => clearTimeout(t);
  }, []);

  const isLow = !isThinking && daysLeft <= 7;

  // A rough visual ceiling for the gauge — most balances here are sized to
  // last somewhere around a month, so 30 days reads as "full."
  const GAUGE_MAX_DAYS = 30;
  const gaugePercent = Math.max(
    0,
    Math.min(100, (daysLeft / GAUGE_MAX_DAYS) * 100),
  );

  return (
    <Card className="flex w-full flex-col p-4">
      <CardHeader className="px-0">
        <CardAction>
          <Badge
            variant="secondary"
            className="gap-1 border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
          >
            <Sparkles className="size-3.5" />
            AI Insight
          </Badge>
        </CardAction>

        <CardTitle>Usage Forecast</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        {isThinking ? (
          <div className="flex items-center gap-2 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <CardDescription>Analyzing your usage pattern…</CardDescription>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              {isLow ? (
                <BatteryWarning className="size-6 shrink-0 text-destructive" />
              ) : (
                <BatteryCharging className="size-6 shrink-0 text-primary" />
              )}
              <span className="text-3xl font-bold leading-none">
                {daysLeft}
              </span>
              <span className="text-lg text-muted-foreground">
                day{daysLeft === 1 ? "" : "s"} left
              </span>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${isLow ? "bg-destructive" : "bg-primary"}`}
                style={{ width: `${gaugePercent}%` }}
              />
            </div>

            <CardDescription className="mt-2">
              Based on your average usage of ৳{avgDailyCost.toFixed(1)}/day
              over the last {recentMonths.length} month
              {recentMonths.length === 1 ? "" : "s"}.
            </CardDescription>

            <p className="mt-1 text-xs text-muted-foreground/70">
              Updated just now
            </p>
          </>
        )}
      </CardContent>

      {!isThinking && isLow && (
        <CardFooter className="border-none bg-transparent px-0">
          <p className="w-full rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            Your balance may run low soon. Consider recharging within the
            next {daysLeft} day{daysLeft === 1 ? "" : "s"}.
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default AIUsageForecastCard;