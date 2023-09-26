"use client";

import { useDisclosure, useToast } from "@chakra-ui/react";
import IconButton from "./ui/IconButton";
import { AddIcon } from "@chakra-ui/icons";
import useAuthContext from "../hooks/useAuthContext";
import useCustomToast from "../hooks/useCustomToast";
import HeroSection from "./HeroSection";
import PickupLinesList from "./Finelines/PickupLineList";
import AddFineline from "./Finelines/AddFineline";

export default function HomeView() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  const { addToast } = useCustomToast();

  const handleClick = () => {
    if (!user) {
      console.log("Showing toast");
      addToast({
        title: "Please sign in to add to your pickup line",
        status: "error",
      });
      return;
    }

    onOpen();
  };

  return (
    <>
      <HeroSection onAddFineline={handleClick} />
      <PickupLinesList />
      <IconButton
        onClick={handleClick}
        aria-label="Add your own pickup line"
        className="fixed bottom-8 right-8 rounded-full w-12 h-12 z-10 bg-blue"
        icon={<AddIcon />}
      />

      <AddFineline isOpen={isOpen} onClose={onClose} />
    </>
  );
}
