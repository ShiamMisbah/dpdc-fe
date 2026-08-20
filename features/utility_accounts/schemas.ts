import {z} from "zod"

export const addUtilitySchema = z.object({
  meterNumber: z
    .string()
    .min(2, "Must be atleast 2 characters long")
    .max(50, "Must be less than 50 characters"),

  street: z.string().min(2, "Must be atleast 2 characters long"),
  area: z.string().min(2, "Must be atleast 2 characters long"),
  city: z.string().min(2, "Must be atleast 2 characters long"),
});

export type AddUtilityFormData = z.infer<typeof addUtilitySchema>