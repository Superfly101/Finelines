import "./globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import Header from "./components/layout/Header";
import { apiUrl } from "./constants";
import { cookies } from "next/headers";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

async function getUser() {
  const jwt = cookies().get("jwt");

  try {
    const res = await fetch(`${apiUrl}/users/profile`, {
      next: {
        tags: ["user"],
      },
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: `jwt=${jwt?.value}`,
      },
    });
    const user = await res.json();

    if (!res.ok) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en">
      <body>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Header user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
