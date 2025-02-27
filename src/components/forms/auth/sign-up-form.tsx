"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type SignUpFormSchema, signUpFormSchema } from "@/lib/validation";
import { signUpAction } from "@/actions/auth";
import { AuthFormState } from "@/lib/definitions";
import FormInput from "../../ui/form-input";
import Button from "../../ui/button";

export default function SignUpForm() {
  const [formState, formAction, isPending] = useActionState<AuthFormState, FormData>(signUpAction, undefined);

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formState?.success) {
      if (formState?.errors?.email) {
        form.setError("email", { type: "custom", message: formState.errors.email?.[0] });
      }
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
        Sign Up
      </Button>

      <span className='text-red-400 text-sm h-4 inline-block w-full'>
        {!formState?.success ? formState?.message : ""}
      </span>
    </form>
  );
}
