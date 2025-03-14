import IndexPage from "@/components/wallet/index-page";
import WalletModalBackdrop from "@/components/wallet/wallet-modal-backdrop";

export default async function ModalWalletIndexPage() {
  return (
    <WalletModalBackdrop>
      <IndexPage animated={false} />
    </WalletModalBackdrop>
  );
}
