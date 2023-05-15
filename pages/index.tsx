import HeroSection from "@/components/HeroSection";
import PickupLineList from "@/components/Finelines/PickupLineList";
import Head from "next/head";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddFineline from "@/components/Finelines/AddFineline";
export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Head>
        <title>Finelines</title>
      </Head>
      <HeroSection />
      <PickupLineList />
      <IconButton
        onClick={onOpen}
        position="fixed"
        bottom="7"
        right="7"
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
