import useCustomToast from "@/app/hooks/useCustomToast";
import useFinelinesContext from "@/app/hooks/useFinelinesContext";
import { SmallCloseIcon } from "@chakra-ui/icons";
import MyButton from "../ui/Button";
import {
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
import IconButton from "../ui/IconButton";
import { apiUrl } from "@/app/constants";

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

    const response = await fetch(`${apiUrl}/pickup-lines/`, {
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
      title: "Your pickup line has been submitted for review.",
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
              <div className="flex">
                <Input
                  placeholder="Eg. Anime, Dirty, Football"
                  onChange={(e) => setTagValue(e.target.value)}
                  value={tagValue}
                  onKeyDown={handleKeyDown}
                />
                <MyButton
                  color="blue"
                  isDisabled={!tagIsvalid}
                  onClick={addTag}
                >
                  Add
                </MyButton>
              </div>

              <FormHelperText>Maximum of 5 tags</FormHelperText>

              <div className="flex py-2 gap-1 flex-wrap">
                {tags.map((tag, index) => (
                  <IconButton
                    onClick={removeTag}
                    key={index}
                    className="bg-green-600 rounded-full text-sm px-3 py-2 h-fit flex items-center"
                    icon={<SmallCloseIcon />}
                  >
                    {tag}
                  </IconButton>
                ))}
              </div>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <MyButton
              color="green"
              type="submit"
              isDisabled={fineline === ""}
              isLoading={isLoading}
              loadingText="Submitting..."
              className=" mr-3"
            >
              Submit
            </MyButton>
            <MyButton color="red" onClick={onClose}>
              Cancel
            </MyButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddFineline;
