import { getAllPrompt, getPromptByShop, getUserOrders } from "@/app/action";
import { requireUser } from "@/app/utils/requireUser";
import { ShopDashboard } from "@/components/general/shop/ShopDashboard";

export default async function MyShop() {
  const session = await requireUser();
  const ordersData = await getUserOrders(session.id as string);
  const promptsData = await getPromptByShop();

  return (
    <div>
      <ShopDashboard ordersData={ordersData} promptsData={promptsData} />
    </div>
  );
}
