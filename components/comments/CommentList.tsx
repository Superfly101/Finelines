import { Comment } from "@/types/Comment";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import AddComment from "./AddComment";
import CommentItem from "./Comment";
import { apiUrl } from "../../constants/index";

type Prop = { id: string; onAddComment: Dispatch<SetStateAction<string[]>> };

const CommentList = ({ id, onAddComment }: Prop) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
    onAddComment((prev) => [...prev, comment._id]);
  };

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/pickup-lines/${id}/comments`);

      const result = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        console.log(result.message);
        return;
      }

      setComments(result.comments);
      setIsLoading(false);
    };

    fetchComments();
  }, [id]);
  return (
    <section>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {comments?.length ? (
            comments.map((comment) => (
              <CommentItem key={comment._id} {...comment} />
            ))
          ) : (
            <li className="py-4 flex item-center justify-center">
              <p>Be the first to comment.</p>
            </li>
          )}
        </ul>
      )}
      <AddComment id={id} addComment={handleAddComment} />
    </section>
  );
};

export default CommentList;
