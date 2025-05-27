// ReviewModal.tsx
"use client";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import toast from "react-hot-toast";
import { useState } from "react";
import { newReview } from "@/app/action";
import { styles } from "@/utils/styles";
import { ClientSubmitButton } from "../../SubmitButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  promptId: string;
  userId: string;
}

export default function ReviewModal({ isOpen, onClose, promptId }: Props) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (rating === 0 || review.trim() === "") {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      await newReview(promptId, review, rating);
      toast.success("Review submitted!");
      setReview("");
      setRating(0);
      onClose();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setReview("");
    setRating(0);
    onClose();
  };

  return (
    // <div className="fixed inset-0 z-[9999] bg-[#00000050] flex items-center justify-center">
    //   <div className="bg-white p-5 rounded-xl w-[90%] md:w-[70%] xl:w-[40%] shadow">
    //     <div className="flex justify-end">
    //       <RxCross1 className="text-2xl text-black cursor-pointer" onClick={handleClose} />
    //     </div>
    //     <h2
    //       className={`text-[16px]  font-Inter font-[500] text-center text-2xl text-black`}
    //     >
    //       Give a Review
    //     </h2>
    //     <h5 className="text-black mt-4 mb-2">Rating:</h5>
    //     <div className="flex mb-4">
    //       {[1, 2, 3, 4, 5].map((i) =>
    //         rating >= i ? (
    //           <AiFillStar
    //             key={i}
    //             className="cursor-pointer"
    //             size={25}
    //             color="rgb(246,186,0)"
    //             onClick={() => setRating(i)}
    //           />
    //         ) : (
    //           <AiOutlineStar
    //             key={i}
    //             className="cursor-pointer"
    //             size={25}
    //             color="rgb(246,186,0)"
    //             onClick={() => setRating(i)}
    //           />
    //         )
    //       )}
    //     </div>
    //     <textarea
    //       className="w-full border border-gray-300 p-2 rounded text-black"
    //       rows={4}
    //       placeholder="Write your review..."
    //       value={review}
    //       onChange={(e) => setReview(e.target.value)}
    //     />
    //     <div className="mt-4">
    //       <ClientSubmitButton
    //         text="Submit Review"
    //         loading={loading}
    //         onClick={submitHandler}
    //         className="bg-blue-700 text-white"
    //       />
    //     </div>
    //   </div>
    // </div>

    <div className="fixed inset-0 z-[9999999] bg-[#0000006c] flex items-center justify-center ">
      <div className="md:w-[70%] xl:w-[40%] w-[90%] bg-white shadow rounded-xl p-5 ">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl text-black cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="w-full space-y-2">
          <h1 className={`text-[16px]font-Inter font-[500] text-black !text-3xl text-center`}>
            Give One Review
          </h1>
          <br />
          <h5
            className={`text-[16px] font-Inter font-[500] !text-black pl-2 mb-1`}
          >
            Give a Rating <span className="text-red-500">*</span>
          </h5>
          <div className="flex w-full ml-2 pb-3">
            {[1, 2, 3, 4, 5].map((i) =>
              rating >= i ? (
                <AiFillStar
                  key={i}
                  className="mr-1 cursor-pointer"
                  color="rgb(246,186,0)"
                  size={25}
                  onClick={() => setRating(i)}
                />
              ) : (
                <AiOutlineStar
                  key={i}
                  className="mr-1 cursor-pointer"
                  color="rgb(246,186,0)"
                  size={25}
                  onClick={() => setRating(i)}
                />
              )
            )}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your comment..."
            className="outline-none bg-transparent text-black border border-[#00000027] w-full p-2 rounded text-[18px] font-Poppins"
            rows={5}
          ></textarea>
          <br />

          <ClientSubmitButton
            text="Submit Review"
            loading={loading}
            onClick={submitHandler}
            className="bg-blue-700 text-white"
          />
        </div>
      </div>
    </div>
  );
}
