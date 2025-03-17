import IndexPage from "./index-page";
import WalletModalBackdrop from "./wallet-modal-backdrop";


export default function WalletModal() {
  return (
    <WalletModalBackdrop>
      <IndexPage animated={false} />
    </WalletModalBackdrop>
  );
}
