import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { AddressInfo, Amount, StakeAccount } from "@/lib/definitions";
import DisconnectWallet from "@/components/ui/disconnect-wallet";

export default async function Address() {
  const cookieStore = cookies();
  const addressData = (await cookieStore).get("address")?.value;

  if (!addressData) {
    notFound();
  }

  const { stake, address, type, amount } = JSON.parse(addressData) as Omit<AddressInfo, "stake_address"> & {
    stake: StakeAccount;
  };

  return (
    <section className='container py-10 space-y-8'>
      <div className='flex justify-between'>
        <h1 className='px-8'>Wallet</h1>

        <DisconnectWallet />
      </div>

      <div className='flex flex-col'>
        <div className='mb-8 p-6 bg-slate-900 rounded-md border border-border'>
          <h2 className='text-3xl font-bold text-foreground mb-6'>Address Information</h2>

          <div className='flex flex-col gap-4'>
            <p className='text-lg'>
              <strong>Address:</strong> <span className='break-all text-lg'>{address}</span>
            </p>
            <p className='text-lg'>
              <strong>Type:</strong> {type}
            </p>
            <p className='text-lg'>
              <strong>Stake Address:</strong> <span className='break-all text-lg'>{stake.stake_address || "N/A"}</span>
            </p>

            <p className='text-lg'>
              <strong>Total Amount:</strong>{" "}
              {(amount?.reduce((sum: number, amount: Amount) => sum + Number(amount.quantity), 0) / 1_000_000).toFixed(6)} ADA
            </p>
            <div>
              <strong className='text-lg'>Assets</strong>{" "}
              <div className='grid w-full grid-cols-[2fr,_10fr] border-b-2 py-2 my-4 border-t-2 px-4 gap-x-4'>
                <span className='uppercase text-xs font-base'>quantity</span>
                <span className='uppercase text-xs font-base'>unit</span>
              </div>
              {amount?.length > 0 ? (
                <>
                  {amount.map((asset: Amount) => (
                    <div className='grid w-full grid-cols-[2fr,_10fr] px-4 gap-x-4' key={asset.unit}>
                      <span className='block text-base font-semibold'>
                        {asset.unit === "lovelace"
                          ? `${(Number(asset.quantity) / 1_000_000).toFixed(6)}`
                          : `${asset.quantity}`}
                      </span>

                      <span className='block text-base w-full truncate font-semibold'>
                        {asset.unit === "lovelace" ? `ADA` : `${asset.unit}`}
                      </span>
                    </div>
                  ))}
                </>
              ) : (
                "No additional assets"
              )}
            </div>
          </div>
        </div>

        {stake && (
          <div className='p-6 bg-slate-900 rounded-md border border-border'>
            <h2 className='text-3xl font-bold text-foreground mb-6'>Account Information</h2>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-2'>
              <div className='flex flex-col gap-2'>
                <p className='text-lg'>
                  <strong>Stake Address:</strong> <span className='break-all text-lg'>{stake.stake_address}</span>
                </p>

                <p className='text-lg'>
                  <strong>Active:</strong>{" "}
                  <span className={stake.active ? "text-green-600" : "text-red-600"}>
                    {stake.active ? "Yes" : "No"}
                  </span>
                </p>

                <p className='text-lg'>
                  <strong>Controlled Amount:</strong> {(Number(stake.controlled_amount) / 1_000_000).toFixed(6)} ADA
                </p>

                <p className='text-lg'>
                  <strong>Withdrawals Sum:</strong> {(Number(stake.withdrawals_sum) / 1_000_000).toFixed(6)} ADA
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-lg'>
                  <strong>Rewards Sum:</strong> {(Number(stake.rewards_sum) / 1_000_000).toFixed(6)} ADA
                </p>

                <p className='text-lg'>
                  <strong>Withdrawable Amount:</strong> {(Number(stake.withdrawable_amount) / 1_000_000).toFixed(6)} ADA
                </p>

                <p className='text-lg'>
                  <strong>Pool ID:</strong> {stake.pool_id ? `${stake.pool_id.slice(0, 10)}...` : "N/A"}
                </p>

                <p className='text-lg'>
                  <strong>Reserves Sum:</strong> {(Number(stake.reserves_sum) / 1_000_000).toFixed(6)} ADA
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
