"use client";

import { signOutAction } from "@/actions/auth";
import Button from "@/components/ui/button";
import { useSession } from "next-auth/react";

const SignOut = () => {
  const { update } = useSession();

  const handleSignOut = async () => {
    signOutAction();
    await update({ user: null });
  };

  return (
    <div className='flex justify-center'>
      <Button variant='destructive' onClick={handleSignOut} className="w-[5.5rem]">
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };
