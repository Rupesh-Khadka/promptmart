"use client";

// import AllPrompts from "@/components/Prompts/AllPrompts";
// import ShopAllOrders from "@/components/Shop/ShopAllOrders";
import { styles } from "@/utils/styles";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { BiBorderLeft } from "react-icons/bi";
import OrderAnalytics from "../prompt/order/OrderAnalytics";
import AllPrompts from "../prompt/AllPrompts";
import ShopAllOrders from "./ShopAllOrders";

interface Prompt {
  id: string;
  name: string;
  price: number;
  rating: number;
  orders: any[];
  status: string;
}

export const ShopDashboard = ({
  ordersData,
  promptsData,
}: {
  ordersData: any;
  promptsData: Prompt[];
}) => {
  const totalSales = ordersData?.reduce(
    (total: number, item: any) => (item?.prompt?.price || 0) + total,
    0
  );

  return (
    <div>
      <div className="mt-[5px] min-h-screen">
        {/* <div className="grid grid-cols-[75%_25%] w-full"> */}
        <div className="grid md:grid-cols-[65%_34%]">
          <div className="p-8 col-span-1">
            <OrderAnalytics isDashboard={true} />
          </div>

          <div className="pt-[80px] pr-8 col-span-1">
            <div className="w-full bg-[#111C43] rounded-sm shadow">
              <div className="flex items-center p-5 justify-between">
                <div className="w-full flex flex-col items-center">
                  <BiBorderLeft className="text-[#45CBA0] text-[30px]" />
                  <h5 className="pt-2 font-Poppins text-[#fff] text-[20px]">
                    {ordersData?.length}
                  </h5>
                  <h5 className="py-2 font-Poppins text-[#45CBA0] text-[17px] font-[400]">
                    Total Sales
                  </h5>
                </div>
              </div>
            </div>

            <div className="w-full bg-[#111C43] rounded-sm shadow my-8">
              <div className="flex items-center p-5 justify-between">
                <div className="w-full flex flex-col items-center">
                  <AiOutlineMoneyCollect className="text-[#45CBA0] text-[30px]" />
                  <h5 className="pt-2 font-Poppins text-[#fff]  text-[20px]">
                    US$ {totalSales}
                  </h5>
                  <h5 className="py-2 font-Poppins text-[#45CBA0] text-[17px] font-[400]">
                    Total Sales
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[65%_34%] mt-[-20px]">
          <div className="bg-[#111c43] w-[94%] mt-[30px] h-[43vh] shadow-sm m-auto">
            <h1
              className={`${styles.label} !text-[20px]
             px-5 py-2 !text-start`}
            >
              All Prompts
            </h1>
            <div className="mt-[-30px]">
              <AllPrompts prompts={promptsData} isDashboard={true} />
            </div>
          </div>
          <div className="p-3">
            <h5 className="text-[#fff] text-[20px] font-[400] font-Poppins pb-3">
              Recent Orders
            </h5>
            <ShopAllOrders isDashboard={true} ordersData={ordersData} />
          </div>
        </div>
      </div>
    </div>
  );
};
