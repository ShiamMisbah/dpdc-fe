import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import NavButtonGroup from './NavButtonGroup';
import DarkModeSwitch from './DarkModeSwitch';

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between items-center mb-8 gap-4">
      <Link href="/" aria-label="Go to homepage" className="shrink-0">
        <Image
          src="/dpdc-logo.svg"
          alt="DPDC"
          width={220}
          height={64}
          priority
          className="h-22 w-auto"
        />
      </Link>

      <div className="flex items-center gap-4">
        {/* User Buttons */}
        <NavButtonGroup />
        <DarkModeSwitch />
      </div>
    </div>
  );
}

export default Navbar