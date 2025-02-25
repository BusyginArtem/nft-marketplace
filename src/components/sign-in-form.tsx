"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import { type SignUpFormSchema, signUpFormSchema } from "@/lib/validation";
import { signInAction } from "@/actions/auth";
import { FormState } from "@/lib/definitions";
import Button from "./ui/button";
import FormInput from "./ui/form-input";

export default function SignInForm() {
  const router = useRouter();

  const [formState, formAction, isPending] = useActionState<FormState, FormData>(signInAction, undefined);

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState?.success) {
      signIn("credentials", formState.fields).then(() => router.replace("/"));
    }
  }, [formState]);

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
        placeholder='Email'
        type='email'
        autoComplete='email'
        error={form.formState?.errors?.email}
        {...form.register("email")}
      />

      <FormInput
        placeholder='Password'
        type='password'
        autoComplete='new-password'
        error={form.formState?.errors?.password}
        {...form.register("password")}
      />

      <Button disabled={isPending} type='submit' className='w-full'>
        Sign In
      </Button>

      <span className='text-red-400 text-sm h-4 inline-block w-full'>
        {!formState?.success ? formState?.message : ""}
      </span>
    </form>
  );
}
