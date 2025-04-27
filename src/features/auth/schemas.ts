import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "This field is required")
    .min(8, "Please enter a valid password (min 8 characters)"),
});

export const setPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "This field is required")
    .min(8, "Please enter a valid password (min 8 characters)"),
  repeatPassword: z
    .string()
    .min(1, "This field is required")
    .min(8, "Please enter a valid password (min 8 characters)"),
});

export const twoFacotorCodeSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
