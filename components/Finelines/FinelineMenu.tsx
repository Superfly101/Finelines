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
import { useRef } from "react";
import BookmarkIcon from "../icons/BookmarkIcon";
import MenuIcon from "../icons/MenuIcon";

const FinelineMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  return (
    <div className="absolute right-0 top-0">
      <Menu>
        <MenuButton>
          <MenuIcon />
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem icon={<DeleteIcon />} color="red" onClick={onOpen}>
              Delete Fineline
            </MenuItem>
            <MenuItem icon={<BookmarkIcon className="w-4" />}>
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
              Are you sure you want to delete this pickup line? You can't undo
              this action afterwards?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml="3">
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
