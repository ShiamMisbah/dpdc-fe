import React from "react";
import { MoreHorizontal, Plus, Pencil, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {};

const MeterCardSettings = (props: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-col justify-center items-center size-8 rounded-full">
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full">
        <DropdownMenuItem>
          <Pencil />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Star />
          Make Default
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MeterCardSettings;
