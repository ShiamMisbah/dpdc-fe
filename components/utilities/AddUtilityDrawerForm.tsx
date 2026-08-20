import { useAddUtility } from "@/features/utility_accounts/hooks";
import {
  AddUtilityFormData,
  addUtilitySchema,
} from "@/features/utility_accounts/schemas";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import LocationComboBox from "./LocationComboBox";
import { Button } from "../ui/button";
import { DrawerClose, DrawerFooter } from "../ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import AddUtilityLocationForm from "./AddUtilityLocationForm";
import { Card, CardContent, CardHeader } from "../ui/card";

type Props = {};

const AddUtilityDrawerForm = (props: Props) => {
  const addUtilityMutate = useAddUtility();
  const form = useForm<AddUtilityFormData>({
    resolver: zodResolver(addUtilitySchema),
    defaultValues: {
      meterNumber: "",
      area: "",
      city: "",
      street: "",
    },
  });

  const onSubmit = (data: AddUtilityFormData) => {
    console.log("Sending to Add Utility Hook", data);
    addUtilityMutate.mutate(data);
  };
  return (
    <div className="w-full ">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="">
          <Controller
            name="meterNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="identifier">Enter Meter ID</FieldLabel>

                <Input
                  {...field}
                  id="meterNumber"
                  placeholder="MTRxxxxxxxxx"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Card>
            <CardHeader className="text-md font-semibold">Location</CardHeader>

            <CardContent className="flex flex-col gap-3">
              <AddUtilityLocationForm control={form.control} />
              {/* Street */}
              <Controller
                name="street"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="identifier">Street</FieldLabel>

                    <Input
                      {...field}
                      id="street"
                      placeholder="Aarong road"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </CardContent>
          </Card>
        </FieldGroup>

        <Field className="mt-5 gap-5">
          <Button type="submit">Add Utility</Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </Field>
      </form>
    </div>
  );
};

export default AddUtilityDrawerForm;
