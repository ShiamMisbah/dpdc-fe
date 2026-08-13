import BalanceCard from '@/components/dashboard/BalanceCard';
import AIUsageForecastCard from "@/components/dashboard/AIUsageForecastCard";
import AnomalyDetectionCard from "@/components/dashboard/AnomalyDetectionCard";
import PredictedNextBillCard from "@/components/dashboard/PredictedNextBillCard";
import NavButtonGroup from '@/components/dashboard/NavButtonGroup';
import PastBillChart from '@/components/dashboard/PastBillChart';
import UsageChart from '@/components/dashboard/UsageChart';
import UtilitySelect from '@/components/dashboard/UtilitySelect';
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
      {/* Dashboard Nav bar */}
      <div className="flex justify-between items-center mb-8 gap-6">
        <UtilitySelect />
        {/* User Buttons */}
        <NavButtonGroup />
      </div>

      {/* Section label */}
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Overview
      </h2>

      {/* Two column stacks: Balance + Past Bills share the left column's
          width; Usage Forecast + Usage Chart share the right column's. */}
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <BalanceCard />
          <PredictedNextBillCard />
          <PastBillChart />
        </div>
        <div className="flex flex-col gap-4">
          <AIUsageForecastCard />
          <AnomalyDetectionCard />
          <UsageChart />
        </div>
      </div>
    </div>
  );
}

export default page