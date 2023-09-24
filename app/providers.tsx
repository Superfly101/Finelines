"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, theme } from "@chakra-ui/react";
import AuthContextProvider from "./context/auth-context";
import FinelineContextProvider from "./context/fineline-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>
          <FinelineContextProvider>{children}</FinelineContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
