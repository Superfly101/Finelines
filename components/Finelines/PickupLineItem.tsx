import useAuthContext from "@/hooks/useAuthContext";
import useFinelinesContext from "@/hooks/useFinelinesContext";
import { PickupLine } from "@/models/pickupLine";
import { Avatar, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentUser) setIsLiked(likes.includes(currentUser._id));
  }, []);

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
    setIsLiked((prev) => !prev);
    const response = await fetch(
      `http://localhost:5000/api/pickup-lines/${_id}/like`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      setIsLiked(false);
      return;
    }

    dispatch({ type: "LIKE_FINELINE", payload: result });
  };
  const handleShare = () => {};
  return (
    <li className="flex flex-col w-full max-w-[40rem] mx-auto p-4 border rounded-lg drop-shadow-xl">
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
        <div className="flex justify-between text-sm pt-1">
          <Text>
            {likes.length > 1
              ? `${likes.length} likes`
              : likes.length === 1
              ? `1 like`
              : "Be the first to like"}
          </Text>
          {comments.length !== 0 && (
            <Text>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </Text>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <IconButton
          onClick={handleLike}
          active={isLiked}
          icon={<LikeIcon isLiked={isLiked} />}
        >
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
