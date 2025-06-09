"use client";

import { useLinkStatus } from "next/link";

export default function LoadingIndicator({ children }: { children?: React.ReactNode }) {
  const { pending } = useLinkStatus();

  return pending ? (
    <span
      role='status'
      aria-label='Loading'
      className='relative inline-block text-transparent bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text animate-glimmer bg-[length:200%_100%]'
    >
      {children}
    </span>
  ) : (
    children
  );
}
