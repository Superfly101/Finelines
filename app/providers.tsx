"use client";

import theme from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "@/context/AuthProvider";
import FinelineContextProvider from "@/context/fineline-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <FinelineContextProvider>{children}</FinelineContextProvider>
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
