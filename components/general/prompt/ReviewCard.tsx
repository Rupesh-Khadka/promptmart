import { styles } from "@/utils/styles";
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
          <span className={`${styles.label} !text-xl text-white`}>
            {item?.user.name}
          </span>
          <span className={`${styles.label} pl-3`}>
            {format(item?.createdAt)}
          </span>
          <Ratings rating={item?.rating} />
        </div>
        <p className={`${styles.paragraph} whitespace-pre-line`}>
          {item?.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
