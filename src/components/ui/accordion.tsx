"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

const AccordionItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof AccordionPrimitive.Item>>(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn("border-b last:border-b-0", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </AccordionPrimitive.Item>
  )
);

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof AccordionPrimitive.Trigger>>(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={cn(
          "ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);

const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof AccordionPrimitive.Content>>(
  ({ className, children, ...props }, forwardedRef) => (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='data-[state=closed]:animate-accordionUp data-[state=open]:animate-accordionDown overflow-hidden transition-all'
      {...props}
      ref={forwardedRef}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
