"use client"

import { RegisterFormData, registerSchema } from '@/features/auth/schemas';
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Controller, useForm } from 'react-hook-form';
import { useRegister } from '@/features/auth/hooks';
import { RegisterPayload } from '@/features/auth/types';
import PasswordForm from '@/components/auth/register/PasswordForm';
import DetailsForm from '@/components/auth/register/DetailsForm';
import Link from 'next/link';
import FooterButton from '@/components/auth/FooterButton';

type Props = {}

const page = (props: Props) => {
  const registerMutate = useRegister()
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data: RegisterFormData) => {
    console.log("Sending to Register Hook", data);
    const { confirmPassword, ...sentData } = data;
    registerMutate.mutate(sentData);
  }
  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldLegend>Register New User</FieldLegend>

          <FieldDescription>
            New users will enter their information.
          </FieldDescription>

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            <DetailsForm control={form.control} />

            <PasswordForm control={form.control} />
          </FieldGroup>

          <FooterButton link='/auth/login' linkLabel='Already Registered' />
        </FieldSet>
      </form>
    </div>
  );
}

export default page