import Header from "./Header";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="relative flex flex-col">
        {children}
        <IconButton
          position="fixed"
          bottom="7"
          right="7"
          colorScheme="blue"
          aria-label="Add your own pickup line"
          size="lg"
          borderRadius="full"
          icon={<AddIcon />}
        />
      </main>
    </>
  );
};

export default Layout;
