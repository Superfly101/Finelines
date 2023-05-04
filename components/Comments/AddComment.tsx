import useAuthContext from "@/hooks/useAuthContext";
import { Avatar } from "@chakra-ui/react";
import { useState } from "react";
import { Comment } from "@/models/Comment";

type Prop = { id: string; addComment: (comment: Comment) => void };

const AddComment = ({ id, addComment }: Prop) => {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/pickup-lines/${id}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.log(result.message);
      return;
    }

    setComment("");
    addComment(result);
  };

  return (
    <div className="flex gap-2 items-center py-2">
      <Avatar />
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          placeholder="Add a comment..."
          className="rounded-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </div>
  );
};

export default AddComment;
