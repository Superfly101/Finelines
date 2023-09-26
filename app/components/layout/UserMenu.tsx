import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import useAuthContext from "@/app/hooks/useAuthContext";
import useLogout from "@/app/hooks/useLogout";
import Link from "next/link";
import { User } from "@/app/models/User";
const UserMenu = ({ user }: { user: User | null }) => {
  const { logout } = useLogout();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    console.log("logging out");
    logout();
  };

  return (
    <div className="flex gap-4">
      <div className="hidden md:block">
        <IconButton
          onClick={toggleColorMode}
          aria-label="toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
      </div>

      {user && (
        <>
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
                <MenuItem as={Link} href="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={Link} href="/bookmark">
                  Bookmarks
                </MenuItem>
                <MenuItem as={Link} href="/pending">
                  Pending approvals
                </MenuItem>
                <MenuDivider />
                <MenuItem>Help</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </>
      )}
    </div>
  );
};

export default UserMenu;
