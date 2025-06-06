"use client";

import { addWithdraw, deleteWithDrawMethod } from "@/app/action";
import { AddMethod } from "@/components/forms/AddMethod";
import { Button } from "@heroui/button";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { TbLoaderQuarter } from "react-icons/tb";

export interface Shop {
  id: string;
  name: string;
  description: string;
  shopProductType: string;
  avatar: string;
  rating: number;
  totalSales: number;
  allProduct: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  banks: null | any;
}

export interface Order {
  id: string;
  userId: string;
  promptId: string;
  promptName: string;
  payment_method: string;
  payment_id: string;
  createdAt: Date;
  updatedAt: Date;
  Prompt: Record<string, any>;
}

export interface Invoice {
  id: string;
  sellerId: string;
  amount: number;
  status: String;
  createdAt: Date;
}

export interface WithDrawEarningProps {
  shop: Shop;
  orders: Order[];
  invoices: Invoice[];
}

export function WithDrawEarning({
  shop,
  orders,
  invoices,
}: WithDrawEarningProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    setOpen(true);
  };

  const totalOrderAmount = useMemo(() => {
    return (
      orders?.reduce(
        (total: number, order: any) =>
          total +
          (typeof order?.Prompt?.price === "number" ? order.Prompt.price : 0),
        0
      ) ?? 0
    );
  }, [orders]);

  const totalInvoiceAmount = useMemo(() => {
    return (
      invoices?.reduce(
        (total: number, invoice: any) => total + invoice.amount,
        0
      ) ?? 0
    );
  }, [invoices]);

  const totalEarning = useMemo(() => {
    return totalOrderAmount - totalInvoiceAmount;
  }, [totalOrderAmount, totalInvoiceAmount]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteWithDrawMethod(shop?.banks?.id!).then((res) => {
        shop.banks = null;
        setOpen(!open);
        toast.success("Withdraw method delete successfully!");
        setLoading(false);
      });
    } catch (error) {
      toast.error("Server Error. Please Try again.");
      console.log(error);
    }
  };

  const handleWithdraw = async (amount: number) => {
    try {
      if (totalEarning < amount) {
        toast.error("Insufficient Amount");
      }

      await addWithdraw({ amount });
    } catch (error) {
      toast.error("Please try again later.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-ful flex flex-col items-center justify-center h-screen">
        <div className="w-full flex items-center justify-center flex-col">
          <p className="text-2xl font-[400] text-[#b1b0b6] font-Inter text-center">
            Withdraw Earning
          </p>
          <br />

          <Button
            color="primary"
            onClick={handleSubmit}
            className="text-[18px] p-5 font-[600] font-Inter rounded-[8px] text-white"
          >
            Withdraw
          </Button>
        </div>
      </div>

      {open && (
        <div className="w-full flex items-center justify-center fixed top-0 left-0 h-screen bg-[#0000002b] z-50">
          <div className="w-[50%] h-[500px] bg-[#13103c] rounded-xl p-5">
            <div className="w-full flex justify-end">
              <RxCross1
                onClick={() => setOpen(!open)}
                className="text-2xl cursor-pointer  transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
              />
            </div>
            <p
              className={`text-[18px] font-[400] text-[#b1b0b6] font-Intertext-center !text-2xl text-center`}
            >
              Withdraw Method
            </p>
            <br />

            {shop.banks ? (
              <>
                <div className="flex items-center ">
                  <p
                    className={` text-[16px] text-[#b1b0b6] font-Inter font-[500] `}
                  >
                    Account ending with ...
                    {shop?.banks?.account_number.toString().slice(-4)}
                  </p>

                  {loading ? (
                    <div className="flex text-white pl-2 gap-2">
                      <TbLoaderQuarter className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </div>
                  ) : (
                    <AiOutlineDelete
                      className="text-2xl ml-2 !cursor-pointer"
                      onClick={() => handleDelete()}
                    />
                  )}
                </div>
                <h1 className="pr-1 pt-12 text-xl font-[700] font-Inter text-white text-center">
                  Total Amount ${totalEarning}
                </h1>
                <div className="flex flex-col items-center justify-center py-12 ">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="w-[450px] text-xl font-[700] font-Inter text-white text-center">
                      Enter the withdrawn amount
                    </h1>
                    <h1 className="pr-1 text-xl font-[700] font-Inter text-white text-center">
                      $
                    </h1>
                    <input
                      type="text"
                      placeholder="Enter withdrawal amount"
                      className="bg-[#13103c] text-white placeholder:text-[#b1b0b6] focus:outline-none focus:ring-0 shadow-none border-2 w-full p-2  rounded-xl"
                      autoComplete="off"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <br />
                  <Button
                    className={`text-[18px] mt-8 p-5 font-[600] font-Inter rounded-[8px] text-white cursor-pointer`}
                    color="primary"
                    onClick={() => handleWithdraw(Number(amount))}
                  >
                    Withdraw Now US ${amount}
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full text-center">
                <AddMethod onSuccess={() => setOpen(false)} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
