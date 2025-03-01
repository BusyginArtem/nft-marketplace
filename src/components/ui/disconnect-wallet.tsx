import { RefreshCwOff } from "lucide-react";

import Button from "./button";
import { disconnectWalletAction } from "@/actions/wallet";

export default function DisconnectWallet() {
  return (
    <form
      action={async () => {
        "use server";

        await disconnectWalletAction();
      }}
    >
      <Button className='w-full' variant='destructive'>
        <RefreshCwOff />
        Disconnect Wallet
      </Button>
    </form>
  );
}
