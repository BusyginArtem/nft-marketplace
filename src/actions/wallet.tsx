"use server";

import { revalidatePath } from "next/cache";

import { WalletFormState } from "@/lib/definitions";
import { walletFormSchema } from "@/lib/validation";
import { auth, update } from "@/lib/auth";
// import { redirect } from "next/navigation";

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

  const session = await auth();

  if (!session) {
    return {
      success: false,
      message: "No active session",
    };
  }

  try {
    await update({
      user: {
        ...session.user,
        address: validatedFields.data.address,
      },
    });

    revalidatePath("/wallet", "layout");

    return {
      success: true,
      fields: { address: validatedFields.data.address },
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
  const session = await auth();

  if (!session) {
    throw new Error("No active session");
  }

  const result = await update({
    user: {
      ...session.user,
      address: null,
    },
  });

  if (!result?.user?.address) {
    revalidatePath("/wallet", "layout");
    revalidatePath("/market", "layout");
    // redirect("/wallet");
  }
}
