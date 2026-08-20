import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

type Props = {
    link: string
    linkLabel: string
}

const FooterButton = ({link, linkLabel}: Props) => {
  return (
    <div className="flex justify-between items-center mt-5">
      <Button type="submit">Register</Button>
      <Link href={link}>
        <Button variant="link">{linkLabel} -{`>`}</Button>
      </Link>
    </div>
  );
}

export default FooterButton