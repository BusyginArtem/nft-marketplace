"use client";

import { useEffect } from "react";
import Link from "next/link";

import Button from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div className='block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow  dark:border-gray-700 dark:bg-gray-800 space-y-4'>
        <h5 className='mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
          Something went wrong
        </h5>

        <div className='text-center'>
          <Button onClick={() => reset()}>Try again</Button>
          {/* <Button variant='link'>
            <Link href='/'>Go back to Home</Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}
