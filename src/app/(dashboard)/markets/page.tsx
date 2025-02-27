import AssetList from "@/components/assets/list";
import { getAssetsData } from "@/services/blockfrost/handlers";

export default async function Markets() {
  const assets = await getAssetsData({});

  return (
    <section className='container my-4 py-20 xl:pt-15'>
      <AssetList assets={assets} />
    </section>
  );
}
