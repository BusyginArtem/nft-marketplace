import env from "@/env";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";


// addr1q9nz9p58wxmlppzrc0qqqham9kjfm9w92pr636jx8wrvajp04z4aj45enu8pkjlpqjr8wje6ghvxm6aztnqz6720uvrsx7uyn3


const api = new BlockFrostAPI({
  projectId: env.BLOCK_FROST_PROJECT_ID,
});



export async function runExample() {
  try {
    // const latestBlock = await API.blocksLatest();
    // const networkInfo = await API.network();
    // const latestEpoch = await API.epochsLatest();
    // const health = await API.health();
    // const address = await api.addresses(
    //   "addr1x88ttk0fk6ssan4g2uf2xtx3anppy3djftmkg959tufsc6qkqt76lg22kjjmnns37fmyue765qz347sxfnyks27ysqaqd3ph23"
    // );
    // const account = await api.accounts(address.stake_address as string);
    const assets = await api.assets();
    const asset = await api.assetsById(assets.at(-1)!.asset);
    // const pools = await API.pools({ page: 1, count: 10, order: "asc" });

    // console.log("pools", pools);
    // console.log("account", account);
    // console.log("networkInfo", networkInfo);
    // console.log("latestEpoch", latestEpoch);
    // console.log("latestBlock", latestBlock);
    // console.log("health", health);
    // console.log("assets", assets);
    console.log("asset", asset);
  } catch (err) {
    console.log("error", err);
  }
}
