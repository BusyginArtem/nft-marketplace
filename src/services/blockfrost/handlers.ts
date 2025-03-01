import type {
  AddressIdentifier,
  AddressInfo,
  Asset,
  AssetIdentifier,
  AssetsRawData,
  Pagination,
  StakeAccount,
} from "@/lib/definitions";
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

    return assetsRawData.map(({ asset }) => asset);
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

    const assetRawPromises = identifiers.map(async (identifier) => {
      const asset = (await blockfrostAPIInstance.assetsById(identifier)) as Asset;

      const assetHistory = await blockfrostAPIInstance.assetsHistory(`${asset.policy_id}${asset.asset_name}`, {
        count: 10,
      });

      return {
        ...asset,
        history: assetHistory,
      };
    });
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

export async function getAssetsData({ count = 20, page = 1 }: Pagination) {
  try {
    const assetIdentifiers = await getAssetsIdentifiers({ page, count });
    const assets = await getAssetsInfo({ identifiers: assetIdentifiers });

    return assets;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getAddressData({ address }: { address: AddressIdentifier }) {
  try {
    
    const { stake_address, ...addressData } = (await blockfrostAPIInstance.addressesExtended(address)) as AddressInfo;
    const stakeAccount = (await blockfrostAPIInstance.accounts(stake_address)) as StakeAccount;

    return {
      ...addressData,
      stake: stakeAccount,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
}
