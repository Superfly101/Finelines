"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { User } from "@/app/models/User";
import { Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { data: session } = useSession();

  const active = "text-blue underline underline-offset-4";

  return (
    <>
      <header className="sticky top-0 z-20 py-4 px-4 flex items-center justify-between md:px-8 backdrop-blur-lg">
        <div>
          <Heading color="blue.400">
            <Link href="/">Finelines</Link>
          </Heading>
        </div>
        <nav className="flex gap-4 items-center">
          <div>
            <IconButton
              onClick={toggleColorMode}
              aria-label="toggle color mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
          </div>
          <UserMenu user={session?.user} />
          {!session?.user && (
            <div className="flex gap-4 items-center">
              <Link href="/sign-up" className="hidden md:block">
                Sign up
              </Link>

              <button
                onClick={() => signIn()}
                className="border border-blue text-blue py-1 px-4 rounded-full"
              >
                Sign in
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
