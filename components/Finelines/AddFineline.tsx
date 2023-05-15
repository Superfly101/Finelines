import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

type Prop = {
  isOpen: boolean;
  onClose: () => void;
};

const AddFineline = ({ isOpen, onClose }: Prop) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit pickup line for review</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex flex-col gap-3">
          <FormControl>
            <FormLabel>Here you go: </FormLabel>
            <Textarea placeholder="Enter pickup line..." rows={5} />
          </FormControl>
          <FormControl>
            <FormLabel>Tags: </FormLabel>
            <Input placeholder="Eg. Anime, Dirty, Yoruba" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr="3" colorScheme="blue">
            Submit
          </Button>
          <Button onClick={onClose} colorScheme="red">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddFineline;
