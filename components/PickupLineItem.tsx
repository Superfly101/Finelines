import BookmarkIcon from "./icons/BookmarkIcon";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import ShareIcon from "./icons/ShareIcon";
import IconButton from "./ui/IconButton";

type ItemProp = {
  user: string;
  text: string;
  tags: string[];
};

const PickupLineItem = ({ user, text, tags }: ItemProp) => {
  return (
    <li className="flex flex-col gap-4 w-full max-w-[40rem] mx-auto p-4 border border-secondary rounded-lg drop-shadow-xl">
      <div>
        <p className="flex gap-2 items-center font-[500]">{user}</p>
        <p className="py-2">{text}</p>
        {tags && <small>Tags: {tags}</small>}
      </div>
      <div className="flex gap-2 justify-between">
        <IconButton icon={<LikeIcon />}>Like</IconButton>
        <IconButton icon={<CommentIcon />}>Comment</IconButton>
        <IconButton icon={<ShareIcon />}>Share</IconButton>
        <IconButton icon={<BookmarkIcon />}>Bookmark</IconButton>
      </div>
    </li>
  );
};

export default PickupLineItem;
