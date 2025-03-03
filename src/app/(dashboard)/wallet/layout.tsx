import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { APP_PATH } from "@/lib/constants";

type Props = {
  index: React.ReactNode;
  address: React.ReactNode;
};

export default async function DashboardLayout({ address, index }: Readonly<Props>) {
  const session = await auth();

  if (!session) redirect(APP_PATH.SIGN_IN);

  const cookieStore = cookies();
  const hasAddressData = (await cookieStore).get("address")?.value;

  return <>{!!hasAddressData ? address : index}</>;
}
