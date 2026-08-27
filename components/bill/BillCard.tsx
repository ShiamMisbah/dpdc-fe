import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge';
import { Bill } from '@/features/bills/types';
import { CalendarDays, CheckCircle2, Clock, CreditCard, Zap } from 'lucide-react';
import { Button } from '../ui/button';


interface BillCardProps {
  bill: Bill;
  onPay?: (bill: Bill) => void;
  onViewDetails?: (bill: Bill) => void;
}

const BillCard = ({ bill, onPay, onViewDetails }: BillCardProps) => {
  const billDate = new Date(Number(bill.year), Number(bill.month) - 1);  

  const monthName = billDate.toLocaleDateString("en-US", {
    month: "long",
  });
  const formattedAmount = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(bill.paymentAmount);

  const formattedDueDate = bill.dueDate
    ? new Date(bill.dueDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";
  return (
    <Card
      className={`overflow-hidden w-full pt-0 border ${!bill.paymentStatus ? "border-red-300" : ""}`}
    >
      <CardHeader
        className={`pt-4 flex flex-row items-center justify-between gap-4 border-b ${!bill.paymentStatus ? "bg-red-300" : ""}`}
      >
        <div>
          <CardTitle className="text-lg">
            {monthName} {bill.year}
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Meter: {bill.meterNumber}
          </p>
        </div>

        {bill.currentMonth && <Badge variant="secondary">Current Month</Badge>}
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        {/* Amount */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Bill Amount</p>

            <p className="text-3xl font-bold">{formattedAmount}</p>
          </div>

          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <CreditCard className="size-6 text-primary" />
          </div>
        </div>

        {/* Bill information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Zap className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Usage</p>
              <p className="font-medium">{bill.usage} kWh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="font-medium">{formattedDueDate}</p>
            </div>
          </div>
        </div>

        {/* Payment status */}
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            {bill.paymentStatus ? (
              <CheckCircle2 className="size-5 text-green-600" />
            ) : (
              <Clock className="size-5 text-orange-500" />
            )}

            <div>
              <p className="text-sm font-medium">
                {bill.paymentStatus ? "Paid" : "Payment Pending"}
              </p>

              {bill.paymentStatus && bill.paymentDate && (
                <p className="text-xs text-muted-foreground">
                  Paid on {new Date(bill.paymentDate).toLocaleDateString()}
                  {bill.paidBy && ` via ${bill.paidBy}`}
                </p>
              )}
            </div>
          </div>

          <Badge variant={bill.paymentStatus ? "default" : "destructive"}>
            {bill.paymentStatus ? "Paid" : "Unpaid"}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails?.(bill)}
          >
            View Details
          </Button>

          {!bill.paymentStatus && (
            <Button className="flex-1" onClick={() => onPay?.(bill)}>
              Pay Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BillCard