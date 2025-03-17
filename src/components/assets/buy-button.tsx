"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import Button from "../ui/button";
import { APP_PATH } from "@/lib/constants";

export default function BuyButton({ assetId }: { assetId: string }) {
  const { data: session } = useSession();

  return (
    <div className='self-center justify-self-center'>
      {session?.user?.address ? (
        <Button
          className='rounded-lg'
          onClick={(e) => {
            e.stopPropagation();
            alert("Buy: " + assetId);
          }}
        >
          BUY
        </Button>
      ) : (
        <Button className='rounded-lg' asChild>
          <Link scroll={false} href={`${APP_PATH.MARKETS}?connect-modal=true`}>
            BUY
          </Link>
        </Button>
      )}
    </div>
  );
}
