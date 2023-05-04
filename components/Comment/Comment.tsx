import { Comment } from "@/models/Comment";
import { Avatar } from "@chakra-ui/react";

type Prop = Comment;
const CommentItem = ({ user, comment }: Prop) => {
  return (
    <li className="flex gap-2 mt-4">
      <Avatar size="md" />
      <div className="w-full flex flex-col gap-2 bg-[#f2f2f2] py-2 px-3 rounded-md">
        <p className="font-[500]">{user}</p>
        <p>{comment}</p>

        <div>Like | Reply</div>
      </div>
    </li>
  );
};

export default CommentItem;
