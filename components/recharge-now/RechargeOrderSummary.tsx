import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '../ui/button';


type Props = {
  amount: number;
  canRecharge : boolean;
  handleRecharge: () => void
};

const RechargeOrderSummary = ({ amount, canRecharge, handleRecharge }: Props) => {
  return (
    <Card className="md:sticky md:top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review before you confirm</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Recharge amount</span>
          <span className="font-medium">৳{amount || 0}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <Badge variant="secondary" className="font-normal">
            Free
          </Badge>
        </div>
        <div className="my-1 border-t" />
        <div className="flex items-center justify-between">
          <span className="font-medium">Total</span>
          <span className="text-xl font-bold">৳{amount || 0}</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-2">
        <Button
          className="w-full rounded-full py-5"
          disabled={!canRecharge}
          onClick={handleRecharge}
        >
          Recharge ৳{amount || 0}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Your balance updates automatically after a successful recharge.
        </p>
      </CardFooter>
    </Card>
  );
};

export default RechargeOrderSummary