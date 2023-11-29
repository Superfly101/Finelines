"use client";

import { useDisclosure } from "@chakra-ui/react";
import IconButton from "./ui/IconButton";
import { AddIcon } from "@chakra-ui/icons";
import useCustomToast from "../hooks/useCustomToast";
import HeroSection from "./HeroSection";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FinelineList from "./Finelines/FinelineList";
import AddFineline from "./Finelines/AddFineline";

const HomeView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  const { addToast } = useCustomToast();

  const handleClick = () => {
    if (!session?.user) {
      addToast({
        title: "Please sign in to add to your pickup line",
        status: "error",
      });
      return;
    }

    onOpen();
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeVisible = scrollPosition > 200;

      setIsVisible(shouldBeVisible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HeroSection onAddFineline={handleClick} />
      <FinelineList onAddFineline={handleClick} />
      <IconButton
        onClick={handleClick}
        aria-label="Add your own pickup line"
        className={`${
          isVisible ? null : "hidden"
        } fixed bottom-8 right-8 rounded-full w-12 h-12 z-10 bg-blue`}
        icon={<AddIcon />}
      />

      <AddFineline isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default HomeView;
