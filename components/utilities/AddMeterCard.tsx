import React from "react";
import { Card } from "../ui/card";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

type Props = {};

const AddMeterCard = (props: Props) => {
  return (
    <Card className="flex min-h-70 items-center justify-center border-dashed">
      <div className="flex flex-col items-center gap-3 text-center">
        <Button
          variant="outline"
          className="flex size-12 items-center justify-center rounded-full bg-muted"
        >
          <Plus className="size-5" />
        </Button>

        <div>
          <p className="font-medium">Add Meter</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Add another utility meter to your account
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AddMeterCard;
