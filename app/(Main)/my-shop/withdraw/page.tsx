import { getSellerInfo, sellerInvoices } from "@/app/action";
import { WithDrawEarning } from "@/components/general/shop/WithDrawEarning";

export default async function PaWitge() {
  const data = await getSellerInfo();
  const invoices = await sellerInvoices({ sellerId: data?.shop?.id! });

  return (
    <div>
      <WithDrawEarning
        shop={data?.shop}
        orders={data?.orders}
        invoices={invoices ?? []}
      />
    </div>
  );
}
