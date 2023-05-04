import useAuthContext from "@/hooks/useAuthContext";
import { Comment } from "@/models/Comment";
import { useEffect, useState } from "react";
import CommentItem from "./Comment";

const CommentList = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(
        `http://localhost:5000/api/pickup-lines/${id}/comments`
      );

      const result = await response.json();

      if (!response.ok) {
        console.log(result);
        return;
      }

      setComments(result);
    };

    fetchComments();
  }, []);
  return (
    <ul>
      {comments.map((comment, index) => (
        <CommentItem key={index} {...comment} />
      ))}
    </ul>
  );
};

export default CommentList;
