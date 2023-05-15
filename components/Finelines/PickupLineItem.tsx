import useAuthContext from "@/hooks/useAuthContext";
import useFinelinesContext from "@/hooks/useFinelinesContext";
import { PickupLine } from "@/models/pickupLine";
import { Avatar, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import CommentSection from "../Comments/CommentSection";
import BookmarkIcon from "../icons/BookmarkIcon";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import ShareIcon from "../icons/ShareIcon";
import IconButton from "../ui/IconButton";

type prop = PickupLine;

const PickupLineItem = ({ _id, user, text, tags, likes, comments }: prop) => {
  const [showComments, setShowComments] = useState(false);
  const { user: currentUser } = useAuthContext();
  const { dispatch } = useFinelinesContext();
  const toast = useToast();

  const handleLike = async () => {
    if (!currentUser) {
      toast({
        title: "Please sign in to perform this action",
        status: "error",
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    const response = await fetch(
      `http://localhost:5000/api/pickup-lines/${_id}/like`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      return;
    }

    dispatch({ type: "LIKE_FINELINE", payload: result });
  };
  const handleShare = () => {};
  const handleBookmark = () => {};
  return (
    <li className="flex flex-col gap-4 w-full max-w-[40rem] mx-auto p-4 border border-blue rounded-lg drop-shadow-xl">
      <div>
        <div className="relative flex gap-2 items-center">
          <Avatar />
          <Text className="font-semibold">{user}</Text>

          <div className="absolute right-0 top-0">
            <BookmarkIcon />
          </div>
        </div>
        <Text className="py-2">{text}</Text>
        {tags && <small>Tags: {tags}</small>}
        <div className="flex justify-between text-sm py-1">
          <Text>
            {likes.length > 1
              ? `Liked by ${likes.length} people`
              : likes.length === 1
              ? `Liked by 1 person`
              : "Be the first to like"}
          </Text>
          {comments.length !== 0 && (
            <Text>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </Text>
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
      </div>

      {showComments && <CommentSection id={_id} />}
    </li>
  );
};

export default PickupLineItem;
