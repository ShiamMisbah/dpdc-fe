"use client"

import FooterButton from "@/components/auth/FooterButton";
import LoginPasswordForm from "@/components/auth/login/LoginPasswordForm";
import PasswordForm from "@/components/auth/register/PasswordForm";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/features/auth/hooks";
import { LoginFormData, loginSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {};

const page = (props: Props) => {
  const loginMutate = useLogin()
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Sending to Login Hook", data);
    loginMutate.mutate(data);
  };
  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldLegend>Welcome Back, User</FieldLegend>

          <FieldDescription>
            Enter details to login.
          </FieldDescription>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="identifier">
                    Email or Phone Number
                  </FieldLabel>

                  <Input
                    {...field}
                    id="identifier"
                    placeholder="shiam@gmail.com / 01xxxxxxxxx"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <LoginPasswordForm control={form.control} />
          </FieldGroup>

          <FooterButton
            link="/auth/register"
            linkLabel="Do not have an account"
          />
        </FieldSet>
      </form>
    </div>
  );
};

export default page;
