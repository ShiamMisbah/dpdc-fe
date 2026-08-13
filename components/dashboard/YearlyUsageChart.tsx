"use client"

import React from 'react'
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Period, UsageData } from '@/lib/UsageCalculationFunctions';

type Props = {
  chartData: any[];
  reportDuration: Period;
};


const reportTypeLabel: Record<Period, string> = {
  yearly: "Yearly",
  monthly: "Monthly",
  weekly: "Weekly",
  daily: "Daily",
};

const getChartData = (data: UsageData[], duration: Period) => {
  return data.map((item) => {
    const date = new Date(`${item.date}T00:00:00`);    

    let label = "";

    switch (duration) {
      case "daily":
        label = date.getDate().toString();
        break;

      case "monthly":
        label = date.toLocaleString("en-US", {
          month: "short",
        });
        break;

      case "yearly":
        label = date.getFullYear().toString();
        break;
    }

    return {
      ...item,
      xAxisLabel: label,
    };
  });
};


const YearlyUsageChart = ({ chartData, reportDuration }: Props) => {
    const chartConfig = {
      usage: {
        label: reportTypeLabel[reportDuration],
        color: "var(--chart-1)",
      },
    } satisfies ChartConfig;
    
    const formattedChartData = getChartData(chartData, reportDuration);    

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full p-0">
      <LineChart accessibilityLayer data={formattedChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="xAxisLabel"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          domain={["dataMin", "dataMax"]}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="usage"
          type="linear"
          stroke="var(--color-usage)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default YearlyUsageChart