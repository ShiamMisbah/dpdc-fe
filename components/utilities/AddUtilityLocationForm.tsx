import React from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import LocationComboBox from "./LocationComboBox";
import { AddUtilityFormData } from "@/features/utility_accounts/schemas";
import { areasByCity, cities } from "@/lib/LocationData";

type Props = {
  control: Control<AddUtilityFormData>;
};

const AddUtilityLocationForm = ({ control }: Props) => {
  const city = useWatch({
    control,
    name: "city",
  });
  return (
    <>
      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <LocationComboBox
              onValueChange={field.onChange}
              value={field.value}
              placeHolder="Select A City"
              locations={cities}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Area */}
      <Controller
        name="area"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="area">Area</FieldLabel>
            <LocationComboBox
              onValueChange={field.onChange}
              value={field.value}
              placeHolder="Select An Area"
              locations={city ? (areasByCity[city] ?? []) : []}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default AddUtilityLocationForm;
