import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});

export const signupSchema = loginSchema
  .extend({
    fullName: z.string().trim().min(2, "Enter your full name."),
    confirmPassword: z.string().min(8, "Confirm your password.")
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"]
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address.")
});
