import useAuthContext from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BellIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-20 py-4 px-4 flex items-center justify-between bg-white md:px-8">
      <div>
        <h2 className="text-3xl text-secondary font-bold">
          <Link href="/">Finelines</Link>
        </h2>
      </div>
      <nav className="flex gap-8">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <nav className="flex gap-4 items-center">
        {user && (
          <div className="flex gap-4">
            <div className="flex items-center cursor-pointer">
              <BellIcon fontSize="2xl" />
            </div>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
                paddingInline="1"
              >
                <Avatar name={user.username} size="sm" />
              </MenuButton>
              <MenuList>
                <MenuGroup title={`Signed in as ${user.username}`}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Bookmarks</MenuItem>
                  <MenuDivider />
                  <MenuItem>Help</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </div>
        )}
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
  );
};

export default Header;
