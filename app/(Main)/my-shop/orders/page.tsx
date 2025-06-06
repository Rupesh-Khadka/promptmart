import ShopAllOrders from "@/components/general/shop/ShopAllOrders";
import { getUserOrders } from "@/app/action";
import { requireUser } from "@/app/utils/requireUser";

export default async function Orders() {
  const session = await requireUser();
  const ordersData = await getUserOrders(session.id as string);

  return (
    <div className="flex w-full">
      <div className="md:w-full">
        <ShopAllOrders isDashboard={false} ordersData={ordersData} />
      </div>
    </div>
  );
}
