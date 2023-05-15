import { Comment } from "@/models/Comment";
import { useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import AddComment from "./AddComment";
import CommentItem from "./Comment";

const CommentList = ({ id }: { id: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/pickup-lines/${id}/comments`
      );

      const result = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        // setError(result);
        return;
      }

      setComments(result);
      setIsLoading(false);
    };

    fetchComments();
  }, []);
  return (
    <section>
      <AddComment id={id} addComment={handleAddComment} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <ul>
          {comments.map((comment, index) => (
            <CommentItem key={index} {...comment} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentList;
