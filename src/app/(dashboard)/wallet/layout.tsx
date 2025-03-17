import { auth } from "@/lib/auth";

type Props = {
  connect: React.ReactNode;
  address: React.ReactNode;
};

export default async function WalletLayout({ address, connect }: Readonly<Props>) {
  const session = await auth();

  return <>{!!session?.user?.address ? address : connect}</>;
}
