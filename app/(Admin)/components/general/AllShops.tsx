"use client";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import { format } from "timeago.js";

interface Props {
  shopsData: Array<{
    id: string;
    name: string;
    email: string;
    avatar: string;
    orders: number;
    prompts: number;
    rating: number;
    createdAt: Date;
  }>;
}

const AllShops = ({ shopsData }: Props) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.6 },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.4,
      renderCell: (params: any) => {
        return (
          <>
            <Image
              src={params.row.avatar}
              alt="avatar"
              width={40}
              height={40}
              className="w-[40px] mx-[5px] h-[40px] rounded-full"
            />
          </>
        );
      },
    },
    { field: "orders", headerName: "Orders", flex: 0.5 },
    { field: "prompts", headerName: "Prompts", flex: 0.5 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="text-white" size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  shopsData &&
    shopsData.forEach((shop: any) => {
      rows.push({
        id: shop.id,
        name: shop?.name,
        email: shop.email,
        avatar: shop?.avatar,
        orders: shop?.orders,
        prompts: shop?.prompts,
        ratings: shop?.rating,
        created_at: format(shop?.createdAt),
      });
    });

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="90vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            color: "#fff",
            borderBottom: "none",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              fontSize: "0.9rem",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#3e4396",
              color: "#fff",
            },
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fff",
          },
          "& .MuiDataGrid-menuIcon": {
            color: "#fff",
          },
          "& .MuiDataGrid-row": {
            color: "#fff",
            borderBottom: "1px solid #ffffff30!important",
            "&:hover": {
              backgroundColor: "#3e439620 !important",
            },
            "&.Mui-selected": {
              backgroundColor: "#3e439640 !important",
              "&:hover": {
                backgroundColor: "#3e439640 !important",
              },
            },
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
            "&:focus": {
              outline: "none !important",
            },
            "&:focus-within": {
              outline: "none !important",
            },
            textAlign: "center", // Center text in cells
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#3e4396",
            color: "#fff",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#fff !important`,
          },
          "& .MuiDataGrid-cellCheckbox": {
            "& .MuiButtonBase-root": {
              color: "#fff !important",
            },
          },
          // Responsive styles
          "@media (max-width: 768px)": {
            "& .MuiDataGrid-root": {
              fontSize: "0.75rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "0.8rem",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.75rem",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "0.8rem",
            },
          },
          "@media (max-width: 480px)": {
            "& .MuiDataGrid-root": {
              fontSize: "0.65rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "0.7rem",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "0.65rem",
            },
          },
        }}
      >
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllShops;
