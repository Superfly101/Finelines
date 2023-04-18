import HeroSection from "@/components/HeroSection";
import PickupLineList from "@/components/PickupLineList";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Finelines</title>
      </Head>
      <HeroSection />
      <PickupLineList />
    </>
  );
}
