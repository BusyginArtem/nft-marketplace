import { BlockFrostAPI, BlockFrostIPFS } from "@blockfrost/blockfrost-js";

import env from "@/env";

const globalForBlockfrost = globalThis as typeof globalThis & {
  blockfrostApi?: BlockFrostAPI;
  blockfrostIPFS: BlockFrostIPFS;
};

if (!globalForBlockfrost.blockfrostApi) {
  globalForBlockfrost.blockfrostApi = new BlockFrostAPI({
    projectId: env.BLOCK_FROST_PROJECT_ID,
  });
}

if (!globalForBlockfrost.blockfrostIPFS) {
  globalForBlockfrost.blockfrostIPFS = new BlockFrostIPFS({
    projectId: env.BLOCK_FROST_PROJECT_ID,
  });
}

const blockfrostAPIInstance = globalForBlockfrost.blockfrostApi;
const ipfsInstance = globalForBlockfrost.blockfrostIPFS;

export { blockfrostAPIInstance, ipfsInstance };
