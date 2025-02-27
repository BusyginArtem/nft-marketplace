import type { Asset, AssetIdentifier, AssetsRawData } from "@/lib/definitions";
import { blockfrostAPIInstance /*, ipfsInstance*/ } from "./blockfrostService";

export async function getAssetsIdentifiers({
  count,
  page,
}: {
  count?: number;
  page?: number;
}): Promise<AssetIdentifier[] | never> {
  try {
    const assetsRawData = (await blockfrostAPIInstance.assets({ count, page })) as AssetsRawData[];

    return assetsRawData.filter(({ quantity }) => quantity).map(({ asset }) => asset);
  } catch (error) {
    console.log(error);

    throw error;
  }
}

// async function fetchIpfsImage(cid: string): Promise<string> {
//   try {
//     const ipfs = (await ipfsInstance.gateway(cid.replace("ipfs://ipfs/", ""))) as string;
//     console.log("ipfs >>>>>>>>>>>>>>>>>>>>>", ipfs);
//     return "";
//   } catch (error) {
//     console.log("Error fetching IPFS image:", error);
//     return "";
//   }
// }

export async function getAssetsInfo({ identifiers }: { identifiers: AssetIdentifier[] }): Promise<Asset[] | never> {
  try {
    const assetsInfo: Asset[] = [];
    const failedOperations = [];

    const assetRawPromises = identifiers.map(
      async (identifier) => (await blockfrostAPIInstance.assetsById(identifier)) as Asset
    );
    const assetSettledPromises = await Promise.allSettled(assetRawPromises);

    for (const assetPromise of assetSettledPromises) {
      if (assetPromise.status === "fulfilled") {
        assetsInfo.push(assetPromise.value as Asset);
      } else {
        failedOperations.push(assetPromise.reason);
      }
    }

    if (!!failedOperations.length) {
      console.log("[FailedOperations]: >>>>>>>>>>>>>>>>>>>>>", failedOperations);
    }

    return assetsInfo;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getAssetsData({ count = 20, page = 1 }: { count?: number; page?: number }) {
  try {
    const assetIdentifiers = await getAssetsIdentifiers({ page, count });
    const assets = await getAssetsInfo({ identifiers: assetIdentifiers });

    return assets;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
