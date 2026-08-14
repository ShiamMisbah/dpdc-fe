import BalanceCard from '@/components/dashboard/BalanceCard';
import AIUsageForecastCard from "@/components/dashboard/AIUsageForecastCard";
import AnomalyDetectionCard from "@/components/dashboard/AnomalyDetectionCard";
import PredictedNextBillCard from "@/components/dashboard/PredictedNextBillCard";
import NavButtonGroup from '@/components/dashboard/NavButtonGroup';
import PastBillChart from '@/components/dashboard/PastBillChart';
import UsageChart from '@/components/dashboard/UsageChart';
import UtilitySelect from '@/components/dashboard/UtilitySelect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { generateDailyUsage } from "../../../lib/generateDummyData";

type Props = {}

const page = (props: Props) => {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6">
      {/* Dashboard Nav bar */}
      <div className="flex justify-between items-center mb-8 gap-4">
      <Link href="/" aria-label="Go to homepage" className="shrink-0">
          <Image
            src="/dpdc-logo.svg"
            alt="DPDC"
            width={220}
            height={64}
            priority
            className="h-22 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* User Buttons */}
          <NavButtonGroup />
          <UtilitySelect />
        </div>
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