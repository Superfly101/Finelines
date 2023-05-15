import useAuthContext from "@/hooks/useAuthContext";
import { Avatar, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Comment } from "@/models/Comment";

type Prop = { id: string; addComment: (comment: Comment) => void };

const AddComment = ({ id, addComment }: Prop) => {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    if (!user) {
      toast({
        title: "Please sign in to perform this action",
        status: "error",
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

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
      setIsLoading(false);
      console.log(result.message);
      return;
    }

    setComment("");
    addComment(result);
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
