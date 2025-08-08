"use client";

import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { format } from "timeago.js";
import { useEffect, useState, useMemo } from "react";

export interface Invoice {
  id: string;
  sellerId: string;
  amount: number;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

const AllInvoices = ({ invoices }: { invoices: Invoice[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    { field: "updated_at", headerName: "Updated At", flex: 0.5 },
    {
      field: "status",
      headerName: "Withdraw status",
      flex: 0.5,
    },
  ];

  // Memoize rows to avoid recalculating on every render
  const rows = useMemo(() => {
    if (!isClient) return [];

    return invoices.map((invoice) => ({
      id: invoice.id,
      amount: `US$${invoice.amount}`,
      created_at: format(invoice.createdAt),
      updated_at: format(invoice.updatedAt),
      status: invoice.status,
    }));
  }, [invoices, isClient]);

  if (!isClient) return null;

  return (
    <>
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
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default AllInvoices;
