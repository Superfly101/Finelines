import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import MyButton from "./Button";

type Prop = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: string;
  secondaryAction: string | null;
  handleClick: () => void;
};

const CustomModal = ({
  isOpen,
  onClose,
  title,
  body,
  secondaryAction,
  handleClick,
}: Prop) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>

          <ModalFooter>
            <MyButton color="blue" className="mr-3" onClick={onClose}>
              Close
            </MyButton>
            <MyButton color="yellow" onClick={handleClick}>
              {secondaryAction || "Secondary Action"}
            </MyButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
