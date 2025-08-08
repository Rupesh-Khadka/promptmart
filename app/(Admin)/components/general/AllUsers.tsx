"use client";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import { format } from "timeago.js";

interface AllUsersProps {
  users: Array<{
    id: string;
    name: string | null;
    email: string;
    image: string | null;

    createdAt: Date;
  }>;
}

const AllUsers = ({ users }: AllUsersProps) => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.4,
      align: "center",
      headerAlign: "center",
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
    {
      field: "orders",
      headerName: "Orders",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "created_at",
      headerName: "Joined At",
      flex: 0.5,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "emailIcon",
      headerName: "Email",
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <a
              href={`mailto:${params.row.email}`}
              className="flex items-center"
            >
              <AiOutlineMail className="text-white" size={20} />
            </a>
          </Box>
        );
      },
    },
  ];

  const rows: any = [];

  // Populate the rows array with user data
  users &&
    users.forEach((user: any) => {
      rows.push({
        id: user.id,
        name: user?.name,
        email: user?.email,
        avatar: user?.image,
        orders: 0,
        created_at: format(user?.createdAt),
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
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          sx={{
            height: "100%",
            width: "100%",
            overflowX: "auto", // Makes table horizontally scrollable on small screens
          }}
        />
      </Box>
    </Box>
  );
};

export default AllUsers;
