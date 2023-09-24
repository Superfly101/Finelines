import useAuthContext from "@/app/hooks/useAuthContext";
import { Avatar, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Comment } from "@/app/models/Comment";
import useFinelinesContext from "@/app/hooks/useFinelinesContext";
import { PickupLine } from "@/app/models/pickupLine";
import useCustomToast from "@/app/hooks/useCustomToast";

type Prop = { id: string; addComment: (comment: Comment) => void };

const AddComment = ({ id, addComment }: Prop) => {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, finelines } = useFinelinesContext();
  const { addToast } = useCustomToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    if (!user) {
      addToast({ status: "error" });
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/pickup-lines/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.log(result.message);
      return;
    }

    setComment("");
    addComment(result);
    const newLine: PickupLine | undefined = finelines.find(
      (fineline) => fineline._id === id
    );
    if (newLine) {
      newLine.comments.push(result._id);
      dispatch({ type: "COMMENT_FINELNE", payload: newLine });
    }
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
        />
      </form>
    </div>
  );
};

export default AddComment;
