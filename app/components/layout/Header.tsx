"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "./UserMenu";
import { NAV_ITEMS } from "@/app/constants/NavItems";
import NavDrawer from "./NavDrawer";
import { Heading, useDisclosure } from "@chakra-ui/react";
import { User } from "@/app/models/User";
import useAuthContext from "@/app/hooks/useAuthContext";
import { useEffect } from "react";
import { type } from "os";

type Prop = {
  user: User;
};

const Header = ({ user }: Prop) => {
  const pathname = usePathname();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    // dispatch({ type: "LOGIN", payload: user });
  }, []);

  const { onOpen, isOpen, onClose } = useDisclosure();

  const active = "text-blue underline underline-offset-4";

  return (
    <>
      <header className="sticky top-0 z-20 py-4 px-4 flex items-center justify-between md:px-8 backdrop-blur-lg">
        <div className="cursor-pointer text-2xl md:hidden" onClick={onOpen}>
          <HamburgerIcon />
        </div>
        <div>
          <Heading color="blue.400">
            <Link href="/">Finelines</Link>
          </Heading>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-12 font-semibold">
            {NAV_ITEMS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`${pathname === item.path ? active : null}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex gap-4 items-center">
          <UserMenu user={user} />
          {!user && (
            <div className="flex gap-4 items-center">
              <Link href="/sign-up">Sign up</Link>
              <Link
                href="/login"
                className="border border-blue text-blue py-1 px-4 rounded-full"
              >
                Sign in
              </Link>
            </div>
          )}
        </nav>
      </header>
      <NavDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Header;
