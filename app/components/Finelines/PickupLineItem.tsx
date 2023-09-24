import useAuthContext from "@/app/hooks/useAuthContext";
import useCustomToast from "@/app/hooks/useCustomToast";
import useFinelinesContext from "@/app/hooks/useFinelinesContext";
import { PickupLine } from "@/app/models/pickupLine";
import { Avatar, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CommentSection from "../Comments/CommentSection";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import ShareIcon from "../icons/ShareIcon";
import IconButton from "../ui/IconButton";
import FinelineMenu from "./FinelineMenu";

interface Prop extends PickupLine {
  showCommentSection?: boolean;
}

const PickupLineItem = ({
  _id,
  user,
  text,
  tags,
  likes,
  comments,
  showCommentSection,
}: Prop) => {
  const [showComments, setShowComments] = useState(showCommentSection);
  const { user: currentUser } = useAuthContext();
  const { dispatch } = useFinelinesContext();
  const [isLiked, setIsLiked] = useState(false);
  const { addToast } = useCustomToast();

  useEffect(() => {
    if (currentUser) {
      setIsLiked(likes.includes(currentUser._id));
    } else {
      setIsLiked(false);
    }
  }, [currentUser]);

  const handleLike = async () => {
    if (!currentUser) {
      addToast({ status: "error" });
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
    <li
      className={`flex flex-col w-full max-w-[40rem] mx-auto p-4 border rounded-lg drop-shadow-xl`}
    >
      <div>
        <div className="relative flex gap-2 items-center">
          <Avatar />
          <Text className="font-semibold">{user}</Text>

          <FinelineMenu id={_id} username={user} />
        </div>
        <Text className="py-2">{text}</Text>
        {tags && (
          <small className="flex gap-1">
            Tags:
            <div className="flex gap-2">
              {tags.map((tag, index) => (
                <p key={index}>{tag}</p>
              ))}
            </div>
          </small>
        )}
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
