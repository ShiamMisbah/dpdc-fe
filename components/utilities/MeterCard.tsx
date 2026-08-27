"use client"

import React, { act } from 'react'
import { MoreHorizontal, Plus, Pencil, Star, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";



import { Button } from "@/components/ui/button";
import MeterCardSettings from './MeterCardSettings';

type Props = {
    meterNumber: string;
    address: string;
    activeStatus: boolean;
    meterReading: number;
    currentBalance: number;
    lastRecharged: string;
}

const MeterCard = ({activeStatus, address, currentBalance, lastRecharged, meterNumber, meterReading}: Props) => {
  return (
    <Card className="gap-4 rounded-xl border bg-card p-5 shadow-sm">
      {/* Header */}
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4 p-0">
        <div className="space-y-1">
          <p className="font-mono text-lg font-semibold tracking-wider">
            {meterNumber}
          </p>

          <p className="text-sm text-muted-foreground">{address}</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant={activeStatus ? "default" : "destructive"}
            className="h-7 rounded-full px-3 text-xs"
          >
            {activeStatus ? "ACTIVE" : "INACTIVE"}
          </Badge>

          <MeterCardSettings />
        </div>
      </CardHeader>

      {/* Balance */}
      <CardContent className="space-y-1 p-0">
        <p className="text-sm text-muted-foreground">Current Balance</p>

        <p className="text-3xl font-semibold tracking-tight">
          ৳ {currentBalance}
        </p>
      </CardContent>

      {/* Meter details */}
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Last Recharged</p>

          <p className="text-sm font-medium">{lastRecharged}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Meter Reading</p>

          <p className="text-sm font-medium">{meterReading} kWh</p>
        </div>
      </div>
    </Card>
  );
}

export default MeterCard