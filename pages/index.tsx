import HeroSection from "@/components/HeroSection";
import PickupLineList from "@/components/Finelines/PickupLineList";
import Head from "next/head";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
export default function Home() {
  return (
    <>
      <Head>
        <title>Finelines</title>
      </Head>
      <HeroSection />
      <PickupLineList />
      <IconButton
        position="fixed"
        bottom="7"
        right="7"
        colorScheme="blue"
        aria-label="Add your own pickup line"
        size="lg"
        borderRadius="full"
        icon={<AddIcon />}
      />
    </>
  );
}
