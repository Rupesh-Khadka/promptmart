// components/general/DashboardWidgets.tsx
"use client";
import React, { FC, useMemo } from "react";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import UserAnalytics from "./UserAnalytics";
import OrdersAnalytics from "./OrdersAnalytics";
import AllInvoices from "./AllInvoices";

type MonthData = {
  month: string;
  count: number;
};

type Props = {
  open?: boolean;
  ordersData: MonthData[];
  usersData: MonthData[];
  invoices: any;
};

const CircularProgressWithLabel: FC<{
  value?: number;
  open?: boolean;
}> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({
  open,
  ordersData,
  usersData,
  invoices,
}) => {
  
  const ordersComparePercentage = useMemo(() => {
    if (ordersData?.length >= 2) {
      const [previous, current] = ordersData.slice(-2);
      const percentChange =
        previous.count !== 0
          ? ((current.count - previous.count) / previous.count) * 100
          : 100;
      return {
        currentMonth: current.count,
        previousMonth: previous.count,
        percentChange,
      };
    }
    return {
      currentMonth: 0,
      previousMonth: 0,
      percentChange: 0,
    };
  }, [ordersData]);

  const userComparePercentage = useMemo(() => {
    if (usersData?.length >= 2) {
      const [previous, current] = usersData.slice(-2);
      const percentChange =
        previous.count !== 0
          ? ((current.count - previous.count) / previous.count) * 100
          : 100;
      return {
        currentMonth: current.count,
        previousMonth: previous.count,
        percentChange,
      };
    }

    return {
      currentMonth: 0,
      previousMonth: 0,
      percentChange: 0,
    };
  }, [usersData]);

  return (
    <div className="mt-[5px] min-h-screen">
      <div className="grid grid-cols-[75%_25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8">
          {/* Orders Box */}
          <div className="w-full bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div>
                <BiBorderLeft className="text-[#45CBA0] text-[30px]" />
                <h5 className="pt-2 font-Poppins text-[#fff] text-[20px]">
                  {ordersData?.[ordersData.length - 1]?.count ?? "..."}
                </h5>
                <h5 className="py-2 font-Poppins text-[#45CBA0] text-[17px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center text-[15px] pt-4">
                  {ordersComparePercentage
                    ? `${ordersComparePercentage.percentChange > 0 ? "+" : ""}${ordersComparePercentage.percentChange.toFixed(2)}%`
                    : "..."}
                </h5>
              </div>
            </div>
          </div>

          {/* Users Box */}
          <div className="w-full bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="text-[#45CBA0] text-[30px]" />
                <h5 className="pt-2 font-Poppins text-[#fff] text-[20px]">
                  {usersData?.reduce((acc, month) => acc + month.count, 0) ??
                    "..."}
                </h5>
                <h5 className="py-2 font-Poppins text-[#45CBA0] text-[17px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center text-[15px] pt-4">
                  {userComparePercentage
                    ? `${userComparePercentage.percentChange > 0 ? "+" : ""}${userComparePercentage.percentChange.toFixed(2)}%`
                    : "..."}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-[65%_34%] mt-[-20px]">
        <div className="bg-[#111c43] w-[94%] mt-[30px] h-[43vh] shadow-sm m-auto">
          <OrdersAnalytics isDashboard={true} />
        </div>
        <div className="p-8">
          <h5 className="text-[#fff] text-[20px] font-[400] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} data={invoices} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
