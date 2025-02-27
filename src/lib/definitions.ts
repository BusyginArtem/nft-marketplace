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
      fields?: Record<string, string>;
      success: boolean;
    }
  | undefined;

declare const __brand__type__: unique symbol;

type Brand<BaseType, BrandName> = BaseType & {
  readonly [__brand__type__]: BrandName;
};

export type AssetIdentifier = Brand<string, "ASSET_IDENTIFIER">;

export interface AssetsRawData {
  asset: AssetIdentifier;
  quantity: string;
}

export interface OnchainMetadata {
  [key: string]: any; // Allows for any additional properties
}

export interface Metadata {
  name: string;
  description: string;
  ticker: string;
  url: string;
  logo: string;
  decimals: number;
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
}
