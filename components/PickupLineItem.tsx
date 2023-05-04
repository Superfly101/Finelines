import { PickupLine } from "@/models/pickupLine";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import CommentSection from "./CommentSection";
import BookmarkIcon from "./icons/BookmarkIcon";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import ShareIcon from "./icons/ShareIcon";
import IconButton from "./ui/IconButton";

type prop = PickupLine;

const PickupLineItem = ({ user, text, tags, likes, comments }: prop) => {
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {};
  const handleShare = () => {};
  const handleBookmark = () => {};
  return (
    <li className="text-black flex flex-col gap-4 w-full max-w-[40rem] mx-auto p-4 border border-secondary rounded-lg drop-shadow-xl">
      <div>
        <div className="flex gap-2">
          <Avatar />
          <p className="flex gap-2 items-center font-[500]">{user}</p>
        </div>
        <p className="py-2">{text}</p>
        {tags && <small>Tags: {tags}</small>}
        <div className="flex justify-between">
          <p>
            {likes.length > 1
              ? `Liked by ${likes.length} people`
              : likes.length === 1
              ? `Liked by 1 person`
              : "Be the first to like"}
          </p>
          {comments.length !== 0 && (
            <p>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </p>
          )}
        </div>
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
