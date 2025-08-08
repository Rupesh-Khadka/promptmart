"use client";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";

const AllInvoices = ({
  isDashboard,
  data,
}: {
  isDashboard: boolean;
  data: any;
}) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "email", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Prompts Title", flex: 1 },
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
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-white"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  data &&
    data.forEach((invoice: any) => {
      rows.push({
        id: invoice.id,
        name: invoice?.user?.name,
        email: invoice?.user?.email,
        title: invoice.promptName,
        price: "US $" + invoice.Prompt?.price,
        created_at: format(invoice.createdAt),
      });
    });
  return (
    <Box m={`${!isDashboard && "40px"}`}>
      <Box
        m={`${!isDashboard && "40px 0 0 0"}`}
        height={isDashboard ? "38vh" : "90vh"}
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
        <DataGrid
          checkboxSelection={isDashboard ? false : true}
          rows={rows}
          columns={columns}
          slots={isDashboard ? {} : { toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default AllInvoices;
