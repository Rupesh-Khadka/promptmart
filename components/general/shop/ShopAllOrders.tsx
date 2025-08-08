"use client";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";

export interface OrderUser {
  name: string | null;
  email: string;
}

export interface OrderPrompt {
  name: string;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  promptId: string;
  promptName: string;
  payment_method: string;
  payment_id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  Users: OrderUser;
  Prompt: OrderPrompt;
}

interface ShopAllOrdersProps {
  isDashboard: boolean;
  ordersData: Order[];
}

const ShopAllOrders = ({ isDashboard, ordersData }: ShopAllOrdersProps) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "email", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Prompt Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                >
                  <a href={`mailto:${params.row.email}`}>
                    <AiOutlineMail className="text-white" size={20} />
                  </a>
                </Box>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  ordersData &&
    ordersData.forEach((order: any) => {
      rows.push({
        id: order.id,
        name: order.Users.name,
        email: order.Users.email,
        title: order.Prompt.name,
        price: `$${order.Prompt.price}`,
        created_at: format(order.createdAt),
      });
    });

  return (
    <div className="">
      <Box m={`${!isDashboard && "20px"}`}>
        <Box
          m="40px 0 0 0"
          height={isDashboard ? "35vh" : "90vh"}
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
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },

              "&:focus-within": {
                outline: "none !important",
              },
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
          }}
        >
          <DataGrid
            checkboxSelection
            rows={rows}
            columns={columns}
            disableColumnMenu={false}
            hideFooter={isDashboard}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ShopAllOrders;
