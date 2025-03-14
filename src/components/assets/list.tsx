import { Asset } from "@/lib/definitions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Button from "../ui/button";
import Link from "next/link";
import { APP_PATH } from "@/lib/constants";

type Props = {
  assets: Asset[];
};

export default function List({ assets }: Props) {
  return (
    <Accordion type='single' collapsible className='space-y-2'>
      {assets.map((asset) => (
        <AccordionItem value={asset.asset} key={asset.asset}>
          <AccordionTrigger className='px-8'>
            <div className='grid w-full grid-cols-[3fr,_5fr,_2fr,_1fr]'>
              <div className='flex flex-col gap-2 overflow-hidden px-2'>
                <p className='uppercase text-xs font-medium'>Asset name</p>
                <p className='text-lg font-semibold w-full truncate'>
                  {asset.onchain_metadata?.name || asset.metadata?.name || asset.asset_name}
                </p>
              </div>

              <div className='flex flex-col gap-2 overflow-hidden px-2'>
                <p className='uppercase text-xs font-medium'>Fingerprint</p>
                <p className='text-lg font-semibold w-full truncate'>{asset.fingerprint}</p>
              </div>

              <div className='flex flex-col gap-2 overflow-hidden px-2'>
                <p className='uppercase text-xs font-medium'>Quantity</p>
                <p className='text-lg font-semibold w-full truncate'>{asset.quantity}</p>
              </div>

              <div className='self-center justify-self-center'>
                {/* <Button onClick={(e) => e.stopPropagation()}>BUY</Button> */}
                <Button className='rounded-lg' asChild>
                  <Link scroll={false} href={APP_PATH.WALLET}>
                    BUY
                  </Link>
                </Button>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='px-8 border-t-2 bg-slate-900'>
            <div className='flex flex-col py-4 gap-8'>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-2 overflow-hidden px-2'>
                  <p className='uppercase text-xs font-medium'>Asset name</p>
                  <p className='text-lg font-semibold w-full truncate'>{asset.asset_name}</p>
                </div>

                <div className='flex flex-col gap-2 overflow-hidden px-2'>
                  <p className='uppercase text-xs font-medium'>Policy Id</p>
                  <p className='text-lg font-semibold w-full truncate'>{asset.policy_id}</p>
                </div>
              </div>

              <div className='px-2 flex flex-col gap-4'>
                <p className='text-lg font-semibold w-full'>Token History (last 10 items)</p>

                <div className='grid w-full grid-cols-[8fr,_1fr,_1fr] border-b-2 py-2 border-t-2'>
                  <span className='uppercase text-xs font-base'>tx hash</span>
                  <span className='uppercase text-xs font-base'>action</span>
                  <span className='uppercase text-xs font-base'>amount</span>
                </div>

                <div className='flex flex-col gap-4'>
                  {asset.history.map((historyItem) => (
                    <div className='grid w-full grid-cols-[8fr,_1fr,_1fr]' key={historyItem.tx_hash}>
                      <span className='uppercase text-xs font-base'>{historyItem.tx_hash}</span>
                      <span className='uppercase text-xs font-base'>{historyItem.action}</span>
                      <span className='uppercase text-xs font-base'>{historyItem.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
