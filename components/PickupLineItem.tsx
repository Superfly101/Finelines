import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import ShareIcon from "./icons/ShareIcon";
import IconButton from "./ui/IconButton";

type ItemProp = {
  user: string;
  text: string;
  category: string[];
};

const PickupLineItem = ({ user, text, category }: ItemProp) => {
  return (
    <li className="flex flex-col gap-4 w-full max-w-[40rem] mx-auto p-4 border border-secondary rounded-lg drop-shadow-xl">
      <div>
        <p className="flex gap-2 items-center">
          <small>Submitted by</small>
          {user}
        </p>
        <p className="font-[500]">{text}</p>
        <small>Tags: {category}</small>
      </div>
      <div className="flex justify-between md:max-w-[30rem]">
        <IconButton icon={<LikeIcon />}>Like</IconButton>
        <IconButton icon={<CommentIcon />}>Comment</IconButton>
        <IconButton icon={<ShareIcon />}>Share</IconButton>
      </div>
    </li>
  );
};

export default PickupLineItem;
