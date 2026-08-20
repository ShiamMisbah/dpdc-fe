"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ArrowDown, ArrowUp, MoveUp } from "lucide-react";
import ArrowLinkButton from "../shared/ArrowLinkButton";

type Props = {};
const chartData = [
  { month: "January", bill: 186},
  { month: "February", bill: 305},
  { month: "March", bill: 237},
  { month: "April", bill: 73},
  { month: "May", bill: 209},
  { month: "June", bill: 500},
];

const chartConfig = {
  bill: {
    label: "Bill",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const PastBillChart = (props: Props) => {
    const getMaxBilledMonth = (data: typeof chartData) => {
      return data.reduce((max, current) =>
        current.bill > max.bill ? current : max,
      );
    };

    const maxBilledMonth = getMaxBilledMonth(chartData);

    const getLastChange = (data: typeof chartData) => {
      if (data.length < 2) {
        return {
          percentage: 0,
          direction: "none" as const,
        };
      }

      const previous = data[data.length - 2].bill;
      const current = data[data.length - 1].bill;

      const percentage = Number(
        (((current - previous) / previous) * 100).toFixed(2),
      );

      return {
        percentage: Math.abs(percentage),
        direction:
          percentage > 0
            ? ("increase" as const)
            : percentage < 0
              ? ("decrease" as const)
              : ("none" as const),
      };
    };

    const percentageChanged = getLastChange(chartData);
    
  return (
    <Card className="w-full p-4">
      <CardHeader className="flex items-center border-b flex-row p-0 gap-4">
        <div className="flex flex-1 flex-col justify-center gap-1 p-2">
          <CardTitle>Past Bills (last 6 Months)</CardTitle>
          <CardDescription>Showing Bills</CardDescription>
        </div>
        <div className="p-2 relative z-30 flex flex-1 flex-col justify-center gap-1 text-left data-[active=true]:bg-muted/50 border-l">
          <div>
            <div className="text-xs text-muted-foreground">
              {`Bill - ${maxBilledMonth.month}`}
            </div>
          </div>
          <div
            className={`flex justify-start items-center gap-1 ${percentageChanged.direction === "increase" ? "text-primary" : "text-destructive"}`}
          >
            <div className="text-xs">
              {`Change - ${percentageChanged.percentage}%`}{" "}
            </div>
            {percentageChanged.direction === "increase" ? (
              <ArrowUp className="size-4" />
            ) : (
              <ArrowDown className="size-4" />
            )}
          </div>
        </div>
        <ArrowLinkButton
          targetLink="/user/bills"
          ariaLabel="Go To Bills"
          direction="forward"
        />
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="min-h-[300px] w-full p-0"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={true} horizontal={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="bill"
              fill="var(--color-bill)"
              radius={4}
              barSize={50}
            >
              <LabelList
                dataKey="bill"
                position="inside"
                offset={8}
                formatter={(value) => `৳${value}`}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PastBillChart;