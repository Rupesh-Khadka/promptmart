import DashboardWidgets from "../components/general/DashboardWidgets";
import {
  generateLast12MonthsOrderData,
  generateLast12MonthsUserData,
  getAllInvoices,
} from "../action";

export default async function AdminPage() {
  const [ordersData, usersData, invoices] = await Promise.all([
    generateLast12MonthsOrderData(),
    generateLast12MonthsUserData(),
    getAllInvoices(),
  ]);

  return (
    <div>
      <DashboardWidgets
        ordersData={ordersData.last12Months}
        usersData={usersData.last12Months}
        invoices={invoices}
      />
    </div>
  );
}
