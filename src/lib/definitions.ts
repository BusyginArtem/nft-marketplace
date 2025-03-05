declare const __brand__type__: unique symbol;

type Brand<BaseType, BrandName> = BaseType & {
  readonly [__brand__type__]: BrandName;
};

export type Pagination = { count?: number; page?: number };
export interface UserEntity {
  _id: string;
  password: string;
  email: string;
}

export type AuthFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
      fields?: Record<string, string>;
      success: boolean;
    }
  | undefined;

export type WalletFormState =
  | {
      errors?: {
        address?: string[];
      };
      message?: string;
      // fields?: Omit<AddressInfo, "stake_address"> & { stake: StakeAccount };
      success: boolean;
    }
  | undefined;

export type AssetIdentifier = Brand<string, "ASSET_IDENTIFIER">;
export interface AssetsRawData {
  asset: AssetIdentifier;
  quantity: string;
}

export interface OnchainMetadata {
  [key: string]: string | null | number;
}

export interface Metadata {
  name: string;
  description: string;
  ticker: string;
  url: string;
  logo: string;
  decimals: number;
}

interface AssetHistory {
  tx_hash: string;
  action: "minted" | "burned";
  amount: string;
}

export interface Asset {
  asset: AssetIdentifier;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity: string;
  initial_mint_tx_hash: string;
  mint_or_burn_count: number;
  onchain_metadata: OnchainMetadata | null;
  onchain_metadata_standard: string | null;
  onchain_metadata_extra: string | null;
  metadata: Metadata | null;
  history: AssetHistory[];
}

export type AddressIdentifier = Brand<string, "ADDRESS_IDENTIFIER">;

export interface StakeAccount {
  stake_address: string;
  active: boolean;
  active_epoch: number;
  controlled_amount: string;
  rewards_sum: string;
  withdrawals_sum: string;
  reserves_sum: string;
  treasury_sum: string;
  withdrawable_amount: string;
  pool_id: string;
  drep_id: string;
}

export interface Amount {
  unit: string;
  quantity: string;
  decimals: number | null;
  has_nft_onchain_metadata: boolean;
}

export interface AddressInfo {
  address: AddressIdentifier;
  amount: Amount[];
  stake_address: string;
  type: "byron" | "shelley";
  script: boolean;
}

type NavLabel = "Home" | "Wallet" | "Market";

export type NavItem = {
  label: NavLabel;
  href: string;
  target: boolean;
};
