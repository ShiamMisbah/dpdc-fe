import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Direction = "forward" | "backword"

type Props = {
  targetLink: string;
  ariaLabel: string;
  direction: Direction;
};

const ArrowLinkButton = ({ targetLink, ariaLabel, direction = 'backword' }: Props) => {
  return (
    <Link href={targetLink} aria-label={ariaLabel}>
      <Button variant="outline" size="icon" className="rounded-full">
        {direction === "backword" && <ArrowLeft className="size-4" />}
        {direction === "forward" && <ArrowRight className="size-4" />}
      </Button>
    </Link>
  );
};

export default ArrowLinkButton