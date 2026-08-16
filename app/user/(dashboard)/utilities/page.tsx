import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import MeterCard from "@/components/utilities/MeterCard";
import React from "react";
import DummyData_Meter from "@/lib/DummyData_Meter.json";
import AddMeterCard from "@/components/utilities/AddMeterCard";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div>Header</div>
      <Card className="p-3 grid grid-cols-1 md:grid-cols-2 bg-muted">
        {DummyData_Meter.map((card) => (
          <MeterCard
            key={card.meterNumber}
            activeStatus={card.activeStatus}
            address={card.address}
            currentBalance={card.currentBalance}
            lastRecharged={card.lastRecharged}
            meterNumber={card.meterNumber}
            meterReading={card.meterReading}
          />
        ))}
      </Card>
      <AddMeterCard />
    </div>
  );
};

export default page;
