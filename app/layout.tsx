import "./globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import Header from "./components/layout/Header";
import { apiUrl } from "./constants";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

async function getUser() {
  const jwt = cookies().get("jwt");

  const res = await fetch(`${apiUrl}/users/profile`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      Cookie: `jwt=${jwt?.value}`,
    },
  });
  const user = await res.json();

  if (!res.ok) {
    return undefined;
  }

  return user;
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
          <Header user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
