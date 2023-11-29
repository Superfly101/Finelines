import { apiUrl } from "@/constants";

import useCustomToast from "@/hooks/useCustomToast";
import useFinelinesContext from "@/hooks/useFinelinesContext";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Portal,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import BookmarkIcon from "../icons/BookmarkIcon";
import MenuIcon from "../icons/MenuIcon";

type Prop = { id: string; username: string };

const FinelineMenu = ({ id, username }: Prop) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { dispatch } = useFinelinesContext();
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useCustomToast();
  const { data: session } = useSession();

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/pickup-lines/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      setIsLoading(false);

      addToast({ title: result.message, status: "error" });
      onClose();
      return;
    }

    setIsLoading(false);
    onClose();
    dispatch({ type: "DELETE_FINELINE", payload: id });
    addToast({ title: result.message });
  };
  return (
    <div className="absolute right-0 top-0">
      <Menu>
        <MenuButton>
          <MenuIcon />
        </MenuButton>
        <Portal>
          <MenuList>
            {session?.user?.username === username && (
              <MenuItem icon={<DeleteIcon />} color="red" onClick={onOpen}>
                Delete Fineline
              </MenuItem>
            )}
            <MenuItem icon={<BookmarkIcon className="w-3" />}>
              Add to bookmark
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Fineline</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this pickup line? You can&apos;t
              undo this action afterwards?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml="3"
                isDisabled={isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default FinelineMenu;
