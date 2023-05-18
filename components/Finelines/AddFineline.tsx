import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormHelperText,
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
import React, { useState } from "react";

type Prop = {
  isOpen: boolean;
  onClose: () => void;
};

const AddFineline = ({ isOpen, onClose }: Prop) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState("");

  const addTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTags((prev) => [...prev, tagValue]);
    setTagValue("");
  };

  const removeTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    const text = event.currentTarget.textContent;
    setTags((prev) => prev.filter((tag) => tag !== text));
  };

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
            <FormLabel pos="relative">Tags: </FormLabel>
            <Input
              placeholder="Eg. Anime, Dirty, Football"
              onChange={(e) => setTagValue(e.target.value)}
              value={tagValue}
            />
            <FormHelperText>Maximum of 5 tags</FormHelperText>
            <Button
              pos="absolute"
              right="0"
              top="8"
              colorScheme="blue"
              zIndex="modal"
              isDisabled={tagValue === "" || tags.length >= 5}
              onClick={addTag}
            >
              Add
            </Button>
            <div className="flex py-2 gap-1">
              {tags.map((tag, index) => (
                <Button
                  onClick={removeTag}
                  key={index}
                  colorScheme="green"
                  borderRadius="full"
                  size="sm"
                  iconSpacing=".9"
                  paddingRight="1"
                  fontWeight="normal"
                  rightIcon={<SmallCloseIcon />}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr="3" colorScheme="green">
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
