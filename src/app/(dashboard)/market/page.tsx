import { unstable_cache } from "next/cache";

import Container from "@/components/assets/container";
import { getAssetsData } from "@/services/blockfrost/handlers";

export const revalidate = 60;

const getInitialAssetsData = unstable_cache(
  async () => {
    return await getAssetsData({});
  },
  ["wallet"],
  {
    tags: ["wallet"],
    revalidate: 60,
  }
);

export default async function Markets() {
  const initialAssets = await getInitialAssetsData();

  return (
    <section className='container py-10 space-y-8'>
      <h1 className='px-8'>Assets</h1>

      <div className='flex flex-col'>
        <Container initialAssets={initialAssets} />
      </div>
    </section>
  );
}
