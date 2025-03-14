"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WalletModalBackdrop({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClose = () => {
    setTimeout(() => {
      router.back();
    }, 200);
  };

  return (
    <div onClick={handleClose} className='fixed inset-0 bg-card/95 flex justify-center items-center'>
      <div
        className='relative bg-background border border-card-foreground/35 rounded-lg shadow-sm shadow-white/55 my-24 mx-8'
        onClick={(e) => e.stopPropagation()}
      >
        <X
          onClick={handleClose}
          className='absolute top-6 right-6 text-x2l text-white cursor-pointer hover:scale-125 active:scale-100 transition-transform'
        />
        {children}
      </div>
    </div>
  );
}
