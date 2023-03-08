import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import ShareIcon from "./icons/ShareIcon";

const PickupLineItem: React.FC<{
  user: string;
  text: string;
  category: string[];
}> = ({ user, text, category }) => {
  return (
    <li className="w-full max-w-[50rem] mx-auto p-4 border border-secondary rounded-lg drop-shadow-xl">
      <div>
        <p className="flex gap-2 items-center">
          <small>Submitted by</small>
          {user}
        </p>
        <p className="font-[500]">{text}</p>
        <small>Tags: {category}</small>
      </div>
      <div className="flex justify-between md:max-w-[30rem]">
        <LikeIcon />

        <CommentIcon />

        <ShareIcon />
      </div>
    </li>
  );
};

export default PickupLineItem;
