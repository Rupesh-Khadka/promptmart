import UnauthorizedClient from "@/components/general/UnAuthorized";
import { auth } from "../utils/auth";

export default async function Unauthorized() {
  const session = await auth();

  return <UnauthorizedClient role={session?.user?.role} />;
}
