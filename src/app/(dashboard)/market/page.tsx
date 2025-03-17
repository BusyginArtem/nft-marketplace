import { unstable_cache } from "next/cache";
import { Suspense } from "react";

import Container from "@/components/assets/container";
import { getAssetsData } from "@/services/blockfrost/handlers";
import Loading from "@/components/loading";

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
        <Suspense fallback={<Loading active />}>
          <Container initialAssets={initialAssets} />
        </Suspense>
      </div>
    </section>
  );
}
