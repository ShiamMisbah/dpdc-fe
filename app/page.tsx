"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {redirect} from "next/navigation";

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function Home() {
  return (
    redirect("/dashboard")
  )

  // return (
  //   <div className="w-full p-4 bg-background flex flex-col gap-4 ">
      
  //     {/* <Select items={items}>
  //       <SelectTrigger className="w-[180px]">
  //         <SelectValue placeholder="Hudfai" />
  //       </SelectTrigger>
  //       <SelectContent>
  //         <SelectGroup>
  //           {items.map((item) => (
  //             <SelectItem key={item.value} value={item.value}>
  //               {item.label}
  //             </SelectItem>
  //           ))}
  //         </SelectGroup>
  //       </SelectContent>
  //     </Select>
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Card Title</CardTitle>
  //         <CardDescription>Card Description</CardDescription>
  //         <CardAction>Card Action</CardAction>
  //       </CardHeader>
  //       <CardContent>
  //         <p>Card Content</p>
  //       </CardContent>
  //       <CardFooter>
  //         <p>Card Footer</p>
  //       </CardFooter>
  //     </Card>

  //     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
  //       <BarChart accessibilityLayer data={chartData}>
  //         <CartesianGrid vertical={true} horizontal={true} />
  //         <XAxis
  //           dataKey="month"
  //           tickLine={false}
  //           tickMargin={10}
  //           axisLine={false}
  //           tickFormatter={(value) => value.slice(0, 3)}
  //         />
  //         <ChartTooltip content={<ChartTooltipContent />} />
  //         <ChartLegend content={<ChartLegendContent />} />
  //         <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
  //         <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  //       </BarChart>
  //     </ChartContainer>
  //     <Tabs defaultValue="overview" className="w-full">
  //       <TabsList className = "w-full">
  //         <TabsTrigger value="overview">Overview</TabsTrigger>
  //         <TabsTrigger value="analytics">Analytics</TabsTrigger>
  //         <TabsTrigger value="reports">Reports</TabsTrigger>
  //         <TabsTrigger value="settings">Settings</TabsTrigger>
  //       </TabsList>
  //       <TabsContent value="overview">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Overview</CardTitle>
  //             <CardDescription>
  //               View your key metrics and recent project activity. Track
  //               progress across all your active projects.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent className="text-sm text-muted-foreground">
  //             You have 12 active projects and 3 pending tasks.
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //       <TabsContent value="analytics">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Analytics</CardTitle>
  //             <CardDescription>
  //               Track performance and user engagement metrics. Monitor trends
  //               and identify growth opportunities.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent className="text-sm text-muted-foreground">
  //             Page views are up 25% compared to last month.
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //       <TabsContent value="reports">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Reports</CardTitle>
  //             <CardDescription>
  //               Generate and download your detailed reports. Export data in
  //               multiple formats for analysis.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent className="text-sm text-muted-foreground">
  //             You have 5 reports ready and available to export.
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //       <TabsContent value="settings">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Settings</CardTitle>
  //             <CardDescription>
  //               Manage your account preferences and options. Customize your
  //               experience to fit your needs.
  //             </CardDescription>
  //           </CardHeader>
  //           <CardContent className="text-sm text-muted-foreground">
  //             Configure notifications, security, and themes.
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //     </Tabs> */}
  //   </div>
  // );
}
