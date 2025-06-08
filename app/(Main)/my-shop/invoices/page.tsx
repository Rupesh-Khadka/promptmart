import { getSellerInfo, sellerInvoices } from "@/app/action";
import AllInvoices from "@/components/general/shop/AllInvoices";

export default async function inputvoicePgae() {
  const data = await getSellerInfo();
  const invoices = await sellerInvoices({ sellerId: data?.shop?.id! });

  return (
    <div className="">
      <AllInvoices invoices={invoices ?? []} />
    </div>
  );
}
