import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

type Props = {
    targetLink: string;
    title: string
}

const LinkButton = ({targetLink, title}: Props) => {
  return (
    <Link href={targetLink} rel="noopener noreferrer">
      <Button className="rounded-full px-6 py-4">{title}</Button>
    </Link>
  );
}

export default LinkButton