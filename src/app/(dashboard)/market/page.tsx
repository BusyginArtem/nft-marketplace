import Container from "@/components/assets/container";
import { getAssetsData } from "@/services/blockfrost/handlers";

export default async function Markets() {
  const initialAssets = await getAssetsData({});

  return (
    <section className='container py-10 space-y-8'>
      <h1 className='px-8'>Assets</h1>

      <div className='flex flex-col'>
        <Container initialAssets={initialAssets} />
      </div>
    </section>
  );
}
