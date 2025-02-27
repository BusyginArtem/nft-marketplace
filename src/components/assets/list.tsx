import { Asset } from "@/lib/definitions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

type Props = {
  assets: Asset[];
};

export default function AssetList({ assets }: Props) {
  return (
    <Accordion type='single' collapsible className='space-y-2'>
      {assets.map(
        (asset) =>
          console.log("%c asset", "color: green; font-weight: bold;", asset) || (
            <AccordionItem value={asset.asset}>
              <AccordionTrigger className='px-8'>
                <div className='grid w-full grid-cols-[3fr,5fr,1fr]'>
                  <div className='flex flex-col gap-2'>
                    <p className='uppercase text-xs font-medium'>Asset name</p>
                    <p className='text-lg font-semibold'>
                      {asset.onchain_metadata?.name || asset.metadata?.name || asset.asset_name}
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='uppercase text-xs font-medium'>Fingerprint</p>
                    <p className='text-lg font-semibold'>{asset.fingerprint}</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='uppercase text-xs font-medium'>Quantity</p>
                    <p className='text-lg font-semibold'>{asset.quantity}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-8'>
                <div className='flex flex-col py-4'>
                  <div className='flex flex-row justify-between'>
                    <div className='flex flex-col gap-2'>
                      <p className='uppercase text-xs font-medium'>Asset name</p>
                      <p className='text-lg font-semibold'>{asset.asset_name}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='uppercase text-xs font-medium'>Policy Id</p>
                      <p className='text-lg font-semibold'>{asset.policy_id}</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
      )}
    </Accordion>
  );
}
