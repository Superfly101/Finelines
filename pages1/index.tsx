import HeroSection from "@/components/HeroSection";
import PickupLineList from "@/components/Finelines/PickupLineList";
import Head from "next/head";
import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddFineline from "@/components/Finelines/AddFineline";
import useAuthContext from "@/app/hooks/useAuthContext";
import useCustomToast from "@/app/hooks/useCustomToast";

export default function Home() {
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
      <Head>
        <title>Finelines</title>
      </Head>
      <HeroSection onAddFineline={handleClick} />
      <PickupLineList />
      <IconButton
        onClick={handleClick}
        position="fixed"
        bottom="6"
        right="6"
        colorScheme="blue"
        aria-label="Add your own pickup line"
        size="lg"
        borderRadius="full"
        icon={<AddIcon />}
      />

      <AddFineline isOpen={isOpen} onClose={onClose} />
    </>
  );
}
