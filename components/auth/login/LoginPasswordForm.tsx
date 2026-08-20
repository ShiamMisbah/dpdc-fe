import { LoginFormData } from '@/features/auth/schemas';
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";

type Props = {
    control: Control<LoginFormData>
}

const LoginPasswordForm = ({control}: Props) => {
  return (
    <>
      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => {
          const [showPassword, setShowPassword] = useState(false);
          return (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </>
  );
}

export default LoginPasswordForm