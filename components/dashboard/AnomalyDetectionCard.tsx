"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleCheck, Sparkles, TrendingDown, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "../ui/card";
import { Badge } from "../ui/badge";

type Props = {};

// Mirrors PastBillChart's chartData for now. Same note as the forecast
// card: move this to a shared source once one exists, so all cards reading
// bill history can't drift out of sync with each other.
const chartData = [
  { month: "January", bill: 186 },
  { month: "February", bill: 305 },
  { month: "March", bill: 237 },
  { month: "April", bill: 73 },
  { month: "May", bill: 209 },
  { month: "June", bill: 500 },
];

// A month counts as anomalous if it clears *either* threshold — a large
// z-score (unusual relative to how much the other months vary) or a large
// raw percentage deviation (unusual in absolute terms, which catches cases
// where history is too flat for the z-score to react much).
const Z_SCORE_THRESHOLD = 1.5;
const PERCENT_THRESHOLD = 50;

const AnomalyDetectionCard = (props: Props) => {
  const [isThinking, setIsThinking] = useState(true);

  const anomaly = useMemo(() => {
    if (chartData.length < 2) return null;

    const latest = chartData[chartData.length - 1];
    const baseline = chartData.slice(0, -1);

    const mean =
      baseline.reduce((sum, m) => sum + m.bill, 0) / baseline.length;

    const variance =
      baseline.reduce((sum, m) => sum + (m.bill - mean) ** 2, 0) /
      baseline.length;
    const stdDev = Math.sqrt(variance);

    const deviationPercent = mean > 0 ? ((latest.bill - mean) / mean) * 100 : 0;
    const zScore = stdDev > 0 ? (latest.bill - mean) / stdDev : 0;

    const isAnomalous =
      Math.abs(zScore) >= Z_SCORE_THRESHOLD ||
      Math.abs(deviationPercent) >= PERCENT_THRESHOLD;

    if (!isAnomalous) return null;

    return {
      month: latest.month,
      bill: latest.bill,
      mean,
      deviationPercent,
      direction: deviationPercent > 0 ? ("spike" as const) : ("drop" as const),
    };
  }, []);

  // Brief "thinking" delay, same rationale as the forecast card — signals
  // this is live analysis, not a static label.
  useEffect(() => {
    setIsThinking(true);
    const t = setTimeout(() => setIsThinking(false), 700);
    return () => clearTimeout(t);
  }, []);

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

        <CardTitle>Anomaly Detection</CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        {isThinking ? (
          <div className="flex items-center gap-2 py-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <CardDescription>Scanning for unusual activity…</CardDescription>
          </div>
        ) : anomaly ? (
          <>
            <div className="flex items-center gap-2">
              {anomaly.direction === "spike" ? (
                <TrendingUp className="size-6 shrink-0 text-destructive" />
              ) : (
                <TrendingDown className="size-6 shrink-0 text-primary" />
              )}
              <span className="text-lg font-semibold">
                {anomaly.direction === "spike" ? "Unusual spike" : "Unusual drop"}{" "}
                in {anomaly.month}
              </span>
            </div>

            <CardDescription className="mt-2">
              ৳{anomaly.bill} was{" "}
              <span
                className={
                  anomaly.direction === "spike"
                    ? "font-medium text-destructive"
                    : "font-medium text-primary"
                }
              >
                {Math.abs(anomaly.deviationPercent).toFixed(0)}%{" "}
                {anomaly.direction === "spike" ? "higher" : "lower"}
              </span>{" "}
              than your typical bill of ৳{anomaly.mean.toFixed(0)}.
            </CardDescription>

            {anomaly.direction === "spike" && (
              <p className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                Possible causes: extra appliance use, a meter reading issue,
                or a seasonal change. Check your recent activity or contact
                support if this looks wrong.
              </p>
            )}

            <p className="mt-2 text-xs text-muted-foreground/70">
              Updated just now
            </p>
          </>
        ) : (
          <div className="flex items-center gap-2 py-1">
            <CircleCheck className="size-6 shrink-0 text-primary" />
            <CardDescription>
              No unusual activity detected in your recent bills.
            </CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnomalyDetectionCard;