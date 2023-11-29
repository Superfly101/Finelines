import HomeView from "@/components/HomeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finelines",
};

export default function Home() {
  return <HomeView />;
}
