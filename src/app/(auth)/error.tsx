"use client";

import { useEffect } from "react";

import Button from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className='flex mt-4 w-full flex-col items-center justify-center'>
      <div className='max-w-lg rounded-lg border p-6 text-center space-y-8'>
        <h5 className='font-bold text-[2rem] leading-[1.12]'>Something went wrong</h5>

        <div className='text-center'>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </section>
  );
}
