"use server";

import { WalletFormState } from "@/lib/definitions";
import { walletFormSchema } from "@/lib/validation";

export async function connectWalletAction(_state: WalletFormState, formData: FormData) {
  const validatedFields = walletFormSchema.safeParse({
    address: formData.get("address"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
  };
}
