"use client";

import Link from "next/link";

export default function RootError() {
  return (
    <div className='h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4'>
      <h1 className='text-3xl font-semibold mb-4'>Something went wrong</h1>
      <p className='text-white/70 mb-6'>Please try again later.</p>
      <Link href='/' className='px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition'>
        Go to Home
      </Link>
    </div>
  );
}
