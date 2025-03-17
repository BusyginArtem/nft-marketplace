"use client";

import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

import { signOutAction } from "@/actions/auth";
import Button from "@/components/ui/button";

const SignOut = () => {
  const { update } = useSession();
  // const router = useRouter();

  const handleSignOut = async () => {
    signOutAction();
    await update({ user: null });
    // router.refresh();
  };

  return (
    <div className='flex justify-center'>
      <Button variant='destructive' onClick={handleSignOut} className='w-[5.5rem]'>
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };
