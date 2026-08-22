import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddUtilityDrawerForm from "./AddUtilityDrawerForm";
import { useIsMobile } from "@/hooks/IsMobile.hook";

const AddUtilityDrawer = () => {
  const [addUtilityOpen, setAddutilityOpen] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <Drawer
      open={addUtilityOpen}
      showSwipeHandle={true}
      onOpenChange={setAddutilityOpen}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger className="">
        <div className="flex flex-col items-center gap-3 text-center">
          <Button variant="outline" className="cursor-pointer flex size-12 items-center justify-center rounded-full hover:shadow-md">
            <Plus className="size-5 text-primary" />
          </Button>

          <div>
            <p className="font-medium">Add Meter</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add another utility meter to your account
            </p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className={`${isMobile ? "h-[70vh]" : ""}`}>
        <DrawerHeader>
          <DrawerTitle>Add New Utility</DrawerTitle>
          <DrawerDescription>
            You will Add you New Utilidy Card to connect.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <AddUtilityDrawerForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddUtilityDrawer;
