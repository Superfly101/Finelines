import { apiUrl } from "@/constants";
import useCustomToast from "@/hooks/useCustomToast";
import { Fineline } from "@/types/Fineline";
import { Avatar, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import CommentList from "../comments/CommentList";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import { DownloadIcon } from "@chakra-ui/icons";
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
    const [commentCount, setCommentCount] = useState(comments);
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
    const handleExport = async () => {
      try {
        const res = await fetch(`${apiUrl}/pickup-lines/${_id}/export`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        // The image is returned as a data URL
        const { exportUrl } = await res.json();

        console.log(exportUrl);

        const link = document.createElement("a");
        link.href = exportUrl;
        link.download = "fineline.png";

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to start the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
      } catch (error) {
        addToast({ status: "error", title: (error as Error).message });
      }
    };

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
            <div className="flex gap-1 items-center">
              {tags.map((tag, index) => (
                <span
                  className="py-1 px-3 text-violet-500 text-xs rounded-full bg-violet-200"
                  key={index}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between text-sm mt-6">
            <Text>
              {likeCount.length > 1
                ? `${likeCount.length} likes`
                : likeCount.length === 1
                ? `1 like`
                : "Be the first to like"}
            </Text>
            {commentCount.length !== 0 && (
              <Text>
                {commentCount.length}{" "}
                {commentCount.length === 1 ? "comment" : "comments"}
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
          <IconButton onClick={handleExport} icon={<DownloadIcon />}>
            Export
          </IconButton>
        </div>

        {showComments && (
          <CommentList id={_id} onAddComment={setCommentCount} />
        )}
      </li>
    );
  }
);

FinelineItem.displayName = "FinelineItem";

export default FinelineItem;
