import Link from "next/link";

import Logo from "@/components/logo";
import Button from "./ui/button";
import { auth } from "@/lib/auth";

import { SignOut } from "./forms/auth/sign-out";
import { APP_PATH } from "@/lib/constants";

const navItems = [
  {
    label: "Home",
    href: APP_PATH.ROOT,
    target: false,
  },
  {
    label: "Wallet",
    href: APP_PATH.WALLET,
    target: false,
  },
  {
    label: "Markets",
    href: APP_PATH.MARKETS,
    target: false,
  },
];

export default async function Header() {
  const session = await auth();

  return (
    <header className='sticky top-0 w-full border-border/40 bg-background/95 z-50 border-b-2'>
      <div className='container flex items-center justify-between h-20'>
        <Link href={APP_PATH.ROOT} aria-label='Home page'>
          <Logo />
        </Link>
        <div className='flex gap-7 items-center justify-between'>
          <div className='flex items-center gap-7 text-primary'>
            {navItems.map((navItem) => (
              <Link
                key={navItem.label}
                href={navItem.href}
                target={navItem.target ? "_blank" : undefined}
                rel={navItem.target ? "noopener noreferrer" : undefined}
                className='transition-colors hover:text-accent-foreground/80 text-accent-foreground text-sm font-medium'
              >
                {navItem.label}
              </Link>
            ))}

            {session ? (
              <SignOut />
            ) : (
              <Button className='rounded-lg' asChild>
                <Link href={APP_PATH.SIGN_IN}>Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
