import IndexPage from "@/components/wallet/index-page";

export default async function ModalWalletIndexPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        MODAL
      <IndexPage />
    </div>
  );
}
