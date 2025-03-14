export default async function MarketLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) { 
    return (
    <>
      {children}
      {modal}
    </>
  );
}
