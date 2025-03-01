"use server";

import { Pagination } from "@/lib/definitions";
import { getAssetsData } from "@/services/blockfrost/handlers";

export async function fetchMoreAssetsData({ page }: Pagination) {
  try {
    const assets = await getAssetsData({ page });

    return assets;
  } catch (error) {
    console.log(error);
    return [];
  }
}
