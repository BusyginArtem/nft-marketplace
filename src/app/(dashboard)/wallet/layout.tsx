import { cookies } from "next/headers";

type Props = {
  index: React.ReactNode;
  address: React.ReactNode;
};

export default async function DashboardLayout({ address, index }: Readonly<Props>) {
  const cookieStore = cookies();
  const hasAddressData = (await cookieStore).get("address")?.value;

  return <>{!!hasAddressData ? address : index}</>;
}
