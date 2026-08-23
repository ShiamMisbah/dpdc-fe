import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import cardBg from "@/assets/images/cardBg.png";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "../shared/LinkButton";
import { useSelectedMeter } from "@/context/SelectedMeterContext";
import { formatDate } from "@/lib/DateParseFunctions";
import { paymentStatus } from "@/features/utility_accounts/types";

type Props = {
  paymentStatus: paymentStatus;
  currentBalance: number;
  nextDue: string;
};

const BalanceCard = ({ currentBalance, nextDue, paymentStatus }: Props) => {
  return (
    <Card className="bg-card relative min-h-48 w-full overflow-hidden p-0 text-accent-foreground shadow-md">
      {/* Background */}
      <Image
        src={cardBg}
        alt=""
        fill
        priority
        sizes="512"
        className="absolute inset-0 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-card/60 backdrop-blur-[1px]" />
      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-2 p-4">
        <div>
          <CardHeader className="px-0">
            <CardAction>
              {paymentStatus === "paid" ? (
                <Badge
                  variant="outline"
                  className="border-green-200 text-black bg-green-50  dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                >
                  ACTIVE
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-md">
                  NOT PAID
                </Badge>
              )}
            </CardAction>

            <CardTitle>Your Balance</CardTitle>
          </CardHeader>

          <CardTitle className="mb-2 text-3xl font-bold">
            TK {currentBalance}
          </CardTitle>

          <CardDescription>Due Date: {formatDate(nextDue)}</CardDescription>
        </div>

        <CardFooter className="flex items-center justify-between border-none bg-transparent p-0">
          <LinkButton targetLink="/user/rechage-now" title="Recharge Now" />

          <Button
            variant="outline"
            className="rounded-full bg-muted/70 px-6 py-4"
          >
            View Details
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BalanceCard;
