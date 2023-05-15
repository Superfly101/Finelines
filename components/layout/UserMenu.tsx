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
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import useAuthContext from "@/hooks/useAuthContext";
import useLogout from "@/hooks/useLogout";
const UserMenu = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
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
          <Avatar name={user?.username} size="sm" />
        </MenuButton>
        <MenuList>
          <MenuGroup title={`Signed in as ${user!.username}`}>
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
  );
};

export default UserMenu;
