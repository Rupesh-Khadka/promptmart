import { getAllPrompt } from "@/app/action";
import { requireUser } from "@/app/utils/requireUser";
import { ShopDashboard } from "@/components/general/shop/ShopDashboard";

export default async function MyShop() {
  const sellerId: any = await requireUser();
  // const ordersData = await getUserOrders({ sellerId: sellerId?.user.id });
  // const promptsData = await getAllPrompt();
  return (
    <div>
      {/* <ShopDashboard ordersData={ordersData} promptsData={promptsData} /> */}
      Dashboard
    </div>
  );
}
