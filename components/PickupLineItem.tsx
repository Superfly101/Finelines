import { PickupLine } from "@/models/pickupLine";
import { useState } from "react";
import CommentSection from "./CommentSection";
import BookmarkIcon from "./icons/BookmarkIcon";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import ShareIcon from "./icons/ShareIcon";
import IconButton from "./ui/IconButton";

type ItemProp = PickupLine;

const PickupLineItem = ({ user, text, tags }: ItemProp) => {
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {};
  const handleShare = () => {};
  const handleBookmark = () => {};
  return (
    <li className="flex flex-col gap-4 w-full max-w-[40rem] mx-auto p-4 border border-secondary rounded-lg drop-shadow-xl">
      <div>
        <p className="flex gap-2 items-center font-[500]">{user}</p>
        <p className="py-2">{text}</p>
        {tags && <small>Tags: {tags}</small>}
      </div>
      <div className="flex gap-2 justify-between">
        <IconButton onClick={handleLike} icon={<LikeIcon />}>
          Like
        </IconButton>
        <IconButton
          icon={<CommentIcon />}
          onClick={() => setShowComments(true)}
        >
          Comment
        </IconButton>
        <IconButton onClick={handleShare} icon={<ShareIcon />}>
          Share
        </IconButton>
        <IconButton onClick={handleBookmark} icon={<BookmarkIcon />}>
          Bookmark
        </IconButton>
      </div>

      {showComments && <CommentSection />}
    </li>
  );
};

export default PickupLineItem;
