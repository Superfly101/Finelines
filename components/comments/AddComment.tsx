import { apiUrl } from "@/constants";
import useCustomToast from "@/hooks/useCustomToast";
import useFinelinesContext from "@/hooks/useFinelinesContext";
import { Comment } from "@/types/Comment";
import { Fineline } from "@/types/Fineline";
import { Avatar, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Prop = { id: string; addComment: (comment: Comment) => void };

const AddComment = ({ id, addComment }: Prop) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, finelines } = useFinelinesContext();
  const { addToast } = useCustomToast();
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    if (!session) {
      addToast({ status: "error" });
      return;
    }

    const response = await fetch(`${apiUrl}/pickup-lines/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify({ comment }),
    });

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      addToast({ status: "error", title: result.message });
      return;
    }

    setComment("");
    addComment(result);
    // const newLine: Fineline | undefined = finelines.find(
    //   (fineline) => fineline._id === id
    // );
    // if (newLine) {
    //   newLine.comments.push(result._id);
    //   dispatch({ type: "COMMENT_FINELNE", payload: newLine });
    // }
    setIsLoading(false);
  };

  return (
    <div className="flex gap-2 items-center py-2">
      <Avatar size={["sm", "md"]} />
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          placeholder="Add a comment..."
          borderRadius="full"
          value={comment}
          autoFocus
          onChange={(e) => setComment(e.target.value)}
          isDisabled={isLoading}
        />
      </form>
    </div>
  );
};

export default AddComment;
