"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DummyData from "@/lib/DummyData.json";
import {
  getUsagereport,
  Period,
  UsageData,
} from "@/lib/UsageCalculationFunctions";
import YearlyUsageChart from "./YearlyUsageChart";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ReportDateSelector } from "./ReportDateSelector";

type Props = {};

type MonthYear = {
  month: string;
  year: string;
};

const getMonthlyUsage = (
  dataset: UsageData[],
  period: MonthYear,
  onlyYear: boolean,
) => {  
  return dataset.filter((item) => {
    const [year, month] = item.date.split("-");

    if (onlyYear) {
      return year === period.year;
    }

    return year === period.year && month === period.month;
  });
};

const UsageChart = (props: Props) => {
  const now = new Date();
  const [period, setPeriod] = useState<Period>("daily");
  const [reportDate, setReportDate] = useState<MonthYear>({
    month: String(now.getMonth() + 1).padStart(2, "0"),
    year: String(now.getFullYear()),
  });

  const [filteredData, setFilteredData] = useState<UsageData[]>(
    getMonthlyUsage(DummyData, reportDate, false),
  );

  useEffect(() => {    
    if (period === "daily")
      setFilteredData(getMonthlyUsage(DummyData, reportDate, false));
    else if (period === "monthly") setFilteredData(getMonthlyUsage(DummyData, reportDate, true));
    else setFilteredData(DummyData)
    
  }, [reportDate, period]);

  const setDefaultReport = (value: Period) => {
    const now = new Date();
    setPeriod(value);
    setReportDate({
      month: String(now.getMonth() + 1).padStart(2, "0"),
      year: String(now.getFullYear()),
    });
  };

  return (
    <Tabs
      onValueChange={(value) => setDefaultReport(value)}
      defaultValue="overview"
      className="w-full"
    >
      <TabsList style={{ height: "50px" }} className="bg-card w-full py-2">
        <TabsTrigger value="daily">Daily</TabsTrigger>
        {/* <TabsTrigger value="weekly">Weekly</TabsTrigger> */}
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">Yearly</TabsTrigger>
      </TabsList>
      <TabsContent value="daily">
        <Card>
          <CardHeader>
            <CardTitle>Daily</CardTitle>
            <CardDescription>
              <ReportDateSelector
                period="daily"
                value={reportDate}
                onChange={setReportDate}
              />
            </CardDescription>
          </CardHeader>
          <YearlyUsageChart
            chartData={getUsagereport("daily", filteredData)}
            reportDuration="daily"
          />
        </Card>
      </TabsContent>
      {/* <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <YearlyUsageChart
                chartData={getUsagereport("weekly", DummyData)}
                reportDuration="week"
              />
            </CardContent>
          </Card>
        </TabsContent> */}
      <TabsContent value="monthly">
        <Card>
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
            <CardDescription>
              <ReportDateSelector
                period="monthly"
                value={reportDate}
                onChange={setReportDate}
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <YearlyUsageChart
              chartData={getUsagereport("monthly", filteredData)}
              reportDuration="monthly"
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="yearly">
        <Card>
          <CardHeader>
            <CardTitle>Yearly</CardTitle>
            <CardDescription>
              <ReportDateSelector
                period="yearly"
                value={reportDate}
                onChange={setReportDate}
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <YearlyUsageChart
              chartData={getUsagereport("yearly", filteredData)}
              reportDuration="yearly"
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UsageChart;
