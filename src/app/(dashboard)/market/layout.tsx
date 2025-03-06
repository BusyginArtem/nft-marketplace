export default async function MarketLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
 console.log('modal >>>>>>>>>>>>>>>>>>>>>', modal)
 
    return (
    <>
      {children}
      {modal}
    </>
  );
}
