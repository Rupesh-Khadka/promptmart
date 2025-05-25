"use client";

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface Prompt {
  id: string;
  name: string;
  price: number;
  rating: number;
  orders: any[];
  status: string;
}

interface AllPromptsProps {
  prompts: Prompt[];
  isDashboard?: boolean;
}

const AllPrompts = ({ prompts, isDashboard = false }: AllPromptsProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Prompts Title", flex: 0.8 },
    { field: "price", headerName: "Prompts Price", flex: 0.5 },
    { field: "rating", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
  ];

  const rows = prompts.map((prompt) => ({
    id: prompt.id,
    name: prompt.name,
    price: "$" + prompt.price,
    rating: prompt.rating,
    purchased: prompt.orders?.length || 0,
    status: prompt.status,
  }));

  if (!isClient) {
    return null;
  }

  return (
    <Box m="20px">
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
  );
};

export default AllPrompts;
