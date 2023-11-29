import "../styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import Header from "@/component/layout/Header";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
