import React from 'react'
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ProfileDropdownMenu from './ProfileDropdownMenu';

type Props = {}

const NavButtonGroup = (props: Props) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <Button
        variant="outline"
        className="bg-card size-10 rounded-full p-0 shadow-sm"
      >
        <Bell className="size-5" />
      </Button>
      <ProfileDropdownMenu />
    </div>
  );
}

export default NavButtonGroup