import { NAV_ITEMS } from "@/constants/NavItems";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Prop = {
  isOpen: boolean;
  onClose: () => void;
};

const NavDrawer = ({ isOpen, onClose }: Prop) => {
  const pathname = usePathname();

  const { colorMode, toggleColorMode } = useColorMode();

  const active = "text-blue underline underline-offset-4";

  return (
    <>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-between">
            <Heading color="blue.400">
              <Link href="/">Finelines</Link>
            </Heading>
            <IconButton
              aria-label="close drawer"
              size="sm"
              colorScheme="blue"
              onClick={onClose}
              icon={<CloseIcon />}
            />
          </DrawerHeader>
          <DrawerBody>
            <nav>
              <ul className="flex flex-col gap-4 font-semibold">
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
          </DrawerBody>
          <DrawerFooter>
            <div className="flex gap-2 items-center">
              <Text>Toggle color mode: </Text>
              <IconButton
                onClick={toggleColorMode}
                aria-label="toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
