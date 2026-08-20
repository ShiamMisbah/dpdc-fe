import { z } from "zod";

export const phoneRegex = /^(?:01[3-9]\d{8}|\+?8801[3-9]\d{8})$/;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),

    email: z.string().email("Please enter a valid email address"),

    phoneNumber: z
      .string()
      .min(10, "Please enter a valid phone number")
      .max(15, "Please enter a valid phone number"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => phoneRegex.test(data.phoneNumber),
    {
      message:
        "Enter valid Phone Number, Starting with your country code (+880/01) ",
      path: ["phoneNumber"],
    },
  );

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email or phone number is required")
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isPhone = phoneRegex.test(value);

        return isEmail || isPhone;
      },
      {
        message: "Enter a valid email or phone number",
      },
    ),

  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>