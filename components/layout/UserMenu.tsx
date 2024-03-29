import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { User } from "@/types/User";
import { signOut } from "next-auth/react";
const UserMenu = ({ user }: { user: User | undefined }) => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex gap-4">
      {user && (
        <>
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
                <MenuItem as={Link} href="/pending">
                  Pending approvals
                </MenuItem>

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
