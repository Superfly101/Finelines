import useCustomToast from "@/app/hooks/useCustomToast";
import useFinelinesContext from "@/app/hooks/useFinelinesContext";
import { PickupLine } from "@/app/models/pickupLine";
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
  const [fineline, setFineline] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useFinelinesContext();
  const { addToast } = useCustomToast();
  const tagIsvalid = tagValue !== "" && tags.length < 5;

  const addTag = () => {
    setTags((prev) => [...prev, tagValue]);
    setTagValue("");
  };

  const removeTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    const text = event.currentTarget.textContent;
    setTags((prev) => prev.filter((tag) => tag !== text));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (tagIsvalid) addTag();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (fineline === "") {
      return;
    }

    setIsLoading(true);

    const response = await fetch(`http://localhost:5000/api/pickup-lines/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: fineline, tags }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      console.log(data.message);
      return;
    }

    setIsLoading(false);
    onClose();
    dispatch({ type: "ADD_FINELINE", payload: data });
    addToast({
      title: "Your pickup line has been added",
      position: "top",
      href: `/finelines/${data._id}`,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Submit pickup line for review</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody className="flex flex-col gap-3">
            <FormControl>
              <FormLabel>Here you go: </FormLabel>
              <Textarea
                onChange={(e) => setFineline(e.target.value)}
                placeholder="Enter pickup line..."
                rows={5}
              />
            </FormControl>
            <FormControl>
              <FormLabel pos="relative">Tags: </FormLabel>
              <Input
                placeholder="Eg. Anime, Dirty, Football"
                onChange={(e) => setTagValue(e.target.value)}
                value={tagValue}
                onKeyDown={handleKeyDown}
              />
              <FormHelperText>Maximum of 5 tags</FormHelperText>
              <Button
                pos="absolute"
                right="0"
                top="8"
                colorScheme="blue"
                zIndex="modal"
                isDisabled={!tagIsvalid}
                onClick={addTag}
              >
                Add
              </Button>
              <div className="flex py-2 gap-1 flex-wrap">
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
            <Button
              mr="3"
              colorScheme="green"
              type="submit"
              isDisabled={fineline === ""}
              isLoading={isLoading}
              loadingText="Submitting..."
            >
              Submit
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddFineline;
