import React, { useState } from "react";
import { Card } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import AddUtilityDrawer from "./AddUtilityDrawer";

type Props = {};

const AddMeterCard = (props: Props) => {

  return (
    <Card className="flex min-h-70 items-center justify-center border-dashed">
      
      <AddUtilityDrawer />
    </Card>
  );
};

export default AddMeterCard;
