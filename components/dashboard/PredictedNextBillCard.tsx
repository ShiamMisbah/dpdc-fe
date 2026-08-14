"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarClock, Sparkles } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

type Props = {};

// Mirrors PastBillChart's chartData for now — same shared-source note as
// the other AI cards. Keep in sync until this moves to one real source.
const chartData = [
  { month: "January", bill: 186 },
  { month: "February", bill: 305 },
  { month: "March", bill: 237 },
  { month: "April", bill: 73 },
  { month: "May", bill: 209 },
  { month: "June", bill: 500 },
];

const lookbackMonths = 3;
const daysPerMonth = 30;

// Matches BalanceCard's hardcoded due date for now. When real due dates
// exist, replace this with actual data instead of a fixed offset.
const CURRENT_DUE_DATE = new Date(2026, 9, 5); // Oct 5, 2026

// A plain ± range rather than a single number — a 3-month average carries
// real uncertainty, and showing a false-precise figure would overstate
// confidence in the estimate.
const UNCERTAINTY_PERCENT = 15;

const PredictedNextBillCard = (props: Props) => {
  const [isThinking, setIsThinking] = useState(true);

  const { estimate, low, high, avgDailyCost, nextDueDate } = useMemo(() => {
    const recent = chartData.slice(-lookbackMonths);
    const totalSpend = recent.reduce((sum, m) => sum + m.bill, 0);
    const totalDays = recent.length * daysPerMonth;
    const dailyCost = totalDays > 0 ? totalSpend / totalDays : 0;
    const projected = dailyCost * daysPerMonth;

    const nextDue = new Date(CURRENT_DUE_DATE);
    nextDue.setMonth(nextDue.getMonth() + 1);

    return {
      estimate: projected,
      low: projected * (1 - UNCERTAINTY_PERCENT / 100),
      high: projected * (1 + UNCERTAINTY_PERCENT / 100),
      avgDailyCost: dailyCost,
      nextDueDate: nextDue,
    };
  }, []);

  useEffect(() => {
    setIsThinking(true);
    const t = setTimeout(() => setIsThinking(false), 700);
    return () => clearTimeout(t);
  }, []);

  const formattedDueDate = nextDueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="w-full p-4">
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

        <CardTitle>Predicted Next Recharge Amount</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        {isThinking ? (
          <div className="flex items-center gap-2 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <CardDescription>Projecting your next bill…</CardDescription>
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ৳{estimate.toFixed(0)}
              </span>
              <span className="text-sm text-muted-foreground">
                (est. ৳{low.toFixed(0)}–৳{high.toFixed(0)})
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarClock className="size-4" />
              Expected around {formattedDueDate}
            </div>

            <CardDescription className="mt-2">
              Based on your average usage of ৳{avgDailyCost.toFixed(1)}/day
              over the last {lookbackMonths} months.
            </CardDescription>

            <p className="mt-1 text-xs text-muted-foreground/70">
              Updated just now
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictedNextBillCard;