"use client";

import { useSession } from "next-auth/react";
import { RefreshCwOff } from "lucide-react";

import Button from "./button";
import { disconnectWalletAction } from "@/actions/wallet";

export default function DisconnectWallet() {
  const { update, data: session } = useSession();
  
  const handleDisconnectWallet = async () => {
    await disconnectWalletAction();

    await update({
      user: {
        ...session?.user,
        address: null,
      },
    });
  };
  return (
    <Button variant='destructive' onClick={handleDisconnectWallet}>
      <RefreshCwOff />
      Disconnect Wallet
    </Button>
  );
}
