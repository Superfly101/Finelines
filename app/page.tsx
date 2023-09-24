import { Metadata } from "next";
import HomeView from "./components/HomeView";

export const metadata: Metadata = {
  title: "Finelines",
};

export default function Home() {
  return <HomeView />;
}
