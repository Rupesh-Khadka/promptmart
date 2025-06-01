import UserAllOrders from "@/components/general/prompt/order/UserAllOrder";
import { getOrders } from "../action";
import { requireUser } from "../utils/requireUser";

export default async function MyOrders() {
  const data = await getOrders();
  const session = await requireUser();

  if (!data) {
    return null;
  }


  return (
    <>
      <UserAllOrders
        data={data}
        user={session}
        isSellerExist={session.shop ? true : false}
      />
    </>
  );
}
