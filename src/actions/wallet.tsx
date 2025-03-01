"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { AddressIdentifier, WalletFormState } from "@/lib/definitions";
import { walletFormSchema } from "@/lib/validation";
import { getAddressData } from "@/services/blockfrost/handlers";

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

  try {
    const addressInfo = await getAddressData({ address: validatedFields.data.address as AddressIdentifier });

    (await cookies()).set({
      name: "address",
      value: JSON.stringify(addressInfo),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    revalidatePath("/wallet", "layout");

    return {
      success: true,
      // fields: addressInfo,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
}

export async function disconnectWalletAction() {
  (await cookies()).delete("address");

  revalidatePath("/wallet", "layout");
}
