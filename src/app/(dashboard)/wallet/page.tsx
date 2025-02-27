import WalletForm from "@/components/forms/markets/wallet-form";

export default async function Wallet() {
  return (
    <section className='container my-4 py-20 xl:pt-15'>
      <h1 className='mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-slideUp [animation-delay:200ms] opacity-0'>
        Connect wallet
      </h1>

      <div className='flex flex-col md:flex-row justify-center gap-16 mt-6 animate-slideUp [animation-delay:350ms] opacity-0'>
        <p className='flex-1'>
          NFT purchases on this site can be performed using the following supported cryptocurrency wallets. Connect your
          wallet to securely authenticate, manage your digital assets, and complete transactions seamlessly on the
          blockchain. Ensure your wallet is funded and compatible with the marketplace for a smooth purchasing
          experience.
        </p>

        <div className='flex-1'>
          <WalletForm />
        </div>
      </div>
    </section>
  );
}
