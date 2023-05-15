import useAuthContext from "@/hooks/useAuthContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import UserMenu from "./UserMenu";
import { NAV_ITEMS } from "@/constants/NavItems";
import NavDrawer from "./NavDrawer";
import { Heading, useDisclosure } from "@chakra-ui/react";

const Header = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const active = "text-blue underline underline-offset-4";

  return (
    <>
      <header className="sticky top-0 z-20 py-4 px-4 flex items-center justify-between bg-white md:px-8">
        <div className="cursor-pointer text-2xl md:hidden" onClick={onOpen}>
          <HamburgerIcon />
        </div>
        <div>
          <Heading color="blue.600">
            <Link href="/">Finelines</Link>
          </Heading>
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-12 font-semibold">
            {NAV_ITEMS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`${router.pathname === item.path ? active : null}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex gap-4 items-center">
          {user && <UserMenu />}
          {!user && (
            <div className="flex gap-4 items-center">
              <Link href="/signup">Sign up</Link>
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
