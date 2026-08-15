import React from 'react'
import ArrowLinkButton from '../shared/ArrowLinkButton';

type Props = {
    currentBalance : number
}

const RechargenowHeader = ({currentBalance}: Props) => {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <ArrowLinkButton
          targetLink="/dashboard"
          ariaLabel="Back to dashboard"
          direction="backword"
        />
        <div>
          <h1 className="font-heading text-xl font-semibold">
            Recharge Balance
          </h1>
          <p className="text-sm text-muted-foreground">
            Top up your prepaid meter
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-muted-foreground">Current Balance</p>
        <p className="text-lg font-semibold">TK {currentBalance}</p>
      </div>
    </div>
  );
}

export default RechargenowHeader