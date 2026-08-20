import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RegisterFormData } from '@/features/auth/schemas';
import React from 'react'
import { Control, Controller } from 'react-hook-form';

type Props = {
    control: Control<RegisterFormData>
}

const DetailsForm = ({control}: Props) => {
  return (
    <>
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>

            <Input
              {...field}
              id="firstName"
              placeholder="Shiam"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Last Name */}
      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>

            <Input
              {...field}
              id="lastName"
              placeholder="Misbah"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>

            <Input
              {...field}
              id="email"
              type="email"
              placeholder="shiam.misbah@gmail.com"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>

            <Input
              {...field}
              id="phoneNumber"
              type="tel"
              placeholder="123456789"
              aria-invalid={fieldState.invalid}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}

export default DetailsForm