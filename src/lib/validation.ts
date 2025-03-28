import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export const walletFormSchema = z.object({
  address: z.string().trim(),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type WalletFormSchema = z.infer<typeof walletFormSchema>;
