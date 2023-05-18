import { Comment } from "@/models/Comment";
import { Avatar, Text } from "@chakra-ui/react";

type Prop = Comment;
const CommentItem = ({ user, comment }: Prop) => {
  return (
    <li className="flex gap-2 py-2">
      <Avatar size={["sm", "md"]} />
      <div className="w-full flex flex-col gap-2 py-2 px-3 rounded-md">
        <Text className="font-semibold">{user}</Text>
        <Text>{comment}</Text>

        <div>Like | Reply</div>
      </div>
    </li>
  );
};

export default CommentItem;
