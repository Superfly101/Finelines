import useAuthContext from "@/hooks/useAuthContext";
import { Avatar } from "@chakra-ui/react";

const Comment = () => {
  return (
    <li className="flex gap-2 py-2 mt-4">
      <Avatar size="md" />
      <div className="flex flex-col gap-2 bg-[#f2f2f2] py-2 px-2">
        <p>Superfly</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita non
          earum blanditiis consequuntur rem quos quidem molestias a. Quam ipsa
          officiis culpa similique magnam quaerat modi laborum illo, esse
          aliquam.
        </p>
      </div>
    </li>
  );
};

export default Comment;
