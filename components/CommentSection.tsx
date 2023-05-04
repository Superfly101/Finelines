import { Avatar } from "@chakra-ui/react";
import CommentList from "./CommentList";

const CommentSection = () => {
  return (
    <section>
      <div className="flex gap-2 items-center">
        <Avatar />
        <form className="w-full">
          <input
            type="text"
            placeholder="Add a comment..."
            className="rounded-full"
          />
        </form>
      </div>
      <CommentList />
    </section>
  );
};

export default CommentSection;
