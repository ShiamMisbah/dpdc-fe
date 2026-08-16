import React from 'react'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  CreditCardIcon,
  Lightbulb,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from 'next/link';

type Props = {}

const ProfileDropdownMenu = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-10 rounded-full p-0 shadow-sm cursor-pointer hover:bg-muted">
        <Avatar className="w-full h-full">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full mt-2">
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <Link href="/utilities" aria-label="Go To Utilities">
          <DropdownMenuItem>
            <Lightbulb />
            Utilities
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <CreditCardIcon />
          Bill Summary
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdownMenu