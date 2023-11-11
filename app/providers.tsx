"use client";

import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
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
