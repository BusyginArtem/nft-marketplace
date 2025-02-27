import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import Logo from "@/components/logo";
import { auth } from "@/lib/auth";
import { APP_PATH } from "@/lib/constants";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session) redirect(APP_PATH.ROOT);

  return (
    <main className='container my-8 flex flex-col justify-center items-center h-screen'>
      <div className='mb-4'>
        <Link href='/' aria-label='Home page' className='flex flex-row justify-center items-center gap-2'>
          <Logo />
          <span className='text-2xl font-semibold text-slate-50'>NFT</span>
        </Link>
      </div>

      {children}
    </main>
  );
}
