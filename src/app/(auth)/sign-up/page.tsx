import Link from "next/link";

import Button from "@/components/ui/button";
import SignUpForm from "@/components/forms/auth/sign-up-form";
import GithubSignIn from "@/components/forms/auth/github-sign-in";
import { APP_PATH } from "@/lib/constants";

export default async function SignUpPage() {
  return (
    <div className='w-full max-w-sm mx-auto space-y-6 border-border border-2 p-8 shadow-md rounded-sm'>
      <h1 className='text-2xl font-bold text-center mb-6'>Create Account</h1>

      <GithubSignIn />

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-background px-2 text-muted-foreground'>Or continue with email</span>
        </div>
      </div>

      <SignUpForm />

      <div className='text-center'>
        <Button variant='link' asChild>
          <Link href={APP_PATH.SIGN_IN}>Already have an account? Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
