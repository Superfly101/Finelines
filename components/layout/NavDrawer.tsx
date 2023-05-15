import { NAV_ITEMS } from "@/constants/NavItems";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

type Prop = {
  isOpen: boolean;
  onClose: () => void;
};

const NavDrawer = ({ isOpen, onClose }: Prop) => {
  const router = useRouter();

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
                      className={`${
                        router.pathname === item.path ? active : null
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
