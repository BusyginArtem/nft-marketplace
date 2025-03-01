"use client";

import { signOutAction } from "@/actions/auth";
import Button from "@/components/ui/button";

const SignOut = () => {
  const handleSignOut = async () => {
    signOutAction();
  };

  return (
    <div className='flex justify-center'>
      <Button variant='destructive' onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };
