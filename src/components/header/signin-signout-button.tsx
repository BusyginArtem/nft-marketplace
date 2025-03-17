"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { SignOut } from "../forms/auth/sign-out";
import { APP_PATH } from "@/lib/constants";
import Button from "../ui/button";

export default function SignInOutButton() {
  const { data: session } = useSession();
  console.log("%c session", "color: green; font-weight: bold;", session);

  return session ? (
    <SignOut />
  ) : (
    <Button className='rounded-lg w-[5.5rem]' asChild>
      <Link href={APP_PATH.SIGN_IN}>Sign In</Link>
    </Button>
  );
}
