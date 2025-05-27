"use client";

import { styles } from "@/utils/styles";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "timeago.js";
import { PiDownloadDuotone } from "react-icons/pi";
import { VscPreview } from "react-icons/vsc";
import { RxCross1 } from "react-icons/rx";

import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import toast from "react-hot-toast";
import Header from "../../Header";
import Loader from "../../Loader";
import { Button } from "@heroui/button";
import { newReview } from "@/app/action";
import { ClientSubmitButton } from "../../SubmitButton";
import ReviewModal from "./ReviewModal";

interface OrderData {
  id: string;
  userId: string;
  promptId: string;
  promptName: string;
  payment_method: string;
  payment_id: string;
  Prompt: {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    promptImageUrl: string[];
    estimatedPrice: number | null;
    price: number;
    category: string;
    tags: string;
    rating: number;
    promptFileUrl: string | string[];
    sellerId: string;
    reviews?: { userId: string }[];
  };
  createdAt: Date;
}

interface UserAllOrderProps {
  user: any;
  isSellerExist?: boolean;
  data: OrderData[];
}

const UserAllOrders = ({ user, isSellerExist, data }: UserAllOrderProps) => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [promptId, setPromptId] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitloading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setLoading(false);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Prompt Title", flex: 0.8 },
    { field: "price", headerName: "Prompt Price", flex: 0.5 },
    {
      field: "download",
      headerName: "Download Source Code",
      flex: 0.5,
      renderCell: (params: any) => {
        const sourceCodeFiles = params.row.download;
        return (
          <div className="w-[70%] flex justify-center">
            {sourceCodeFiles?.map((file: any) => (
              <a href={file.url} key={file.url} download>
                <PiDownloadDuotone className="text-2xl text-white cursor-pointer" />
              </a>
            ))}
          </div>
        );
      },
    },
    {
      field: "OrderedAt",
      headerName: "Ordered At",
      flex: 0.5,
    },
    {
      field: "Review",
      headerName: "Give one Review",
      flex: 0.5,
      renderCell: (params: any) => (
        <div className="w-[70%] flex justify-center">
          <VscPreview
            className="text-2xl text-white cursor-pointer"
            onClick={() => {
              setOpen(true);
              setPromptId(params.row.prompt.id);
            }}
          />
        </div>
      ),
    },
  ];

  const rows: any = [];

  data?.forEach((item) => {
    const fileUrls =
      typeof item.Prompt.promptFileUrl === "string"
        ? [{ url: item.Prompt.promptFileUrl }]
        : item.Prompt.promptFileUrl.map((url) => ({ url }));

    rows.push({
      id: item.id,
      name: item.Prompt.name,
      price: `US $${item.Prompt.price}`,
      download: fileUrls,
      OrderedAt: format(item.createdAt),
      prompt: item.Prompt,
    });
  });

  //   const reviewHandler = async () => {
  //     setSubmitLoading(true);
  //     if (rating === 0 || review === "") {
  //       toast.error("Please fill all the fields!");
  //       setSubmitLoading(false);
  //       return;
  //     }
  //     try {
  //       // Submit review logic goes here
  //       await newReview(promptId, review, rating);

  //       toast.success("Review submitted!");
  //       setOpen(false);
  //       setReview("");
  //       setRating(0);
  //       setSubmitLoading(false);
  //     } catch (err) {
  //       toast.error("Please try again later.");
  //     } finally {
  //       setSubmitLoading(false);
  //     }
  //   };

  if (!isMounted) return null;

  return (
    <>
      <Header
        activeItem={9}
        user={user}
        isSellerExist={isSellerExist ?? null}
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[90%] m-auto">
          <h1 className={`${styles.heading} text-center py-5`}>All Orders</h1>
          <Box
            m="40px 0 0 0"
            height="75vh"
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
                textAlign: "center",
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

          {open && (
            <ReviewModal
              isOpen={open}
              onClose={() => setOpen(false)}
              promptId={promptId}
              userId={user?.id}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserAllOrders;
