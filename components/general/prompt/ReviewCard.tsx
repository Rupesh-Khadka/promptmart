import { Avatar } from "@heroui/avatar";
import { format } from "timeago.js";
import Ratings from "../Ratings";

const ReviewCard = ({ item }: { item: any }) => {
 
  return (
    <div className="flex my-2">
      <div>
        <Avatar size="lg" src={item?.user?.image} />
      </div>
      <div className="pl-3">
        <div className="flex items-center">
          <span
            className={`text-[16px]  font-Inter font-[500] !text-xl text-white`}
          >
            {item?.user?.name}
          </span>
          <span
            className={`text-[16px] text-[#b1b0b6] font-Inter font-[500] pl-3`}
          >
            {format(item?.createdAt)}
          </span>
          <Ratings rating={item?.rating} />
        </div>
        <p
          className={`text-[14px] font-[400] text-[#b1b0b6] font-Inter whitespace-pre-line`}
        >
          {item?.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
