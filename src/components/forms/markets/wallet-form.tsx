"use client";

import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type WalletFormSchema, walletFormSchema } from "@/lib/validation";
import { WalletFormState } from "@/lib/definitions";
import { connectWalletAction } from "@/actions/wallet";
import Button from "../../ui/button";
import FormInput from "../../ui/form-input";

export default function WalletForm() {
  const [formState, formAction, isPending] = useActionState<WalletFormState, FormData>(connectWalletAction, undefined);

  const form = useForm<WalletFormSchema>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      address: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={formAction}
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        form.handleSubmit(() => {
          startTransition(() => {
            formAction(new FormData(formRef.current!));
          });
        })(evt);
      }}
      className='space-y-2'
    >
      <FormInput
        placeholder='Wallet address'
        type='text'
        error={form.formState?.errors?.address}
        {...form.register("address")}
      />

      <Button disabled={isPending} type='submit' className='w-full'>
        Connect wallet
      </Button>

      <span className='text-red-400 text-sm h-4 inline-block w-full'>
        {!formState?.success ? formState?.message : ""}
      </span>
    </form>
  );
}
