import React from 'react'
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

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
      <Button variant="outline" className="size-10 rounded-full p-0 shadow-sm">
        <Avatar className="w-full h-full">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Button>
    </div>
  );
}

export default NavButtonGroup