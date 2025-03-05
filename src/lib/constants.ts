export const APP_PATH = {
  ROOT: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  MARKETS: "/market",
  WALLET: "/wallet",
} as const;

export const NAV_ITEMS = [
  {
    label: "Home",
    href: APP_PATH.ROOT,
    target: false,
  },
  {
    label: "Wallet",
    href: APP_PATH.WALLET,
    target: false,
  },
  {
    label: "Market",
    href: APP_PATH.MARKETS,
    target: false,
  },
] as const;
