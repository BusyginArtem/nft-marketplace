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
