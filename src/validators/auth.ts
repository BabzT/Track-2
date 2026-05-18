import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }).max(255).trim(),
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(255),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(255),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }).max(255).trim(),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(255),
  })
  .strict();

export const forgotPasswordSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }).max(255).trim(),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }).max(255).trim(),
    otp: z
      .string({ message: "OTP is required" })
      .length(6, { message: "OTP must be 6 characters long" }),
    newPassword: z
      .string({ message: "New password is required" })
      .min(6, { message: "New password must be at least 6 characters long" })
      .max(255),
  })
  .strict();
