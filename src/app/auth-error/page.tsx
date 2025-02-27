"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

import Button from "@/components/ui/button";
import { APP_PATH } from "@/lib/constants";

enum Error {
  Configuration = "Configuration",
  OAuthCallbackError = "OAuthCallbackError",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this error persists. Unique error code:{" "}
      <code className='rounded-sm bg-slate-100 p-1 text-xs'>Configuration</code>
    </p>
  ),
  [Error.OAuthCallbackError]: (
    <p>
      <span>Access to the application was denied or there was a configuration error.</span>
      <br />
      <span>
        Unique error code: <code className='rounded-sm bg-slate-500 p-1 text-xs text-gray-50'>Auth Callback Error</code>
      </span>
    </p>
  ),
};

export default function AuthErrorPage() {
  const session = useSession();
  const router = useRouter();

  if (session.data) {
    router.replace(APP_PATH.ROOT);
  }

  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <section className='flex w-full h-screen flex-col items-center justify-center'>
      <div className='block max-w-lg rounded-lg border p-6 text-center'>
        <h5 className='mb-2 font-bold text-[2rem] leading-[1.12]'>Something went wrong</h5>

        <div className='font-normal text-gray-400'>
          {errorMap[error] || "Please contact us if this error persists."}
        </div>

        <div className='text-center'>
          <Button variant='link' asChild>
            <Link className='text-base' href={APP_PATH.ROOT}>
              Go back to Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
