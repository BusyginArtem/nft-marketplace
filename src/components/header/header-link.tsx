"use client";

import Link from "next/link";

import { NavItem } from "@/lib/definitions";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LoadingIndicator from "./loading-indicator";

export default function HeaderLink({ label, href, target }: NavItem) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      prefetch={false}
      target={target ? "_blank" : undefined}
      rel={target ? "noopener noreferrer" : undefined}
      className={cn("transition-colors text-accent-foreground/70 hover:text-accent-foreground text-sm font-medium", {
        "text-accent-foreground": pathname === href,
      })}
    >
      <LoadingIndicator>{label}</LoadingIndicator>
    </Link>
  );
}
