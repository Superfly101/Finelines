import HeroSection from "@/components/HeroSection";
import PickupLineList from "@/components/Finelines/PickupLineList";
import Head from "next/head";
import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddFineline from "@/components/Finelines/AddFineline";
import useAuthContext from "@/hooks/useAuthContext";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = useAuthContext();

  const handleClick = () => {
    if (!user) {
      toast({
        title: "Please sign in to add to your pickup line",
        status: "error",
        isClosable: true,
        position: "bottom-left",
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
      <HeroSection />
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
