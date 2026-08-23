"use client";

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
import { useLoggedInUser } from "@/context/UserContext";
import { useLogin } from "@/features/auth/hooks";
import { LoginFormData, loginSchema } from "@/features/auth/schemas";
import { LoggedInUser } from "@/features/auth/types";
import { promiseToast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {};

const page = (props: Props) => {
  const {user, setUser} = useLoggedInUser()
  const router = useRouter()
  const loginMutate = useLogin();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async(data: LoginFormData) => {
    console.log("Sending to Login Hook", data);

    const promise = loginMutate.mutateAsync(data);

    promiseToast(promise, {
      loading: "Logging you in...",
      success: "Login successful!",
      error: "Login failed.",
    });

    try {
      const response = await promise;

      const loggedInUser: LoggedInUser = response.data;
      localStorage.setItem("DPDC-UserData", JSON.stringify(loggedInUser));

      // Do something with the returned data
      setUser(loggedInUser);
      router.push("/user/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldLegend>Welcome Back, User</FieldLegend>

          <FieldDescription>Enter details to login.</FieldDescription>

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
            submitTitle="Log IN"
            link="/auth/register"
            linkLabel="Do not have an account"
          />
        </FieldSet>
      </form>
    </div>
  );
};

export default page;
