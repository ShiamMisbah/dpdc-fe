import React from 'react'
import { Card } from '../ui/card';
import { Zap } from 'lucide-react';

type Props = {
    meterId: string;
    accountName: string
}

const RechargeAccountCard = ({accountName, meterId}: Props) => {
  return (
    <Card className="overflow-hidden p-0 ring-1 ring-foreground/10">
      <div className="flex">
        <div
          className="relative flex-1 p-5 text-primary-foreground"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
            backgroundSize: "16px 16px",
            backgroundColor: "var(--primary)",
          }}
        >
          <div className="flex items-center gap-2">
            <Zap className="size-4" />
            <span className="text-xs font-medium tracking-wide uppercase opacity-80">
              Prepaid Meter
            </span>
          </div>
          <p className="mt-3 font-mono text-lg tracking-widest">{meterId}</p>
          <p className="mt-1 text-sm opacity-80">{accountName}</p>
        </div>

        {/* Perforated stub divider */}
        <div className="relative w-20 shrink-0 border-l border-dashed border-foreground/15 bg-muted/40">
          <div className="absolute -top-2 -left-2 size-4 rounded-full bg-background" />
          <div className="absolute -bottom-2 -left-2 size-4 rounded-full bg-background" />
          <div className="flex h-full flex-col items-center justify-center gap-1.5 px-2 text-center">
            {/* <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span> */}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RechargeAccountCard