import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {}
const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const UtilitySelect = (props: Props) => {
  return (
    <Select items={items} defaultValue="light">
      <SelectTrigger size='md' className="bg-card w-full rounded-full text-md px-4 shadow-sm">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} className=" rounded-lg">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default UtilitySelect