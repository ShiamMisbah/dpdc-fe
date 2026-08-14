import React from 'react'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import cardBg from '@/assets/images/cardBg.png'
import Image from 'next/image';
import Link from 'next/link';

type Props = {}

const BalanceCard = (props: Props) => {
  return (
    <Card className="bg-card relative min-h-48 w-full overflow-hidden p-0 text-accent-foreground shadow-md">
      {/* Background */}
      <Image
        src={cardBg}
        alt=""
        fill
        priority
        sizes='512'
        className="absolute inset-0 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-card/60 backdrop-blur-[1px]" />
      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-2 p-4">
        <div className="shimmer">
          <CardHeader className="px-0">
            <CardAction>
              <Badge variant="destructive" className='text-md px-5 py-3'>PAID</Badge>
            </CardAction>

            <CardTitle>Your Balance</CardTitle>
          </CardHeader>

          <CardTitle className="mb-2 text-3xl font-bold">TK 1200</CardTitle>

          <CardDescription>Due Date: Oct 5, 2026</CardDescription>
        </div>

        <CardFooter className="flex items-center justify-between border-none bg-transparent p-0">
          <Button
            className="rounded-full px-6 py-4"
            render={<Link href="/rechage-now" target="_blank" rel="noopener noreferrer" />}
          >
            Recharge Now
          </Button>

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
}

export default BalanceCard;