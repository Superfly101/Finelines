import { apiUrl } from "@/constants";
import useCustomToast from "@/hooks/useCustomToast";
import { Fineline } from "@/types/Fineline";
import { Avatar, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import CommentSection from "../comments/CommentSection";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import ShareIcon from "../icons/ShareIcon";
import IconButton from "../ui/IconButton";
import FinelineMenu from "./FinelineMenu";

type Prop = Fineline & {
  showCommentSection?: boolean;
};

const FinelineItem = React.forwardRef<HTMLLIElement, Prop>(
  ({ _id, text, comments, user, likes, tags, showCommentSection }, ref) => {
    const [showComments, setShowComments] = useState(showCommentSection);
    const { data: session } = useSession();

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const { addToast } = useCustomToast();

    useEffect(() => {
      if (session?.user) {
        setIsLiked(likes.includes(session.user._id));
      } else {
        setIsLiked(false);
      }
    }, [session?.user, likes]);

    const handleLike = async () => {
      if (!session?.user) {
        addToast({ status: "error" });
        return;
      }
      setIsLiked((prev) => !prev);
      const response = await fetch(`${apiUrl}/pickup-lines/${_id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      const data: Fineline = await response.json();

      if (!response.ok) {
        console.log(data);
        return;
      }

      setLikeCount(data.likes);
    };
    const handleShare = () => {};

    return (
      <li
        className={`flex flex-col w-full max-w-[40rem] mx-auto p-4 border rounded-lg drop-shadow-xl`}
        ref={ref ? ref : null}
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
              {likeCount.length > 1
                ? `${likeCount.length} likes`
                : likeCount.length === 1
                ? `1 like`
                : "Be the first to like"}
            </Text>
            {comments.length !== 0 && (
              <Text>
                {comments.length}{" "}
                {comments.length === 1 ? "comment" : "comments"}
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
  }
);

export default FinelineItem;
