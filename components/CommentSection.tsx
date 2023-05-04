import { Avatar } from "@chakra-ui/react";
import CommentList from "./CommentList";

const CommentSection = ({ id }: { id: string }) => {
  return (
    <section>
      <div className="flex gap-2 items-center py-2">
        <Avatar />
        <form className="w-full">
          <input
            type="text"
            placeholder="Add a comment..."
            className="rounded-full"
          />
        </form>
      </div>
      <CommentList id={id} />
    </section>
  );
};

export default CommentSection;
