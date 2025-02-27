import Link from "next/link";

import Button from "@/components/ui/button";
import { APP_PATH } from "@/lib/constants";

export default function Dashboard() {
  return (
    <section className='container py-20 lg:pt-30 text-center'>
      <h1 className='mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-slideUp [animation-delay:200ms] opacity-0'>
        Introduction to the NFT Marketplace
      </h1>

      <div className='text-lg mt-6 max-w-2xl mx-auto animate-slideUp [animation-delay:300ms] opacity-0'>
        <p className='mb-4'>
          There is some introductory data providing essential context and background information for this specific NFT
          marketplace project, including its core objectives, key features, and the blockchain technology it operates
          on. This foundational information helps users understand the marketplace’s unique value proposition, how
          digital assets are minted, traded, and secured, as well as its role in the broader NFT ecosystem.
        </p>
      </div>

      <div className='mt-10 flex flex-wrap gap-4 justify-center animate-slideUp [animation-delay:400ms] opacity-0'>
        <Button className='rounded-lg' asChild>
          <Link href={APP_PATH.MARKETS}>Browse Market</Link>
        </Button>
      </div>
    </section>
  );
}
