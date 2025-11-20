import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name cannot be empty")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string("Email is required")
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),
  password: z
    .string("Password is required")
    .min(1, "Password cannot be empty")
    .min(6, "The password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),
  password: z
    .string("Password is required")
    .min(1, "Password cannot be empty")
    .min(6, "The password must be at least 6 characters"),
});

export const resetPasswordSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email cannot be empty")
    .email("Invalid email format"),
  newPassword: z
    .string("New password is required")
    .min(1, "New password cannot be empty")
    .min(6, "New password must be at least 6 characters")
});

export const sendResetOtpSchema = z.object({
  email: z
    .string("Email is required")
    .min(1, "Email cannot be empty")
    .email("Invalid email format")
});