"use client"

import BalanceCard from "@/components/dashboard/BalanceCard";
import AIUsageForecastCard from "@/components/dashboard/AIUsageForecastCard";
import AnomalyDetectionCard from "@/components/dashboard/AnomalyDetectionCard";
import PredictedNextBillCard from "@/components/dashboard/PredictedNextBillCard";
import NavButtonGroup from "@/components/nav/NavButtonGroup";
import PastBillChart from "@/components/dashboard/PastBillChart";
import UsageChart from "@/components/dashboard/UsageChart";
import UtilitySelect from "@/components/dashboard/UtilitySelect";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { generateDailyUsage, generateMonthlyBills } from "../../../../lib/Temporary_Data/generateDummyData";
import DarkModeSwitch from "@/components/nav/DarkModeSwitch";
import Navbar from "@/components/nav/Navbar";
import { useLoggedInUser } from "@/context/UserContext";
import { useSelectedMeter } from "@/context/SelectedMeterContext";
import { getLastMonthsBillChartData } from "@/lib/BillCalculationFunctions";

type Props = {};

const page = (props: Props) => {  
    const { selectedMeter } = useSelectedMeter();
    const [lastSixMonthBill, setLastSixMonthBill] = useState<{
      month: string;
      bill: number;
    }[] | []>([]);
    
    useEffect(() => {
      if (selectedMeter){
        const billList = getLastMonthsBillChartData(selectedMeter.bill_list, 6);        
        setLastSixMonthBill(billList);
      }
    }, [selectedMeter])

  if (!selectedMeter) return <>Loading</>

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Dashboard Nav bar */}

      {/* Section label */}
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Overview
      </h2>

      {/* Two column stacks: Balance + Past Bills share the left column's
          width; Usage Forecast + Usage Chart share the right column's. */}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <BalanceCard
            currentBalance={selectedMeter.currentBalance}
            nextDue={selectedMeter.nextDue}
            paymentStatus={selectedMeter.paymentStatus}
          />
          <PredictedNextBillCard />
          {lastSixMonthBill.length > 0 && <PastBillChart billList={lastSixMonthBill} />}
        </div>
        <div className="flex flex-col gap-4">
          <AIUsageForecastCard />
          <AnomalyDetectionCard />
          {selectedMeter.usage_list.length > 0 && <UsageChart usageList={selectedMeter.usage_list} />}
        </div>
      </div>
    </div>
  );
};

export default page;
